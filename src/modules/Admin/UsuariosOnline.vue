<script setup>
import { ref, onMounted, onBeforeMount, onUnmounted, inject, reactive } from 'vue'

import { useConfigStoreRef } from '@/stores/config'

import { ConnectWebSocket } from '@/services/websocket'

const socket = new ConnectWebSocket()

let ws = null
console.log('🚧 - router.beforeEach - ws:', ws)
if (ws === null) {
  ws = socket.connect('admin')
}

/**
 * Storage
 */

const confStore = useConfigStoreRef()

console.log('🚧 - confStore:', confStore.getInformation[0])

const txt = inject('txt')
console.log('🚧 - txt', txt)
const conf = inject('conf')
console.log('🚧 - conf', conf)

const load = ref(true)

onBeforeMount(() => {
  console.log('🚧 - onBeforeMount - onBeforeMount:')
  load.value = false
})

onMounted(() => {
  console.log('🚧 - onMounted - onMounted:')
  load.value = true

  /**
   * Services
   */

  try {
    ws.onopen = function () {
      console.log('[onopen] Conexión establecida')
    }

    console.log('🚧 - onMounted - ws.readyState:', ws.readyState)

    let IntervId

    const validConnect = () => {
      console.log('🚧 - onMounted - ws.readyState:', ws.readyState)
      if (ws.readyState === 1) {
        socket.updateUser({
          module: 'userOnlineView'
        })

        socket.getListUser()

        clearInterval(IntervId)
        // liberar nuestro inervalId de la variable
        IntervId = null
      }
    }

    IntervId = setInterval(validConnect, 1000)

    ws.onmessage = function (event) {
      console.log('[onmessage] captura de mensajes', event.data)
    }

    ws.onclose = function (e) {
      console.log('[onclose] se cierra conexion', e)
      setTimeout(function () {
        console.log('reconnect')
        // this.connect()
      }, 1000)
    }

    ws.onerror = function (e) {
      console.log('[error]', e)
    }
  } catch (error) {
    console.error(error)
  }
})

onUnmounted(() => {
  console.log('🚧 - onMounted - onMounted:')
  load.value = true
})
</script>

<template>
  <div>
    <!-- LOADING -->
  </div>
</template>

<style lang="scss" scoped>
legend {
  font-size: 1.2rem;
  font-weight: 400;
}

label {
  display: inline-block;
  font-size: 1rem;
  font-weight: lighter;
}
</style>
