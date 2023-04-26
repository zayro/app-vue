<script setup>
import { ref, onMounted, onBeforeMount, inject, watch } from 'vue'
import swal from 'sweetalert'
import { http, httpFormData } from '@/services/http-axios'
import CurrencyInput from '@/shared/Currency.vue'
import { useConfigStoreRef } from '@/stores/config'
import { getData } from '@/api/index'
import Joi from 'joi'

import Spinner from '@/shared/Spinner.vue'

const confStore = useConfigStoreRef()

console.log('🚧 - confStore:', confStore.getInformation[0])

const txt = inject('txt')
console.log('🚧 - txt', txt)
const conf = inject('conf')
console.log('🚧 - conf', conf)

const load = ref(true)
const comprobante = ref()
const responseUpload = ref()
const requestApt = ref()
const periodos = ref()
const infoPay = ref()

const initInfoPay = {
  id_apartamento: '',
  id_tipo_metodo_pago: '',
  detalle_pago: [],
  comprobante: ''
}

infoPay.value = initInfoPay

const schema = Joi.object({
  id_apartamento: Joi.string().required(),
  id_tipo_metodo_pago: Joi.string().required(),
  detalle_pago: Joi.array()
    .items(
      Joi.object({
        valor: Joi.number().required(),
        fecha: Joi.object({
          month: Joi.number().integer().min(0).max(12).required(),
          // year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required()
          year: Joi.number().integer().min(1900).required()
        }).required()
      })
    )
    .required(),
  comprobante: Joi.string().allow('')
})

const optionsCurrency = {
  currency: 'USD',
  currencyDisplay: 'hidden',
  hideCurrencySymbolOnFocus: true,
  hideGroupingSeparatorOnFocus: true,
  hideNegligibleDecimalDigitsOnFocus: true,
  autoDecimalDigits: false,
  useGrouping: true,
  accountingSign: false,
  valueRange: {
    min: 1000
  }
}

const urlGetPagos = '/general/select/adminApt.apartamento'

const execute = () => {
  getData(urlGetPagos)
    .then((result) => {
      console.log('🚧 - getUsers.then - result', result.data)
      requestApt.value = result.data
    })
    .catch((err) => {
      console.log('🚧 - getUsers.then - err', err)
    })
}

execute()

const saveData = () => {
  load.value = false

  if (responseUpload.value) {
    infoPay.value.comprobante = responseUpload.value.filename
  }

  const result = schema.validate(infoPay.value)
  console.log('🚧 - saveData - infoPay.value:', infoPay.value)

  if (result.error) {
    console.log(result.error.details)
    swal('Wrong!', 'Somthing is Wrong!', 'warning')
    return false
    // throw new Error('Parameter is not a number!');
  } else {
    console.log('El objeto JSON es válido')
  }

  infoPay.value.detalle_pago = JSON.stringify(infoPay.value.detalle_pago)

  const payload = {
    db: 'enterprise',
    insert: 'adminApt.pagos',
    values: infoPay.value
  }

  http
    .post('general/insert', payload)
    .then((response) => {
      console.log('🚧 - .then - response:', response)
      swal('Transaccion', 'Exitosa', 'success')
      infoPay.value = initInfoPay
      periodos.value = 0
      document.getElementById('pagos').reset()
    })
    .catch((error) => {
      console.log(error)
      swal('Wrong!', 'Somthing is Wrong!', 'error')
    })
    .finally(() => (load.value = true))
}

const uploadImage = () => {
  const formData = new FormData()

  // HTML file input, chosen by user
  formData.append('archivo', comprobante.value)

  httpFormData
    .post(`uploadSingle/${infoPay.value.id_apartamento}`, formData)
    .then((response) => {
      responseUpload.value = response.data.data
      swal('Upload File!', 'it was successfully', 'success')
    })
    .catch((error) => {
      console.log(error)
      swal('Upload File!!', 'Somthing is Wrong!', 'error')
    })
}

const previewFiles = (event) => {
  console.log('files', event.target.files)
  const files = event.target.files

  comprobante.value = files[0]
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    // This code is only for demo ...
    console.group('File ' + i)
    console.log('name : ' + file.name)
    console.log('size : ' + file.size)
    console.log('type : ' + file.type)
    console.log('date : ' + file.lastModified)
    console.groupEnd()
  }
}

watch(periodos, async (newValue, old) => {
  infoPay.value.detalle_pago = []
  for (let i = 0; i <= newValue - 1; i++) {
    infoPay.value.detalle_pago.push({
      valor: 0,
      fecha: {
        month: new Date().getMonth(),
        year: new Date().getFullYear()
      }
    })
  }
})

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
    <Spinner :load="load.value" />
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

                <div class="row">
                  <form id="pagos" action="pagos" name="pagos" @submit.prevent="saveData">
                    <div class="col-12">
                      <div class="mb-3">
                        <label for="select_apt" class="form-label">Apt</label>
                        <select
                          id="select_apt"
                          v-model="infoPay.id_apartamento"
                          class="form-select"
                          aria-label="Default select apt."
                          required
                        >
                          <option v-for="item in requestApt" :key="item.id" :value="item.id">
                            {{ item.piso }}
                          </option>
                        </select>
                      </div>

                      <div class="mb-3">
                        <label for="periodos" class="form-label"
                          >Periodos a cancelar
                          <span class="validity"></span>
                        </label>
                        <input
                          id="periodos"
                          v-model="periodos"
                          type="number"
                          min="1"
                          max="10"
                          step="1"
                          class="form-control"
                          name="periodos"
                          required
                        />
                      </div>

                      <div v-for="(item, index) in periodos" :key="index" class="row">
                        <div class="col-6">
                          <div class="mb-3">
                            <label for="date_pay" class="form-label">Periodo a Cancelar </label>
                            <VueDatePicker id="date_pay" v-model="infoPay.detalle_pago[index].fecha" month-picker />
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="mb-3">
                            <label for="value_pay" class="form-label">Valor a Cancelar</label>
                            <CurrencyInput
                              v-model="infoPay.detalle_pago[index].valor"
                              class="form-control"
                              :options="optionsCurrency"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="mb-3">
                        <label for="select_year" class="form-label">Medio de Pago</label>
                        <select
                          id="select_year"
                          v-model="infoPay.id_tipo_metodo_pago"
                          class="form-select"
                          aria-label="Default select year"
                          required
                        >
                          <option selected>seleccionar</option>
                          <option value="1">Efectivo</option>
                          <option value="2">Transferencia</option>
                        </select>
                      </div>
                      <div v-show="infoPay.id_tipo_metodo_pago == 2" class="mb-3">
                        <label for="fileinput" class="form-label">Agregar comprobante</label>
                        <input
                          id="fileinput"
                          class="form-control"
                          type="file"
                          accept="image/*"
                          @change="previewFiles"
                        />
                        <button class="btn btn-primary" type="button" @click="uploadImage">Agregar Comprobante</button>
                      </div>

                      <div class="d-grid gap-2 mx-auto">
                        <button class="btn btn-primary" type="submit">Generar Pago</button>
                      </div>
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

<style lang="css" scoped>
input:invalid + span::after {
  content: '✖';
  padding-left: 5px;
}

input:valid + span::after {
  content: '✓';
  padding-left: 5px;
}

#main {
  transition: margin-left 0.5s;
  padding: 16px;
  width: 90%;
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
