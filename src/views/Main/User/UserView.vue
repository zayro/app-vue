<script setup>
import { ref, onMounted, onBeforeMount, inject } from 'vue'

import CurrencyInput from '../../../shared/Currency.vue'

const txt = inject('txt')
console.log('🚧 - txt', txt)
const conf = inject('conf')
console.log('🚧 - conf', conf)

const load = ref()
const date = ref()

const infoPay = ref({
  apartamento: '',
  valor: '',
  metodo_pago: '',
  fecha_rango: ''
})

const optionsCurrency = {
  currency: 'USD',
  currencyDisplay: 'hidden',
  hideCurrencySymbolOnFocus: true,
  hideGroupingSeparatorOnFocus: true,
  hideNegligibleDecimalDigitsOnFocus: true,
  autoDecimalDigits: false,
  useGrouping: true,
  accountingSign: false
}

onBeforeMount(() => {
  load.value = false
})

// For demo purposes assign range from the current date
onMounted(() => {
  load.value = true
  const startDate = new Date()
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7))
  date.value = [startDate, endDate]
})
</script>

<template>
  <div>
    <div v-show="load" id="flex-container">
      <div id="main">
        <div class="d-flex flex-column">
          <div class="flex-item">
            <div class="card mb-3">
              <div class="card-body">
                <div class="card-tools">
                  <div class="card-title">Agregar Pago</div>
                </div>

                <hr />
                <div class="configNavbar row">
                  <div class="col-12">
                    <div class="mb-3">
                      <label for="select_apt" class="form-label">Apt</label>
                      <select
                        id="select_apt"
                        v-model="infoPay.apartamento"
                        class="form-select"
                        aria-label="Default select apt."
                      >
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="value_pay" class="form-label">Valor a Cancelar</label>

                      <CurrencyInput v-model="infoPay.valor" class="form-control" :options="optionsCurrency" />
                    </div>
                    <div class="mb-3">
                      <label for="date_pay" class="form-label">Periodo a Cancelar</label>
                      <VueDatePicker id="date_pay" v-model="infoPay.fecha_rango" range />
                    </div>
                    <div class="mb-3">
                      <label for="select_year" class="form-label">Medio de Pago</label>
                      <select
                        id="select_year"
                        v-model="infoPay.metodo_pago"
                        class="form-select"
                        aria-label="Default select year"
                      >
                        <option selected>seleccionar</option>
                        <option value="1">Efectivo</option>
                        <option value="2">Transferencia</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="fileinput" class="form-label">Agregar comprobante</label>
                      <input id="fileinput" class="form-control" type="file" accept="image/*" />
                    </div>

                    <div class="d-grid gap-2 mx-auto">
                      <button class="btn btn-primary" type="button">Generar Pago</button>
                    </div>
                    {{ infoPay }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
#main {
  transition: margin-left 0.5s;
  padding: 16px;
}
.card {
  width: 90rem;
}
.card-body {
  padding: 40px;
}

.flex-item {
  -webkit-flex: auto;
  flex: auto;
}

#flex-container {
  margin-top: 80px;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: center;
  align-content: center;
  /* height: 98vh; */
}

.card-tools {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#flex-container {
  margin-top: 80px;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: center;
  align-content: space-around;
  /* height: 98vh; */
}
</style>
