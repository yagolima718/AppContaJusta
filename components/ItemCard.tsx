import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Item } from "../types/Conta"

interface Props {
  item: Item
  onAdd: () => void
  onRemove: () => void
  onHistorico: () => void
}

export default function ItemCard({ item, onAdd, onRemove, onHistorico }: Props) {

  return (
    <View style={styles.card}>

      <View style={styles.info}>
        <Text style={styles.nome}>{item.descricao}</Text>
        <Text>R$ {item.valor.toFixed(2)}</Text>
      </View>

      <View style={styles.quantidadeArea}>

        <TouchableOpacity style={styles.botao} onPress={onRemove}>
          <Text style={styles.botaoTexto}>-</Text>
        </TouchableOpacity>

        <Text style={styles.quantidade}>{item.quantidade}</Text>

        <TouchableOpacity style={styles.botao} onPress={onAdd}>
          <Text style={styles.botaoTexto}>+</Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity onPress={onHistorico}>
        <Text style={styles.historico}>Ver histórico</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({

  card:{
    backgroundColor:"#f2f2f2",
    padding:15,
    borderRadius:10,
    marginBottom:10
  },

  info:{
    marginBottom:10
  },

  nome:{
    fontWeight:"bold",
    fontSize:16
  },

  quantidadeArea:{
    flexDirection:"row",
    alignItems:"center",
    gap:10
  },

  botao:{
    backgroundColor:"#2e86de",
    padding:6,
    borderRadius:6,
    width:30,
    alignItems:"center"
  },

  botaoTexto:{
    color:"white",
    fontWeight:"bold"
  },

  quantidade:{
    fontSize:16,
    fontWeight:"bold"
  },

  historico:{
    marginTop:8,
    color:"blue"
  }

})