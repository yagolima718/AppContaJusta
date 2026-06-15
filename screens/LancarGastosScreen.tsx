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

  function converterValor(texto: string): number {
    const formatado = texto.replace(",", ".")
    const numero = parseFloat(formatado)
    return isNaN(numero) ? 0 : numero
  }

  function adicionarItem() {
    if (!descricao.trim() || !valor.trim()) return

    const valorNumerico = converterValor(valor)
    if (valorNumerico <= 0) return

    const hora = new Date().toLocaleTimeString()

    const novoItem: Item = {
      id: uuid.v4().toString(),
      descricao,
      valor: valorNumerico,
      quantidade: 1,
      historico: [`[${hora}] Item criado com Qtd 1`]
    }

    setItens([...itens, novoItem])
    setDescricao("")
    setValor("")
  }

  function alterarQuantidade(id: string, operacao: "somar" | "subtrair") {
    if (contaFechada) return

    const hora = new Date().toLocaleTimeString()

    const novosItens = itens.map(item => {
      if (item.id === id) {
        let novaQtd = item.quantidade
        let acao = ""

        if (operacao === "somar") {
          novaQtd += 1
          acao = "incrementado"
        } else if (operacao === "subtrair" && item.quantidade > 1) {
          novaQtd -= 1
          acao = "decrementado"
        } else {
          return item
        }

        return {
          ...item,
          quantidade: novaQtd,
          historico: [...item.historico, `[${hora}] Qtd ${acao} para ${novaQtd}`]
        }
      }
      return item
    })

    setItens(novosItens)
  }

  async function fecharConta(taxa: number) {
    if (contaFechada) return

    setTaxaServico(taxa)

    const totalComTaxa = totalItens + (totalItens * taxa) / 100

    const conta: Conta = {
      id: contaId ?? uuid.v4().toString(),
      local: local.trim() === "" ? "Sem Nome" : local,
      data: new Date().toISOString(),
      itens,
      taxaServico: taxa,
      total: totalComTaxa
    }

    await salvarConta(conta)
    setContaFechada(true)
    setModalFechar(false)
    setContaId(conta.id)
  }

  // FUNÇÃO PARA REABRIR A CONTA SE FECHADA SEM QUERER
  async function reabrirConta() {
    if (!contaFechada || !contaId) return

    setContaFechada(false)
    setTaxaServico(0) // Zera a taxa temporariamente para o cálculo dinâmico da tela

    const conta: Conta = {
      id: contaId,
      local: local.trim() === "" ? "Sem Nome" : local,
      data: new Date().toISOString(),
      itens,
      taxaServico: 0,
      total: totalItens
    }

    await salvarConta(conta)
  }

  function iniciarNovaConta() {
    setLocal("")
    setDescricao("")
    setValor("")
    setItens([])
    setContaFechada(false)
    setContaId(null)
    setTaxaServico(0)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lançar Gastos</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do estabelecimento"
        value={local}
        onChangeText={setLocal}
        editable={!contaFechada}
      />

      <View style={styles.linhaInputs}>
        <TextInput
          style={[styles.input, styles.inputDescricao]}
          placeholder="Descrição do produto"
          value={descricao}
          onChangeText={setDescricao}
          editable={!contaFechada}
        />
        <TextInput
          style={[styles.input, styles.inputValor]}
          placeholder="Valor"
          value={valor}
          keyboardType="numeric"
          onChangeText={setValor}
          editable={!contaFechada}
        />
      </View>

      <TouchableOpacity
        style={[styles.botaoAdicionar, contaFechada && { backgroundColor: "#95a5a6" }]}
        onPress={adicionarItem}
        disabled={contaFechada}
      >
        <Text style={styles.botaoTexto}>Adicionar Item</Text>
      </TouchableOpacity>

      <FlatList
        data={itens}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            onAdd={() => alterarQuantidade(item.id, "somar")}
            onRemove={() => alterarQuantidade(item.id, "subtrair")}
            onHistorico={() => {
              setItemSelecionado(item)
              setModalHistorico(true)
            }}
          />
        )}
      />

      <View style={styles.rodape}>
        <Text style={styles.totalTexto}>Total Itens: R$ {totalItens.toFixed(2)}</Text>
        {taxaServico > 0 && (
          <Text style={styles.taxaTexto}>Taxa de Serviço ({taxaServico}%): R$ {((totalItens * taxaServico) / 100).toFixed(2)}</Text>
        )}
        <Text style={styles.totalGeralTexto}>Total Geral: R$ {totalFinal.toFixed(2)}</Text>

        {!contaFechada && itens.length > 0 && (
          <TouchableOpacity
            style={[styles.botaoFechar, { marginTop: 10 }]}
            onPress={() => setModalFechar(true)}
          >
            <Text style={styles.botaoTexto}>Fechar Conta</Text>
          </TouchableOpacity>
        )}

        {/* BOTÃO REABRIR CONTA DE VOLTA NO LAYOUT */}
        {contaFechada && (
          <TouchableOpacity
            style={[styles.botaoReabrir, { marginTop: 10 }]}
            onPress={reabrirConta}
          >
            <Text style={styles.botaoTexto}>Reabrir Conta</Text>
          </TouchableOpacity>
        )}
      </View>

      <FecharContaModal
        visible={modalFechar}
        total={totalItens}
        onConfirm={fecharConta}
        onClose={() => setModalFechar(false)}
      />

      <HistoricoItemModal
        visible={modalHistorico}
        item={itemSelecionado}
        onClose={() => setModalHistorico(false)}
      />

      <TouchableOpacity
        style={[styles.botaoNovaConta, { marginTop: 10 }]}
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
  botaoFechar: { backgroundColor: "#2e86de", padding: 12, borderRadius: 8 },
  botaoReabrir: { backgroundColor: "#e67e22", padding: 12, borderRadius: 8 },
  botaoNovaConta: { backgroundColor: "#34495e", padding: 12, borderRadius: 8 },
  botaoTexto: { color: "white", textAlign: "center", fontWeight: "bold" },
  rodape: { marginTop: 10, padding: 15, backgroundColor: "#f8f9fa", borderRadius: 8 },
  totalTexto: { fontSize: 16 },
  taxaTexto: { fontSize: 14, color: "#7f8c8d", marginVertical: 2 },
  totalGeralTexto: { fontSize: 18, fontWeight: "bold", color: "#2e86de", marginTop: 4 }
})