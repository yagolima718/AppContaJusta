import * as Print from "expo-print"
import * as Sharing from "expo-sharing"
import { Conta } from "../types/Conta"

export async function gerarPDF(conta: Conta) {

  // Calcula o subtotal real somando a multiplicação de cada item
  const subtotalItens = conta.itens.reduce((acc, item) => acc + (item.valor * item.quantidade), 0)
  const valorTaxa = (subtotalItens * (conta.taxaServico || 0)) / 100

  const itensHTML = conta.itens.map(item => {
    const totalItem = item.valor * item.quantidade

    return `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.descricao}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.quantidade}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">R$ ${item.valor.toFixed(2)}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">R$ ${totalItem.toFixed(2)}</td>
      </tr>
    `
  }).join("")

  const html = `
  <html>
    <body style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h1 style="color: #2e86de; margin-bottom: 5px;">ContaJusta</h1>
      <hr style="border: 0; border-top: 2px solid #2e86de; margin-bottom: 20px;"/>

      <h3 style="margin: 0 0 5px 0;">${conta.local}</h3>
      <p style="margin: 0 0 20px 0; color: #666; font-size: 14px;">${new Date(conta.data).toLocaleString()}</p>

      <table style="width: 100%; border-collapse: collapse; text-align: center; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #f2f2f2; border-bottom: 2px solid #ddd;">
            <th style="padding: 10px; border: 1px solid #ddd;">Item</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Qtd</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Valor Unitário</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itensHTML}
        </tbody>
      </table>

      <div style="margin-top: 30px; text-align: right; width: 100%;">
        <div style="display: inline-block; width: 40%; text-align: right;">
          <p style="margin: 5px 0; font-size: 15px;">Subtotal Itens: <strong>R$ ${subtotalItens.toFixed(2)}</strong></p>
          <p style="margin: 5px 0; font-size: 14px; color: #555;">Taxa de Serviço (${conta.taxaServico || 0}%): <strong>R$ ${valorTaxa.toFixed(2)}</strong></p>
          <hr style="border: 0; border-top: 1px solid #ccc; margin: 10px 0 0 auto; width: 100%;"/>
          <h2 style="margin: 10px 0 0 0; color: #2e86de; font-size: 22px;">Total Geral: R$ ${conta.total.toFixed(2)}</h2>
        </div>
      </div>
    </body>
  </html>
  `

  const file = await Print.printToFileAsync({
    html
  })

  await Sharing.shareAsync(file.uri)
}