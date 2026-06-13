import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native"

import ItemCard from "../components/ItemCard"
import FecharContaModal from "../components/FecharContaModal"
import HistoricoItemModal from "../components/HistoricoItemModal"

import { Item, Conta } from "../types/Conta"
import { salvarConta } from "../services/storage"

import uuid from "react-native-uuid"

export default function LancarGastosScreen() {
  const [local, setLocal] = useState("")
  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState("")
  const [itens, setItens] = useState<Item[]>([])
  const [modalFechar, setModalFechar] = useState(false)
  const [itemSelecionado, setItemSelecionado] = useState<Item | null>(null)
  const [modalHistorico, setModalHistorico] = useState(false)
  const [contaFechada, setContaFechada] = useState(false)
  const [contaId, setContaId] = useState<string | null>(null)
  const [taxaServico, setTaxaServico] = useState<number>(0)

  const totalItens = itens.reduce((acc, item) => acc + item.valor * item.quantidade, 0)
  const totalFinal = totalItens + (totalItens * taxaServico) / 100

  function converterValor(valorString: string) {
    const normalizado = valorString.replace(",", ".")
    const numero = parseFloat(normalizado)
    if (isNaN(numero)) return null
    return numero
  }

  function adicionarItem() {
    if (contaFechada) return
    if (!descricao || !valor) return

    const valorConvertido = converterValor(valor)
    if (valorConvertido === null) {
      alert("Valor inválido")
      return
    }

    const novoItem: Item = {
      id: uuid.v4().toString(),
      descricao,
      valor: valorConvertido,
      quantidade: 1,
      historico: [`Item criado (${descricao}) às ${new Date().toLocaleTimeString()}`]
    }

    setItens([...itens, novoItem])
    setDescricao("")
    setValor("")
  }

  function adicionarQuantidade(id: string) {
    if (contaFechada) return
    setItens(itens.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantidade: item.quantidade + 1,
          historico: [...item.historico, `+1 unidade às ${new Date().toLocaleTimeString()}`]
        }
      }
      return item
    }))
  }

  function removerQuantidade(id: string) {
    if (contaFechada) return
    setItens(itens.map(item => {
      if (item.id === id && item.quantidade > 0) {
        return {
          ...item,
          quantidade: item.quantidade - 1,
          historico: [...item.historico, `-1 unidade às ${new Date().toLocaleTimeString()}`]
        }
      }
      return item
    }))
  }

  function abrirHistorico(item: Item) {
    setItemSelecionado(item)
    setModalHistorico(true)
  }

  async function fecharConta(taxa: number) {
    if (contaFechada) return

    setTaxaServico(taxa)

    const conta: Conta = {
      id: contaId ?? uuid.v4().toString(),
      local,
      data: new Date().toISOString(),
      itens,
      taxaServico: taxa,
      total: totalFinal
    }

    await salvarConta(conta)
    setContaFechada(true)
    setModalFechar(false)
    setContaId(conta.id)
  }

  function reabrirConta() {
    if (!contaId) return
    setContaFechada(false)
  }

  function iniciarNovaConta() {
    setLocal("")
    setItens([])
    setDescricao("")
    setValor("")
    setContaFechada(false)
    setContaId(null)
    setTaxaServico(0)
  }

  function renderItem({ item }: { item: Item }) {
    return (
      <ItemCard
        item={item}
        onAdd={() => adicionarQuantidade(item.id)}
        onRemove={() => removerQuantidade(item.id)}
        onHistorico={() => abrirHistorico(item)}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lançar gastos</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do estabelecimento"
        value={local}
        editable={!contaFechada}
        onChangeText={setLocal}
      />

      <View style={styles.linhaInputs}>
        <TextInput
          style={[styles.input, styles.inputDescricao]}
          placeholder="Descrição"
          value={descricao}
          editable={!contaFechada}
          onChangeText={setDescricao}
        />

        <TextInput
          style={[styles.input, styles.inputValor]}
          placeholder="Valor"
          keyboardType="decimal-pad"
          value={valor}
          editable={!contaFechada}
          onChangeText={setValor}
        />
      </View>

      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={adicionarItem}
        disabled={contaFechada}
      >
        <Text style={styles.botaoTexto}>Adicionar item</Text>
      </TouchableOpacity>

      {local !== "" && <Text style={styles.localBar}>📍 {local}</Text>}

      <FlatList
        data={itens}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <View style={styles.rodape}>
        <Text style={styles.total}>Total: R$ {totalFinal.toFixed(2)}</Text>

        {!contaFechada ? (
          <TouchableOpacity
            style={styles.botaoFechar}
            onPress={() => setModalFechar(true)}
          >
            <Text style={styles.botaoTexto}>Fechar conta</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.botaoReabrir}
            onPress={reabrirConta}
          >
            <Text style={styles.botaoTexto}>Reabrir conta</Text>
          </TouchableOpacity>
        )}
      </View>

      <FecharContaModal
        visible={modalFechar}
        total={totalFinal}
        onConfirm={fecharConta}
        onClose={() => setModalFechar(false)}
      />

      <HistoricoItemModal
        visible={modalHistorico}
        item={itemSelecionado}
        onClose={() => setModalHistorico(false)}
      />

      <TouchableOpacity
        style={[styles.botaoAdicionar, { marginTop: 10, backgroundColor: "#34495e" }]}
        onPress={iniciarNovaConta}
      >
        <Text style={styles.botaoTexto}>Nova Conta</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, borderRadius: 6, marginBottom: 10 },
  linhaInputs: { flexDirection: "row", gap: 10 },
  inputDescricao: { flex: 2 },
  inputValor: { flex: 1 },
  botaoAdicionar: { backgroundColor: "#27ae60", padding: 12, borderRadius: 8, marginBottom: 15 },
  botaoTexto: { color: "white", textAlign: "center", fontWeight: "bold" },
  localBar: { marginBottom: 10, color: "#666" },
  rodape: { marginTop: 10, borderTopWidth: 1, paddingTop: 10 },
  total: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  botaoFechar: { backgroundColor: "#e74c3c", padding: 12, borderRadius: 8 },
  botaoReabrir: { backgroundColor: "#f39c12", padding: 12, borderRadius: 8 }
})