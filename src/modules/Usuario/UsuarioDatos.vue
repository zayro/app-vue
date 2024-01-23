<script setup>
import { ref, onMounted, onBeforeMount, inject, reactive, watch } from 'vue'

import { useConfigStoreRef } from '@/stores/config'

import DatosPersonales from './DatosPersonales.vue'
import DatosContacto from './DatosContacto.vue'

import { useStepper } from '@vueuse/core'

const confStore = useConfigStoreRef()

console.log('🚧 - confStore:', confStore.getInformation[0])

const txt = inject('txt')
console.log('🚧 - txt', txt)
const conf = inject('conf')
console.log('🚧 - conf', conf)

const load = ref(true)

const infoPay = ref()

const datosPersona = reactive({
  primerNombre: '',
  segundoNombre: ''
})

const initInfoPay = {
  id_apartamento: '',
  id_tipo_metodo_pago: '',
  detalle_pago: [],
  comprobante: ''
}

infoPay.value = initInfoPay
const stepper = useStepper({
  'user-information': {
    title: 'Datos Personales',
    isValid: () => datosPersona.primerNombre !== ''
  },
  billing: {
    title: 'Datos Contacto',
    isValid: () => true
  },
  terms: {
    title: 'Otros',
    isValid: () => false
  }
})

function submit () {
  if (stepper.current.value.isValid()) {
    stepper.goToNext()
  }
}

function allStepsBeforeAreValid (index) {
  return !Array(index)
    .fill(null)
    .some((_, i) => !stepper.at(i)?.isValid())
}
onBeforeMount(() => {
  load.value = false
})

onMounted(() => {
  load.value = true
})
</script>

<template>
  <div>
    <!-- LOADING -->

    <div v-show="load" class="flex-container">
      <div class="main">
        <div class="d-flex flex-column">
          <div class="flex-item">
            <div class="card mb-3">
              <div class="card-body p-4">
                <div class="card-tools">
                  <div class="card-title">Datos de Usuario</div>
                </div>

                <hr />

                <div class="d-flex justify-content-center">
                  <div class="btn-group" role="group" aria-label="Basic example">
                    <button
                      v-for="(step, id, i) in stepper.steps.value"
                      :key="id"
                      type="button"
                      class="btn btn-primary"
                      :disabled="!allStepsBeforeAreValid(i) && stepper.isBefore(id)"
                      @click="stepper.goTo(id)"
                      v-text="step.title"
                    ></button>
                  </div>
                </div>

                <div class="row">
                  <form id="pagos" @submit.prevent="submit">
                    <div v-if="stepper.isCurrent('user-information')">
                      <!-- Datos Personales -->
                      <DatosPersonales
                        v-model:primer-nombre="datosPersona.primerNombre"
                        v-model:segundo-nombre="datosPersona.segundoNombre"
                      />
                    </div>
                    <div v-if="stepper.isCurrent('billing')">
                      <!-- Datos Contacto -->
                      <DatosContacto />
                    </div>

                    <div>
                      <button v-if="!stepper.isLast.value" class="btn btn-primary">Siguiente</button>
                      <button v-if="stepper.isLast.value" :disabled="!stepper.current.value.isValid()">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
