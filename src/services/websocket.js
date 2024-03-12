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
    // Escuha los mensajes del Socket
    /*
    this.ws.onopen = function (e) {
      console.log('[open] Conexión establecida')
      console.log('Enviando al servidor')
    }

    this.ws.onmessage = function (event) {
      console.log('this.ws.onmessage', event.data)
    }

    this.ws.onclose = function (e) {
      console.log('[close socket]', e)
         setTimeout(function() {
          console.log('reconnect')
            this.connect();
          }, 1000);
    }

    this.ws.onerror = function (e) {
      console.log('[error]', e)
    }
    */
  }

  sendBroadcast (valueMessage) {
    const enviar = { message: valueMessage, broadcast: true }
    console.log('sendMessage', JSON.stringify(enviar))
    this.ws.send(JSON.stringify(enviar))
  }

  getListUser () {
    const enviar = { listUser: true }
    console.log('sendMessage', JSON.stringify(enviar))
    this.ws.send(JSON.stringify(enviar))
  }

  sendPrivate (userId, message) {
    const enviar = { userId, message, private: true }
    console.log('sendMessage', JSON.stringify(enviar))
    this.ws.send(JSON.stringify(enviar))
  }

  updateUser (message) {
    const enviar = { updateUser: message }
    console.log('sendMessage', JSON.stringify(enviar))
    this.ws.send(JSON.stringify(enviar))
  }

  closeUser () {
    console.log('closeUser: -----------')
    this.ws.close()
  }
}
