import AsyncStorage from "@react-native-async-storage/async-storage"
import { Conta } from "../types/Conta"

const HISTORICO_KEY = "@contajusta:historico"

// Salva uma conta, substituindo caso já exista (por id)
export async function salvarConta(conta: Conta) {
  const historico = await carregarHistorico()

  // Verifica se a conta já existe para evitar duplicação
  const indexExistente = historico.findIndex(c => c.id === conta.id)

  let novoHistorico: Conta[]
  if (indexExistente >= 0) {
    historico[indexExistente] = conta
    novoHistorico = historico
  } else {
    novoHistorico = [...historico, conta]
  }

  await AsyncStorage.setItem(
    HISTORICO_KEY,
    JSON.stringify(novoHistorico)
  )
}

// Carrega histórico completo
export async function carregarHistorico(): Promise<Conta[]> {
  const dados = await AsyncStorage.getItem(HISTORICO_KEY)
  if (!dados) return []
  return JSON.parse(dados)
}

// REMOVE UMA CONTA ESPECÍFICA DO HISTÓRICO PELO ID
export async function excluirConta(id: string) {
  const historico = await carregarHistorico()
  const novoHistorico = historico.filter(conta => conta.id !== id)
  await AsyncStorage.setItem(HISTORICO_KEY, JSON.stringify(novoHistorico))
}

// Opcional: limpar todo histórico
export async function limparHistorico() {
  await AsyncStorage.removeItem(HISTORICO_KEY)
}