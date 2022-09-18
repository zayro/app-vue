import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStoreRef = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment () {
    count.value++
  }

  return { count, doubleCount, increment }
})


export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0, name: 'Eduardo' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
