<script setup>
import { ref, onMounted, onBeforeMount, inject } from 'vue'
import swal from 'sweetalert'
import { http, httpFormData } from '@/services/http-axios'
import CurrencyInput from '@/shared/Currency.vue'
import { useConfigStoreRef } from '@/stores/config'
import { getData } from '@/api/index'

const confStore = useConfigStoreRef()

console.log('🚧 - confStore:', confStore.getInformation[0])

const txt = inject('txt')
console.log('🚧 - txt', txt)
const conf = inject('conf')
console.log('🚧 - conf', conf)

const load = ref()
const date = ref()
const comprobante = ref()
const responseUpload = ref()
const requestApt = ref()

const cleanInfoPay = {
  apartamento: '',
  valor: '',
  metodo_pago: '',
  fecha_rango: '',
  comprobante: ''
}

const infoPay = ref(cleanInfoPay)

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
  if (responseUpload.value) {
    infoPay.value.comprobante = responseUpload.value.filename
  }

  infoPay.value.fecha_rango = JSON.stringify(date.value)

  const payload = {
    db: 'enterprise',
    insert: 'adminApt.pagos',
    values: infoPay.value
  }

  http
    .post('general/insert', payload)
    .then((response) => {
      console.log('🚧 - .then - response:', response)
      swal('Good job!', 'Welcome to App!', 'success')
      infoPay.value = cleanInfoPay
      document.getElementById('pagos').reset()
    })
    .catch((error) => {
      console.log(error)
      swal('Wrong!', 'Somthing is Wrong!', 'error')
    })
}

const uploadImage = () => {
  const formData = new FormData()

  // HTML file input, chosen by user
  formData.append('archivo', comprobante.value)

  httpFormData
    .post('uploadSingle/123456', formData)
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
                <div class="row">
                  <form id="pagos" action="pagos" name="pagos">
                    <div class="col-12">
                      <div class="mb-3">
                        <label for="select_apt" class="form-label">Apt</label>
                        <select
                          id="select_apt"
                          v-model="infoPay.apartamento"
                          class="form-select"
                          aria-label="Default select apt."
                        >
                          <option v-for="item in requestApt" :key="item.piso" :value="item.piso">
                            {{ item.piso }}
                          </option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label for="value_pay" class="form-label">Valor a Cancelar</label>

                        <CurrencyInput v-model="infoPay.valor" class="form-control" :options="optionsCurrency" />
                      </div>
                      <div class="mb-3">
                        <label for="date_pay" class="form-label">Periodo a Cancelar</label>
                        <VueDatePicker id="date_pay" v-model="date" range />
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
                      <div v-show="infoPay.metodo_pago == 2" class="mb-3">
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
                        <button class="btn btn-primary" type="button" @click="saveData">Generar Pago</button>
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
