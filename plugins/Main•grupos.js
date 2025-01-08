
import fetch from 'node-fetch'

let handler  = async (m, { conn, usedPrefix, command }) => {

let grupos = `
confirmacion de compra de JadiBot

se estima que debera pagar 25 dolares para su compra, la entrega de la conexion se hace al momento de la compra, la instalacion puede cobrarse un monto adicional de 2,5\nDebera completar esta infomcaión\n\nNombre:\nNacionalidad\nMetodo de pago:\n\n> informcaión adicional: Si necesitas a una cuenta donde enviar el dinero puedes mandarla aqui 👇🏻\n*kevintomasolazo23@gmail.com*\n\n> Si la compra no se puede pagar mediante PayPal se puede hacer una recarga por ID con el monto dado puedes comprar aqui 👇🏻\n*pagostore.garena.com*\n\n> UID: 7421232251\n\n> Powered By ianalejandrook14x`

await conn.sendFile(m.chat, banner, "nino.jpg", grupos, m, null, )

await m.react(emojis)

}
handler.command = ['conf']
export default handler
