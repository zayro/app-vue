<script setup>
import { ref, watch } from 'vue'
import { getData, getDataFilter } from '@/api/index'

import moment from 'moment'

import { currency } from '@/services/table'

// SECTION - Logic

const column = ['apartamento', 'valor', 'fecha']

const defaultBalance = {
  pago_anual: 0,
  pago_actual: 0,
  pago_pendiente: 0
}

const balance = ref(defaultBalance)
const apartamento = ref()
const requestApt = ref()

const records = ref([])

// ANCHOR - API CONECTION

moment.lang('es', {
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
  monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
  weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
  weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
  weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
})

const urlGetApt = '/general/select/adminApt.apartamento'

const urlGetBalace = '/general/search'

const execute = () => {
  getData(urlGetApt)
    .then((result) => {
      console.log('🚧 - getUsers.then - result', result.data)
      requestApt.value = result.data
    })
    .catch((err) => {
      console.log('🚧 - getUsers.then - err', err)
    })
}

execute()

function loadData (value) {
  const getYear = new Date().getFullYear()
  getDataFilter({
    url: urlGetBalace,
    From: 'adminApt.vista_pagos',
    Fields: '*',
    Where: { apartamento: value, año: getYear }
  })
    .then((result) => {
      console.log('🚧 - getUsers.then - result', result)
      records.value = result.data
    })
    .catch((err) => {
      console.error('🚧 - getUsers.then - err', err)
    })
}

function loadDataFilter (value) {
  getDataFilter({ url: urlGetBalace, From: 'adminApt.balance_apt', Fields: '*', Where: { apartamento: value } })
    .then((result) => {
      console.log('🚧 - .then - result: loadDataFilter', result.data)

      if (result.data.length > 0) {
        balance.value = result.data[0]
      } else {
        balance.value = defaultBalance
      }

      console.log('🚧 - loadDataFilter.then - result', result)
    })
    .catch((err) => {
      console.error('🚧 - getUsers.then - err', err)
    })
}

const formmatDate = (value) => {
  return moment(value, 'YYYY-MM-DD').format('LL')
}

// watch works directly on a ref
watch(apartamento, async (newQuestion, oldQuestion) => {
  console.log('🚧 - watch - oldQuestion:', oldQuestion)
  loadData(newQuestion)
  loadDataFilter(newQuestion)
})
</script>

<template>
  <div class="flex-container">
    <div class="main">
      <div class="row">
        <form id="pagos" action="pagos" name="pagos">
          <div class="col-12">
            <div class="mb-3">
              <label for="select_apt" class="form-label">Apt</label>
              <select id="select_apt" v-model="apartamento" class="form-select" aria-label="Default select apt.">
                <option v-for="item in requestApt" :key="item.piso" :value="item.piso">
                  {{ item.piso }}
                </option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <div class="flex-widget">
        <div class="widget-card">
          <div class="d-flex justify-content-between align-items-center">
            <div class="value-box">
              <h4 class="mb-0">{{ currency(balance.pago_anual) }}</h4>
            </div>
            <div class="text-warning">
              <strong><span>Deuda general</span></strong>
            </div>
          </div>
        </div>

        <div class="widget-card">
          <div class="d-flex justify-content-between align-items-center">
            <div class="value-box">
              <h4 class="mb-0">{{ currency(balance.pago_actual) }}</h4>
            </div>
            <div class="text-success">
              <strong><span>Abono</span></strong>
            </div>
          </div>
        </div>

        <div class="widget-card">
          <div class="d-flex justify-content-between align-items-center">
            <div class="value-box">
              <h4 class="mb-0">{{ currency(balance.pago_pendiente) }}</h4>
            </div>
            <div class="text-danger">
              <strong><span>Pendiente</span></strong>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div v-show="records.length > 0" class="row">
        <div class="card mb-3">
          <div class="card-body">
            <div class="card-title">Reporte de Pagos</div>
            <hr />
            <div class="column">
              <div class="col mb-3">
                <table class="table table-sm table-striped">
                  <thead>
                    <tr>
                      <th v-for="item in column" :key="item">
                        {{ item }}
                      </th>
                    </tr>
                  </thead>
                  <tbody class="table-group-divider">
                    <tr v-for="item in records" :key="item.id">
                      <td>{{ item.apartamento }}</td>
                      <td>{{ currency(item.valor) }}</td>
                      <td>{{ item.mes + 1 }}/ {{ item.año }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.widget-card {
  background-color: white;
  border: 1px solid rgb(224, 224, 224);
  padding: 20px;
  border-radius: 10px;
  width: 30%;
}

.flex-widget {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.btn {
  padding-left: 0.4rem;
  padding-right: 0.4rem;
}

table th {
  text-transform: uppercase;
}

.botonera {
  display: flex;
  justify-content: space-around;
  justify-items: space-around;
  align-items: stretch;
}

#pagination {
  display: flex;
  padding: 10px;
  text-align: center;
  flex-direction: row;
}

#pagination div button {
  margin: 5px;
}

#pagination > div button:last-child {
  border: 1px solid rgba(0, 0, 0, 0.2);
}

#pagination > div button:hover {
  background: rgba(0, 0, 0, 0.03);
  color: #1a7beb;
}

.total {
  display: flex;
  text-align: center;
  font-size: 15px;
  text-transform: uppercase;
  padding: 10px;
}
</style>
