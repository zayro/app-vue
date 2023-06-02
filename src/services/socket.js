import { io } from 'socket.io-client'

import { CONSTANT } from '@/environments'

const SOCKET = CONSTANT.URL.SOCKET

/*eslint-disable */
/* eslint-disable no-alert, no-console */
const SocketService = {
  // eslint-disable-next-line no-use-before-define
  socket: io(SOCKET, { transports: ['websocket'] }),
  join(username, room) {
    const info = { username: username, room: room }
    this.socket.emit('join server', info)
  },

  messageRoom(to, content) {
    this.socket.emit('messageRoom', { to: to, content: content })
  }
}

export { SocketService }
/* eslint-enable */
