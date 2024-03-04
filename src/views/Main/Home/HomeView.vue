<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
console.groupCollapsed('info Vite')
console.log('----------------------', import.meta.env.BASE_URL)
console.log('----------------------', import.meta.env.VITE_DEBUG)
console.groupEnd()
const router = useRouter()
onMounted(() => {
  document.title = 'Home'
})

const goComponents = () => {
  router.push({ path: '/components' })
}
</script>

<template>
  <div class="surface-card p-4 shadow-2 border-round">
    <div class="grid grid-nogutter surface-section text-800">
      <div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center">
        <section>
          <span class="block text-6xl font-bold mb-1">Welcome App</span>
          <div class="text-6xl text-primary font-bold mb-3">your visitors deserve to see</div>
          <p class="mt-0 mb-4 text-700 line-height-3">
            Somos una empresa innovadora en el mercado de software empresarial, y nos dedicamos a proporcionar
            soluciones de gestión de negocios efectivas y eficientes a nuestros clientes.
          </p>

          <Button label="Learn More" type="button" class="mr-3" raised></Button>
          <Button label="Live Demo" type="button" outlined @click="goComponents"></Button>
        </section>
      </div>
      <div class="col-12 md:col-6 overflow-hidden">
        <img
          src="https://freya.primevue.org/demo/images/blocks/hero/hero-1.png"
          alt="Image"
          class="md:ml-auto block md:h-full"
          style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)"
        />
      </div>
    </div>
  </div>
</template>
