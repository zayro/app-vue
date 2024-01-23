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
  <!-- Datos de Contacto -->
  <fieldset>
    <legend>Datos de Contacto</legend>
    <div class="col-12">
      <div class="row">
        <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
          <label for="exampleFormControlInput1" class="form-label">Primer Nombre</label>
          <input id="exampleFormControlInput1" type="text" class="form-control form-control-sm" placeholder="" />
        </div>
        <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
          <label for="exampleFormControlInput1" class="form-label">Segundo Nombre</label>
          <input id="exampleFormControlInput1" type="text" class="form-control form-control-sm" placeholder="" />
        </div>
        <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
          <label for="exampleFormControlInput1" class="form-label">Primer Apellido</label>
          <input id="exampleFormControlInput1" type="text" class="form-control form-control-sm" placeholder="" />
        </div>
        <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
          <label for="exampleFormControlInput1" class="form-label">Segundo Apellido</label>
          <input id="exampleFormControlInput1" type="text" class="form-control form-control-sm" placeholder="" />
        </div>
      </div>
    </div>
  </fieldset>
</template>
