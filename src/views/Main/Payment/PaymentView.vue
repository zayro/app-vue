<script setup>
import { ref, onMounted, onBeforeMount, inject, watch } from 'vue'
import swal from 'sweetalert'
import { http, httpFormData } from '@/services/http-axios'
import CurrencyInput from '@/shared/Currency.vue'
import { useConfigStoreRef } from '@/stores/config'
import { getData } from '@/api/index'
import Joi from 'joi'

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

function clearValueIfNotInDatalist () {
  const value = document.getElementById('inputEmpresas').value
  const options = document.getElementById('listEmpresas').options
  for (let i = 0; i < options.length; i++) {
    if (options[i].value === value) {
      return
    }
  }
  document.getElementById('inputEmpresas').value = ''
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

function toggleFullScreen (idElement) {
  const elem = document.getElementById(idElement)

  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch((err) => {
      alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`)
    })
  } else {
    document.exitFullscreen()
  }
}

/* document.addEventListener(
  'keydown',
  (e) => {
    if (e.key === 'Enter') {
      toggleFullScreen()
    }
  },
  false
) */

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
        <ul class="nav nav-underline nav-fill">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Active</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Much longer nav link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
          </li>
        </ul>

        <div class="d-flex flex-column">
          <div class="flex-item">
            <!--    <div class="alert alert-secondary" role="alert">
              <div class="d-flex flex-row">
                <span class="breadcrumb-item"><a href="#"> Modulo Vacante </a></span>

                <span class="breadcrumb-item active" aria-current="page"> Agregar Vacante</span>
              </div>
            </div> -->

            <div class="alert alert-secondary" role="alert">
              <div class="d-flex flex-row">
                <span class="breadcrumb-item"> Modulo Vacante &nbsp; </span>

                <span class="breadcrumb-item active" aria-current="page"> &nbsp; Agregar Vacante</span>
              </div>
            </div>

            <div id="fullscreenElement" class="card mb-3">
              <div class="card-body p-4">
                <div class="card-tools d-flex flex-row justify-content-between">
                  <div class="card-title">Crear Nuevo Registro</div>
                  <div class="d-flex flex-row justify-content-around">
                    <div class="cursor-pointer" @click="toggleFullScreen('fullscreenElement')">
                      <v-icon name="hi-arrows-expand" :fill="colorNavText" scale="1.3" />
                    </div>
                    <div>
                      <v-icon
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseExample"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                        name="bi-arrows-collapse"
                        :fill="colorNavText"
                        scale="1.3"
                      >
                      </v-icon>
                    </div>
                  </div>
                </div>

                <hr />

                <div id="collapseExample" class="row collapse">
                  <form id="pagos" action="pagos" name="pagos" @submit.prevent="saveData">
                    <div class="col-12">
                      <!--Empresa-->
                      <div class="mb-3">
                        <label for="select_apt" class="form-label">Empresa</label>
                        <input
                          id="inputEmpresas"
                          class="form-control form-control-sm"
                          list="listEmpresas"
                          name="browser"
                          type="search"
                          size="50"
                          autocomplete="off"
                          @focusout="clearValueIfNotInDatalist()"
                        />

                        <datalist id="listEmpresas">
                          <option>Brave</option>
                          <option>Chrome</option>
                          <option>Edge</option>
                          <option>Firefox</option>
                          <option>Internet Explorer</option>
                          <option>Opera</option>
                          <option>Safari</option>
                          <option>Vivaldi</option>
                          <option>other</option>
                        </datalist>
                      </div>

                      <!--Cargos-->
                      <div class="mb-3">
                        <label for="select_apt" class="form-label">Cargos</label>
                        <input
                          id="inputEmpresas"
                          class="form-control form-control-sm"
                          list="listEmpresas"
                          name="browser"
                          type="search"
                          size="50"
                          autocomplete="off"
                          @focusout="clearValueIfNotInDatalist()"
                        />

                        <datalist id="listEmpresas">
                          <option>Brave</option>
                          <option>Chrome</option>
                          <option>Edge</option>
                          <option>Firefox</option>
                          <option>Internet Explorer</option>
                          <option>Opera</option>
                          <option>Safari</option>
                          <option>Vivaldi</option>
                          <option>other</option>
                        </datalist>
                      </div>

                      <!--Cargos-->
                      <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Formacion</label>
                        <input id="exampleFormControlInput1" type="email" class="form-control form-control-sm" />
                      </div>

                      <!--Cargos-->
                      <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Salario</label>
                        <input id="exampleFormControlInput1" type="email" class="form-control form-control-sm" />
                      </div>
                      <!--Cargos-->
                      <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Horario</label>
                        <input id="exampleFormControlInput1" type="email" class="form-control form-control-sm" />
                      </div>
                      <!--Cargos-->
                      <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Ubicacion</label>
                        <input id="exampleFormControlInput1" type="email" class="form-control form-control-sm" />
                      </div>
                      <!--Cargos-->
                      <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Experiencia</label>
                        <input id="exampleFormControlInput1" type="email" class="form-control form-control-sm" />
                      </div>

                      <div class="d-grid gap-2 mx-auto">
                        <button class="btn btn-primary" type="submit">Aceptar</button>
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

<style lang="scss" scoped></style>
