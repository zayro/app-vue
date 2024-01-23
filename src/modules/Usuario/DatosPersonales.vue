<script setup>
import { ref, onMounted, onBeforeMount, defineModel } from 'vue'

const load = ref(true)

const requestApt = ref([
  { id: 1, value: 'uno' },
  { id: 2, value: 'dos' }
])

const infoPay = ref()

const initInfoPay = {
  id_apartamento: '',
  id_tipo_metodo_pago: '',
  detalle_pago: [],
  comprobante: ''
}

infoPay.value = initInfoPay

const primerNombre = defineModel('primerNombre')
const segundoNombre = defineModel('segundoNombre')

onBeforeMount(() => {
  load.value = false
})

onMounted(() => {
  load.value = true
})
</script>
<template>
  <fieldset>
    <legend>Datos Personales</legend>
    <div class="col-12">
      <div class="row">
        <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
          <label for="primerNombre" class="form-label">Primer Nombre</label>
          <input
            id="primerNombre"
            v-model="primerNombre"
            type="text"
            class="form-control form-control-sm"
            placeholder=""
            required
          />
        </div>
        <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
          <label for="segundoNombre" class="form-label">Segundo Nombre</label>
          <input
            id="segundoNombre"
            v-model="segundoNombre"
            type="text"
            class="form-control form-control-sm"
            placeholder=""
          />
        </div>
        <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
          <label for="exampleFormControlInput1" class="form-label">Primer Apellido</label>
          <input id="exampleFormControlInput1" type="text" class="form-control form-control-sm" placeholder="" />
        </div>
        <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
          <label for="exampleFormControlInput1" class="form-label">Segundo Apellido</label>
          <input id="exampleFormControlInput1" type="text" class="form-control form-control-sm" placeholder="" />
        </div>
        <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
          <label for="select_apt" class="form-label">Tipo Documento</label>
          <select
            id="select_apt"
            v-model="infoPay.id_apartamento"
            class="form-select form-select-sm"
            aria-label="Default select apt."
            required
          >
            <option v-for="item in requestApt" :key="item.id" :value="item.id">
              {{ item.value }}
            </option>
          </select>
        </div>
        <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
          <label for="exampleFormControlInput1" class="form-label">Numero Documento</label>
          <input id="exampleFormControlInput1" type="text" class="form-control form-control-sm" placeholder="" />
        </div>
        <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
          <label for="exampleFormControlInput1" class="form-label">Fecha Expedicion</label>
          <input id="exampleFormControlInput1" type="text" class="form-control form-control-sm" placeholder="" />
        </div>
        <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
          <label for="select_apt" class="form-label">Departamento Expedicion</label>
          <select
            id="select_apt"
            v-model="infoPay.id_apartamento"
            class="form-select form-select-sm"
            aria-label="Default select apt."
            required
          >
            <option v-for="item in requestApt" :key="item.id" :value="item.id">
              {{ item.value }}
            </option>
          </select>
        </div>
        <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
          <label for="select_apt" class="form-label">Ciudad Expedicion</label>
          <select
            id="select_apt"
            v-model="infoPay.id_apartamento"
            class="form-select form-select-sm"
            aria-label="Default select apt."
            required
          >
            <option v-for="item in requestApt" :key="item.id" :value="item.id">
              {{ item.value }}
            </option>
          </select>
        </div>
        <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
          <label for="select_apt" class="form-label">Genero</label>
          <div class="form-check">
            <div class="form-check form-check-inline">
              <input
                id="inlineRadio1"
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                value="option1"
              />
              <label class="form-check-label" for="inlineRadio1">Masculino</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                id="inlineRadio2"
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                value="option2"
              />
              <label class="form-check-label" for="inlineRadio2">Femenino</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </fieldset>
</template>
