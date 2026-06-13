import React,{useEffect,useState} from "react"
import {View,Text,FlatList,TouchableOpacity,StyleSheet} from "react-native"
import {carregarHistorico} from "../services/storage"
import {Conta} from "../types/Conta"
import {gerarPDF} from "../services/pdfGenerator"


export default function HistoricoScreen(){

const [historico,setHistorico]=useState<Conta[]>([])

useEffect(()=>{
carregar()
},[])

async function carregar(){
const dados = await carregarHistorico()
setHistorico([...dados].reverse())
}

function renderItem({item}:{item:Conta}){

return(

<View style={styles.card}>

<View>
<Text style={styles.local}>{item.local}</Text>
<Text>{new Date(item.data).toLocaleDateString()}</Text>
</View>

<View style={styles.ladoDireito}>

<Text style={styles.total}>
R$ {item.total.toFixed(2)}
</Text>

<TouchableOpacity
onPress={()=>gerarPDF(item)}
>
<Text style={styles.pdf}>PDF</Text>
</TouchableOpacity>

</View>

</View>

)

}

return(

<View style={styles.container}>

<Text style={styles.titulo}>Histórico</Text>

<FlatList
data={historico}
renderItem={renderItem}
keyExtractor={item=>item.id}
/>

</View>

)

}

const styles=StyleSheet.create({

container:{flex:1,padding:20},

titulo:{fontSize:22,fontWeight:"bold",marginBottom:20},

card:{
flexDirection:"row",
justifyContent:"space-between",
backgroundColor:"#f2f2f2",
padding:15,
borderRadius:10,
marginBottom:10
},

local:{fontWeight:"bold",fontSize:16},

ladoDireito:{alignItems:"flex-end"},

total:{fontWeight:"bold"},

pdf:{color:"blue",marginTop:5}

})