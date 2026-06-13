import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

export default function HomeScreen({navigation}:any){

return(

<View style={styles.container}>

<Text style={styles.titulo}>ContaJusta</Text>

<View style={styles.botoes}>

<TouchableOpacity
style={styles.botao}
onPress={()=>navigation.navigate("LancarGastos")}
>
<Text style={styles.texto}>Lançar Gastos</Text>
</TouchableOpacity>

<TouchableOpacity
style={styles.botao}
onPress={()=>navigation.navigate("Historico")}
>
<Text style={styles.texto}>Histórico do Usuário</Text>
</TouchableOpacity>

</View>

</View>

)

}

const styles=StyleSheet.create({

container:{
flex:1,
justifyContent:"center",
alignItems:"center"
},

titulo:{
position:"absolute",
top:60,
fontSize:26,
fontWeight:"bold"
},

botoes:{
gap:20
},

botao:{
backgroundColor:"#2e86de",
padding:15,
borderRadius:10,
width:200
},

texto:{
color:"white",
textAlign:"center"
}

})