import React from "react"
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Item } from "../types/Conta"

interface Props {
  visible: boolean
  item: Item | null
  onClose: () => void
}

export default function HistoricoItemModal({ visible, item, onClose }: Props) {

  if (!item) return null

  return (

    <Modal visible={visible} transparent>

      <View style={styles.overlay}>

        <View style={styles.modal}>

          <Text style={styles.titulo}>
            Histórico - {item.descricao}
          </Text>

          {item.historico.map((h,i)=>(
            <Text key={i}>{h}</Text>
          ))}

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.fechar}>Fechar</Text>
          </TouchableOpacity>

        </View>

      </View>

    </Modal>

  )
}

const styles = StyleSheet.create({

  overlay:{
    flex:1,
    backgroundColor:"rgba(0,0,0,0.5)",
    justifyContent:"center",
    alignItems:"center"
  },

  modal:{
    backgroundColor:"white",
    padding:20,
    borderRadius:10,
    width:"80%"
  },

  titulo:{
    fontSize:18,
    fontWeight:"bold",
    marginBottom:10
  },

  fechar:{
    marginTop:20,
    textAlign:"center",
    color:"blue"
  }

})