import React, { useState } from "react"
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"

interface Props {
  visible: boolean
  total: number
  onConfirm: (taxa:number)=>void
  onClose: ()=>void
}

export default function FecharContaModal({visible,total,onConfirm,onClose}:Props){

  const [taxa,setTaxa]=useState("10")

  const taxaValor = (total * Number(taxa))/100
  const totalFinal = total + taxaValor

  return(

    <Modal visible={visible} transparent>

      <View style={styles.overlay}>

        <View style={styles.modal}>

          <Text style={styles.titulo}>Fechar Conta</Text>

          <Text>Total itens: R$ {total.toFixed(2)}</Text>

          <TextInput
          style={styles.input}
          placeholder="Taxa de serviço %"
          value={taxa}
          keyboardType="numeric"
          onChangeText={setTaxa}
          />

          <Text>Total final: R$ {totalFinal.toFixed(2)}</Text>

          <TouchableOpacity
          style={styles.botao}
          onPress={()=>onConfirm(Number(taxa))}
          >
            <Text style={styles.botaoTexto}>Confirmar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={{textAlign:"center",marginTop:10}}>Cancelar</Text>
          </TouchableOpacity>

        </View>

      </View>

    </Modal>

  )

}

const styles=StyleSheet.create({

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
fontSize:20,
fontWeight:"bold",
marginBottom:15
},

input:{
borderWidth:1,
padding:10,
marginVertical:10
},

botao:{
backgroundColor:"#2e86de",
padding:12,
borderRadius:8
},

botaoTexto:{
color:"white",
textAlign:"center"
}

})