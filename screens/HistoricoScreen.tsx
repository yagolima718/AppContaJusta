import React, { useEffect, useState } from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native"
import { carregarHistorico, excluirConta } from "../services/storage"
import { Conta } from "../types/Conta"
import { gerarPDF } from "../services/pdfGenerator"

export default function HistoricoScreen() {
  const [historico, setHistorico] = useState<Conta[]>([])

  useEffect(() => {
    carregar()
  }, [])

  async function carregar() {
    const dados = await carregarHistorico()
    setHistorico([...dados].reverse())
  }

  // DISPARA O ALERTA DE CONFIRMAÇÃO PARA EVITAR CLIQUES ACIDENTAIS
  function confirmarExclusao(id: string, local: string) {
    Alert.alert(
      "Excluir Lançamento",
      `Tem certeza que deseja apagar permanentemente o histórico de "${local}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive", 
          onPress: async () => {
            await excluirConta(id)
            carregar() // Recarrega a lista atualizada na tela
          } 
        }
      ]
    )
  }

  function renderItem({ item }: { item: Conta }) {
    return (
      <View style={styles.card}>
        <View style={styles.ladoEsquerdo}>
          <Text style={styles.local}>{item.local}</Text>
          <Text style={styles.data}>{new Date(item.data).toLocaleDateString()}</Text>
        </View>

        <View style={styles.ladoDireito}>
          <Text style={styles.total}>
            R$ {item.total.toFixed(2)}
          </Text>
          
          {item.taxaServico > 0 && (
            <Text style={styles.taxaSubtexto}>
              (inc. {item.taxaServico}% taxa)
            </Text>
          )}

          {/* ÁREA DE AÇÕES COM OS BOTÕES ALINHADOS */}
          <View style={styles.acoes}>
            <TouchableOpacity onPress={() => gerarPDF(item)}>
              <Text style={styles.pdf}>PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => confirmarExclusao(item.id, item.local)}>
              <Text style={styles.excluir}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Histórico do Usuário</Text>

      <FlatList
        data={historico}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center"
  },
  ladoEsquerdo: { flex: 1 },
  local: { fontWeight: "bold", fontSize: 16 },
  data: { color: "#7f8c8d", fontSize: 13, marginTop: 2 },
  ladoDireito: { alignItems: "flex-end" },
  total: { fontWeight: "bold", fontSize: 16, color: "#2e86de" },
  taxaSubtexto: { fontSize: 11, color: "#e67e22", marginTop: 2, fontWeight: "500" },
  acoes: { flexDirection: "row", gap: 15, marginTop: 7, alignItems: "center" },
  pdf: { color: "#27ae60", fontWeight: "bold" },
  excluir: { color: "#c0392b", fontWeight: "bold" }
})