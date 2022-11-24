<script setup>

import { onUnmounted, onMounted } from 'vue'
import { SocketService } from '@/services/socket.js'

// client-side
const socket = SocketService.socket

onMounted(() => {
  console.log(' ----------- onMounted -----------')

  socket.on('connect', () => {
    console.log(socket.id)
  })

  SocketService.join('userAbout', 'about')
  SocketService.messageRoom({ to: 'about', content: 'hola about' })

  socket.on('access', data => {
    console.log('🚧 - access data', data)
  })

  socket.on('message', message => {
    console.log('🚧 - message', message)
  })

  socket.on('users', message => {
    console.log('🚧 - users', message)
    console.log('🚧 - users about length', message.filter(item => item.room === 'about').length)
  })

  socket.on('disconnect', () => {
    console.log('🚧 - socket.on - disconnect', socket.connected)
  })
})

onUnmounted(() => {
  console.log(' ----------- onUnmounted -----------')
  socket.disconnect()
})

</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
  }
}
</style>
