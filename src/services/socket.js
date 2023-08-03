import { io } from 'socket.io-client'

import { CONSTANT } from '@/environments'

const SOCKET = CONSTANT.URL.SOCKET

/*eslint-disable */
/* eslint-disable no-alert, no-console */
const SocketService = {
  // eslint-disable-next-line no-use-before-define
  socket: io(SOCKET, { transports: ['websocket'] }),
  subscribe(username, room) {
    this.socket.emit('subscribe', { username: username, room: room, info: info })
  },

  unsubscribe(username, room) {
    this.socket.emit('unsubscribe', { username: username, room: room })
  },

  messageRoom(to, content) {
    this.socket.emit('messageRoom', { to: to, content: content })
  }
}

export { SocketService }
/* eslint-enable */
