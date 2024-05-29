import { CONSTANT } from '@/environments'

export function useWebSocket (user) {
  try {
    const ws = new WebSocket(`${CONSTANT.URL.SOCKET}/ws/v1/json/${user}`)

    ws.onopen = function () {
      console.log('[onopen] Conexión establecida')
      getListUser()
    }

    do {
      console.log('🧹  - ws.readyState:', ws.readyState)
    } while (ws.readyState)

    ws.onerror = function (e) {
      console.log('[error]', e)
    }

    const getListUser = () => {
      const enviar = { listUser: true }
      console.log('socket - getListUser', JSON.stringify(enviar))
      ws.send(JSON.stringify(enviar))
    }

    const closeConnectSocked = () => {
      console.log('closeUser: -----------')
      ws.close()
    }

    const sendPrivate = (userId, message) => {
      const enviar = { userId, message, private: true }
      console.log('socket -  sendMessage', JSON.stringify(enviar))
      ws.send(JSON.stringify(enviar))
    }

    const updateUser = (message) => {
      const enviar = { updateUser: message }
      console.log('socket -  updateUser', JSON.stringify(enviar))
      ws.send(JSON.stringify(enviar))
    }

    return { ws, getListUser, closeConnectSocked }
  } catch (error) {
    console.error(error)
    return null
  }
}
