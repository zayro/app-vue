<script setup>
import { ref, watch } from 'vue'
import { getData, deleteData, getDataFilter } from '@/api/index'

import moment from 'moment'

import { records, currency } from '@/services/table'

// SECTION - Logic

const column = ['apartamento', 'valor', 'fecha_rango']

const defaultBalance = {
  anualidad: 0,
  pagos: 0,
  balance: 0
}

const apartamento = ref()
const requestApt = ref()
const balance = ref(defaultBalance)

// ANCHOR - API CONECTION

moment.lang('es', {
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
  monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
  weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
  weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
  weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
})

const urlGetApt = '/general/select/adminApt.apartamento'
const urlGetPagos = '/general/select/adminApt.pagos'
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
  getDataFilter({ url: urlGetBalace, From: 'adminApt.pagos', Fields: '*', Where: { apartamento: value } })
    .then((result) => {
      console.log('🚧 - getUsers.then - result', result)
      records.value = result.data
    })
    .catch((err) => {
      console.error('🚧 - getUsers.then - err', err)
    })
}

function loadDataFilter (value) {
  getDataFilter({ url: urlGetBalace, From: 'adminApt.balance', Fields: '*', Where: { apartamento: value } })
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

const deleteRow = (value) => {
  const info = { table: 'adminApt.pagos', condition: { id: value } }

  deleteData(info)
    .then((result) => {
      console.log('🚧 - deleteData.then - result', result)
      loadData()
    })
    .catch((err) => {
      console.error('🚧 - getUsers.then - err', err)
    })
}

const formmatDate = (value) => {
  return moment(value, 'YYYY-MM-DD').format('LL')
}

const diffDate = (diffDay) => {
  console.group('diffDate')
  console.log('🚧 - diffDate - diffDay:', diffDay)
  // To calculate the time difference of two dates

  const from = Date.parse(diffDay[0])
  console.log('🚧 - diffDate - from:', from)
  const to = Date.parse(diffDay[1])
  console.log('🚧 - diffDate - to:', to)

  const DifferenceTime = Date.parse(diffDay[1]) - Date.parse(diffDay[0])

  const oneDay = 1000 * 60 * 60 * 24
  console.log('🚧 - diffDate - oneDay:', oneDay)

  // To calculate the no. of days between two dates
  const DifferenceDays = DifferenceTime / oneDay

  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)

  const diff = now - start

  const day = Math.floor(diff / oneDay)
  console.log('Day of year: ' + day)

  console.groupEnd()

  return `${formmatDate(diffDay[0])} - ${formmatDate(diffDay[1])} Dias Cancelados  ${DifferenceDays + 1}`
}

function daysInYear (year) {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  console.log(currentYear) // Output: e.g. 2021

  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365
}

function daysInYearCurrent () {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()

  return (currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0 ? 366 : 365
}

// watch works directly on a ref
watch(apartamento, async (newQuestion, oldQuestion) => {
  console.log('🚧 - watch - oldQuestion:', oldQuestion)
  loadData(newQuestion)
  loadDataFilter(newQuestion)
})
</script>

<template>
  <div id="flex-container">
    <div id="main">
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
              <h4 class="mb-0">{{ currency(balance.anualidad) }}</h4>
            </div>
            <div class="text-warning">
              <strong><span>Deuda general</span></strong>
            </div>
          </div>
        </div>

        <div class="widget-card">
          <div class="d-flex justify-content-between align-items-center">
            <div class="value-box">
              <h4 class="mb-0">{{ currency(balance.pagos) }}</h4>
            </div>
            <div class="text-success">
              <strong><span>Abono</span></strong>
            </div>
          </div>
        </div>

        <div class="widget-card">
          <div class="d-flex justify-content-between align-items-center">
            <div class="value-box">
              <h4 class="mb-0">{{ currency(balance.balance) }}</h4>
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
                      <th></th>
                      <th v-for="item in column" :key="item">
                        {{ item }}
                      </th>
                    </tr>
                  </thead>
                  <tbody class="table-group-divider">
                    <tr v-for="item in records" :key="item.id">
                      <td>
                        <div>
                          <v-icon
                            name="md-delete"
                            fill="#686868"
                            title="Delete"
                            scale="1"
                            @click="deleteRow(item.id)"
                          />
                        </div>
                      </td>

                      <td>{{ item.apartamento }}</td>
                      <td>{{ currency(item.valor) }}</td>
                      <td>{{ diffDate(item.fecha_rango) }}</td>
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

#flex-container {
  margin-top: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: center;
  align-content: center;
}

#main {
  transition: margin-left 0.5s;
  padding: 16px;
  width: 100%;
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
