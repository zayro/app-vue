import { io } from 'socket.io-client'

/*eslint-disable */
/* eslint-disable no-alert, no-console */
const SocketService = {
  // eslint-disable-next-line no-use-before-define
  socket: io('ws://localhost:4000', { transports: ['websocket'] }),
  join (username, room) {
    const info = { username: username, room: room }
    this.socket.emit('join server', info)
  },

  messageRoom (to, content) {
    this.socket.emit('messageRoom', { to: to, content: content })
  }
}

export { SocketService }
/* eslint-enable */
