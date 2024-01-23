<script setup>
import { ref } from 'vue'

const infoPay = ref()

const initInfoPay = {
  id_apartamento: '',
  id_tipo_metodo_pago: '',
  detalle_pago: [],
  comprobante: ''
}

infoPay.value = initInfoPay
</script>
<template>
  <!-- Datos de Informacion -->
  <fieldset>
    <legend>Informacion</legend>
    <div class="col-12">
      <div class="row">
        <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
          <label for="exampleFormControlInput1" class="form-label">Direccion</label>
          <input id="exampleFormControlInput1" type="text" class="form-control form-control-sm" placeholder="" />
        </div>
        <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
          <label for="exampleFormControlInput1" class="form-label">Telefono</label>
          <input id="exampleFormControlInput1" type="text" class="form-control form-control-sm" placeholder="" />
        </div>
        <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
          <label for="exampleFormControlInput1" class="form-label">Celular</label>
          <input id="exampleFormControlInput1" type="text" class="form-control form-control-sm" placeholder="" />
        </div>
        <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
          <label for="exampleFormControlInput1" class="form-label">Email</label>
          <input id="exampleFormControlInput1" type="email" class="form-control form-control-sm" placeholder="" />
        </div>
        <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
          <label for="select_apt" class="form-label">Pais</label>
          <select
            id="select_apt"
            v-model="infoPay.id_apartamento"
            class="form-select form-select-sm"
            aria-label="Default select apt."
            required
          >
            <option v-for="item in requestApt" :key="item.id" :value="item.id">
              {{ item.piso }}
            </option>
          </select>
        </div>
        <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
          <label for="select_apt" class="form-label">Ciudad</label>
          <select
            id="select_apt"
            v-model="infoPay.id_apartamento"
            class="form-select form-select-sm"
            aria-label="Default select apt."
            required
          >
            <option v-for="item in requestApt" :key="item.id" :value="item.id">
              {{ item.piso }}
            </option>
          </select>
        </div>
        <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
          <label for="exampleFormControlInput1" class="form-label">Barrio</label>
          <input id="exampleFormControlInput1" type="text" class="form-control form-control-sm" placeholder="" />
        </div>
        <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
          <label for="select_apt" class="form-label">Estrato</label>
          <select
            id="select_apt"
            v-model="infoPay.id_apartamento"
            class="form-select form-select-sm"
            aria-label="Default select apt."
            required
          >
            <option v-for="item in requestApt" :key="item.id" :value="item.id">
              {{ item.piso }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </fieldset>
</template>
