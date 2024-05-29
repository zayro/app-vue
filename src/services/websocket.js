import { CONSTANT } from '@/environments'

const SOCKET = CONSTANT.URL.SOCKET

console.log(SOCKET)

export class ConnectWebSocket {
  connect (ClientId = Date.now()) {
    // Crea un # para el cliente
    // const ClientId = Date.now()

    // Realiza la conexion
    this.ws = new WebSocket(`ws://localhost:4000/ws/v1/json/${ClientId}`)

    return this.ws
  }

  sendBroadcast (valueMessage) {
    const enviar = { message: valueMessage, broadcast: true }
    console.log('socket -  sendBroadcast', JSON.stringify(enviar))
    this.ws.send(JSON.stringify(enviar))
  }

  getListUser () {
    const enviar = { listUser: true }
    console.log('socket - getListUser', JSON.stringify(enviar))
    this.ws.send(JSON.stringify(enviar))
  }

  sendPrivate (userId, message) {
    const enviar = { userId, message, private: true }
    console.log('socket -  sendMessage', JSON.stringify(enviar))
    this.ws.send(JSON.stringify(enviar))
  }

  updateUser (message) {
    const enviar = { updateUser: message }
    console.log('socket -  updateUser', JSON.stringify(enviar))
    this.ws.send(JSON.stringify(enviar))
  }

  closeUser () {
    console.log('closeUser: -----------')
    this.ws.close()
  }
}
