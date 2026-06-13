import * as Print from "expo-print"
import * as Sharing from "expo-sharing"
import { Conta } from "../types/Conta"

export async function gerarPDF(conta: Conta) {

  const itensHTML = conta.itens.map(item => {
    const totalItem = item.valor * item.quantidade

    return `
      <tr>
        <td>${item.descricao}</td>
        <td>${item.quantidade}</td>
        <td>R$ ${item.valor.toFixed(2)}</td>
        <td>R$ ${totalItem.toFixed(2)}</td>
      </tr>
    `
  }).join("")

  const html = `
  <html>
    <body style="font-family: Arial; padding: 20px;">
      <h1>ContaJusta</h1>

      <h3>${conta.local}</h3>
      <p>${new Date(conta.data).toLocaleString()}</p>

      <table border="1" style="width:100%; border-collapse:collapse; text-align:center;">
        <tr>
          <th>Item</th>
          <th>Qtd</th>
          <th>Valor Unitário</th>
          <th>Total</th>
        </tr>

        ${itensHTML}

      </table>

      <h2 style="margin-top:20px;">Total: R$ ${conta.total.toFixed(2)}</h2>
    </body>
  </html>
  `

  const file = await Print.printToFileAsync({
    html
  })

  await Sharing.shareAsync(file.uri)
}