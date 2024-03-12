<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue'

import { ConnectWebSocket } from '@/services/websocket'

const socket = new ConnectWebSocket()

const userOnline = ref({})
const userOnlineSelected = reactive({
  user: '',
  history: [
    {
      module: '',
      time_start: ''
    }
  ]
})
const userListFind = ref()

// parent component:
const searchUser = ref()

try {
  let ws = null

  if (ws === null) {
    ws = socket.connect('admin')
  }

  ws.onopen = function () {
    console.log('[onopen] Conexión establecida')
  }

  do {
    console.log('🧹  - ws.readyState:', ws.readyState)
  } while (ws.readyState === 1)

  if (ws.readyState === 1) {
    console.log('🧹  - ws.readyState:', ws.readyState)

    const enviar = { listUser: true }
    ws.send(JSON.stringify(enviar))
  }

  ws.onmessage = (event) => {
    console.log('socket admin:', event)
    const dataSocket = JSON.parse(event.data)
    if (dataSocket?.users) {
      userOnline.value = dataSocket.users
      userListFind.value = dataSocket.users
    }

    if (dataSocket?.user) {
      socket.getListUser()
    }
  }

  ws.onerror = function (e) {
    console.log('[error]', e)
  }
} catch (error) {
  console.error(error)
}

const load = ref(true)

const updateListUser = () => {
  userOnlineSelected.user = ''
  userOnlineSelected.history = []
  socket.getListUser()
}

// Definimos una función para buscar personas mayores de 30 años
function buscarUsuario (valor) {
  const objecto = userOnline.value
  const filter = objecto.filter((data) => data.user === valor)[0]
  userOnlineSelected.user = filter.user
  userOnlineSelected.history = filter.history
}

function firstCharacter (text) {
  const data = text.substring(0, 1)
  return data
}

function listUserFind (valor) {
  const objecto = userOnline.value
  const result = objecto.filter((el) => el.user.toLowerCase().includes(valor.toLowerCase()))
  if (result.length >= 0) {
    userListFind.value = result
  } else {
    userListFind.value = userOnline.value
  }
}

function getListUser () {
  socket.getListUser()
}

function closeConnectSocked () {
  socket.closeUser()
}

onMounted(() => {
  console.log('🚧 - onMounted - onMounted: Online')
  document.title = 'Online'
  load.value = true
  setTimeout(() => {
    console.log('Delayed for 1 second.')
    getListUser()
  }, '1000')
})

onUnmounted(() => {
  console.log('🚧 - onMounted - onMounted:')
  load.value = true
  closeConnectSocked()
})
</script>

<template>
  <div class="flex justify-content-center align-items-center flex-wrap sm:flex-column md:flex-row gap-5">
    <!-- list User -->
    <Card class="flex md:w-25rem bp-0">
      <template #title>
        <div class="flex flex-column align-items-center border-bottom-1 surface-border p-6">
          <Avatar label="A" size="xlarge" class="w-6rem h-6rem border-circle shadow-4" alt="Asiya Javayant" /><span
            class="text-900 text-xl font-semibold mt-4"
            >Admin</span
          >

          <Button icon="pi pi-refresh" aria-label="Filter" @click="updateListUser()" />
        </div>
      </template>
      <template #content>
        <div class="w-full flex row-gap-4 flex-column surface-border p-4">
          <!-- Input Search -->
          <div class="flex justify-content-center align-items-center w-full">
            <IconField icon-position="left">
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText
                v-model="searchUser"
                type="search"
                placeholder="Keyword Search"
                @input="(event) => listUserFind(event.target.value)"
              />
            </IconField>
          </div>

          <div class="flex flex-row gap-4 md:flex-column overflow-y-auto" style="max-height: 53vh">
            <!-- card-->
            <div
              v-for="item in userListFind"
              :key="item.user"
              class="flex flex-nowrap justify-content-between align-items-center border-1 surface-border border-round p-3 cursor-pointer select-none hover:surface-hover transition-colors transition-duration-150"
              tabindex="0"
            >
              <div class="flex align-items-center" @click="buscarUsuario(item.user)">
                <div class="relative md:mr-3">
                  <Avatar
                    :label="firstCharacter(item.user)"
                    size="xlarge"
                    class="w-3rem h-3rem border-circle shadow-4"
                    alt="Avatar"
                  />
                  <span
                    class="w-1rem h-1rem border-circle border-2 surface-border absolute bg-green-400"
                    style="bottom: 2px; right: 2px"
                  ></span>
                </div>
                <div class="flex-column hidden md:flex">
                  <span class="text-900 font-semibold block">{{ item.user }}</span
                  ><span
                    class="block text-600 text-overflow-ellipsis overflow-hidden white-space-nowrap w-10rem text-sm"
                    >Online</span
                  >
                </div>
              </div>
              <span class="text-700 font-semibold ml-auto hidden md:inline">Today</span>
            </div>

            <!-- card end -->
          </div>
        </div>
      </template>
    </Card>

    <!-- User Track -->
    <Card v-if="userOnlineSelected.user != ''" class="flex md:w-25rem bp-0 p-0 h-full w-full" style="min-width: 50vw">
      <template #content>
        <div class="flex flex-column h-full w-full">
          <div class="flex align-items-center border-bottom-1 surface-border p-3 lg:p-6">
            <div class="relative flex align-items-center mr-3">
              <Avatar
                :label="firstCharacter(userOnlineSelected.user)"
                size="xlarge"
                class="w-4rem h-4rem border-circle shadow-4"
                alt="Avatar"
              />

              <span
                class="w-1rem h-1rem border-circle border-2 surface-border absolute bottom-0 right-0 bg-green-400"
              ></span>
            </div>
            <div class="mr-2">
              <span class="text-900 font-semibold block">{{ userOnlineSelected.user }}</span>
              <span class="text-700">Traking</span>
            </div>
          </div>
          <div class="p-3 md:px-4 lg:px-6 lg:py-4 mt-2 overflow-y-auto" style="max-height: 65vh">
            <Timeline :value="userOnlineSelected.history">
              <template #opposite="slotProps">
                <small class="p-text-secondary">{{ slotProps.item.time_start }}</small>
              </template>
              <template #content="slotProps">
                {{ slotProps.item.module }}
              </template>
            </Timeline>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
