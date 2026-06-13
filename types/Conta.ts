export interface Item {
  id: string
  descricao: string
  valor: number
  quantidade: number
  historico: string[]
}

export interface Conta {
  id: string
  local: string
  data: string
  itens: Item[]
  taxaServico: number
  total: number
}