<script setup>
import { ref, watch } from 'vue'

import moment from 'moment'

import { getData, deleteData } from '../../../api/RequestPayment'

// SECTION - Logic

// ANCHOR -  Data Handler State of View
const records = ref([])
const recordsFiltered = ref([])
const recordsShowTable = ref([])
const search = ref('')
const sortField = ref({
  name: '',
  asc: true
})
const paginationLimit = ref(10)
const paginationPage = ref([])
const paginationPageTotal = ref(0)
const paginationPagePosition = ref({})

const column = ['apartamento', 'administracion', 'fecha']

// ANCHOR - Observable to input Search

watch(search, async (newValue, oldValue) => {
  if (newValue !== '') {
    try {
      const filterColumn = records.value.map((x, index) => {
        return Object.keys(x)
          .filter((key) => column.includes(key))
          .reduce((cur, key) => {
            return Object.assign(cur, { [key]: records.value[index][key] })
          }, [])
      })

      recordsFiltered.value = filterColumn.filter((value) => {
        return Object.values(value).filter((item) => item.toString().includes(search.value)).length > 0
      })
      console.log('🚧 - recordsFiltered.value=filterColumn.filter - recordsFiltered:', recordsFiltered)

      displayPageNav(recordsFiltered.value.length, paginationLimit.value)
      displayItems(0, 'filtered')
    } catch (error) {
      console.log(error)
    }
  } else {
    console.log('not rows')
    recordsFiltered.value = records.value
    displayPageNav(records.value.length, paginationLimit.value)
    displayItems()
  }
})

// ANCHOR - API CONECTION

function execute () {
  getData()
    .then((result) => {
      console.log('🚧 - getUsers.then - result', result)
      records.value = result.data
      recordsFiltered.value = result.data
      displayPageNav(records.value.length, paginationLimit.value)
      displayItems()
    })
    .catch((err) => {
      console.log('🚧 - getUsers.then - err', err)
    })
}

execute()

const deleteRow = (value) => {
  const info = { table: 'adminApt.pagos', condition: { id: value } }

  console.log('🚧 - deleteRow - info:', info)

  deleteData(info)
    .then((result) => {
      console.log('🚧 - deleteData.then - result', result)
      execute()
    })
    .catch((err) => {
      console.log('🚧 - getUsers.then - err', err)
    })
}

// ANCHOR - Methods
const displayPageNavNext = () => {
  const data = paginationPagePosition.value

  let n = 0
  const acum = []

  while (n < paginationPageTotal.value) {
    n++
    acum.push(n)
  }
  console.log('🚧 - displayPageNavNext - acum', acum)
  const from = parseInt(data.index)
  const to = from + 6
  console.log('🚧 - displayPageNavNext - to', to)
  paginationPage.value = acum.slice(from, to)
  console.log('🚧 - displayPageNavNext - paginationPage.value', paginationPage.value)

  displayItems(data.index + 1)
}

const displayPageNavPrev = () => {
  const data = paginationPagePosition.value

  let n = 0
  const acum = []

  while (n < paginationPageTotal.value) {
    n++
    acum.push(n)
  }

  const from = parseInt(data.index) < 6 ? 6 : parseInt(data.index)
  const to = from - 6

  paginationPage.value = acum.slice(to < 0 ? 0 : to, from)
  displayItems(data.index - 1)
}

const displayPageNav = (totalItems, perPage) => {
  perPage = perPage || 1
  const totalItemsPage = Math.ceil(totalItems / perPage)
  paginationPageTotal.value = totalItemsPage
  paginationPage.value = paginationPageTotal.value > 6 ? 6 : totalItemsPage
}

const displayItems = (perPage = 0, type = 'default') => {
  const offSet = paginationLimit.value * perPage
  const index = offSet - paginationLimit.value

  paginationPagePosition.value = {
    index: perPage === 0 ? 1 : perPage,
    from: index,
    to: offSet
  }

  if (perPage === 0 && type === 'default') {
    recordsShowTable.value = records.value.slice(0, paginationLimit.value)
  }

  if (perPage === 0 && type !== 'default') {
    recordsShowTable.value = recordsFiltered.value.slice(0, paginationLimit.value)
  }

  if (perPage !== 0) {
    recordsShowTable.value = recordsFiltered.value.slice(index, offSet)
  }
}

const SortArrayObject = () => {
  const prop = sortField.value.name
  const asc = sortField.value.asc
  recordsShowTable.value = records.value.sort(function (a, b) {
    if (asc) {
      return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0
    } else {
      return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0
    }
  })

  displayItems()
}

const currency = (value) => {
  if (typeof value !== 'number') {
    return value
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  return formatter.format(value)
}

const dateFormat = (value) => {
  return moment(value).format('YYYY-MM-DD')
}
</script>

<template>
  <div id="flex-container">
    <div id="main">
      <div class="card mb-3">
        <div class="card-body">
          <div class="card-title">Reporte de Pagos</div>
          <hr />
          <div class="column">
            <div class="col mb-5">
              <div class="d-flex justify-content-around">
                <div>
                  <button
                    class="btn btn-outline-dark"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    Search All Fields
                  </button>
                </div>
              </div>

              <div id="collapseExample" class="collapse">
                <table class="table">
                  <thead>
                    <tr>
                      <th class="text-center align-middle" style="width: 10%">Search:</th>
                      <th style="width: 90%">
                        <input v-model="search" type="text" class="form-control" />
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>

            <div class="col mb-3">
              <table class="table table-sm table-striped">
                <thead>
                  <tr>
                    <th></th>
                    <th
                      v-for="item in column"
                      :key="item"
                      @click=";(sortField.name = item), (sortField.asc = !sortField.asc), SortArrayObject()"
                    >
                      {{ item }}
                    </th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">
                  <tr v-for="item in recordsShowTable" :key="item.id">
                    <td>
                      <div>
                        <!-- <v-icon name="fa-edit" fill="#686868" title="Edit" scale="1" /> -->
                        <v-icon name="md-delete" fill="#686868" title="Delete" scale="1" @click="deleteRow(item.id)" />
                      </div>
                    </td>

                    <td>{{ item.apartamento }}</td>
                    <td>{{ currency(item.administracion) }}</td>
                    <td>{{ dateFormat(item.fecha) }}</td>
                  </tr>
                </tbody>
              </table>

              <div id="pagination">
                <button type="button" class="btn" @click="displayPageNavPrev()">
                  <v-icon name="fa-arrow-left" :fill="black" scale="1" />
                </button>
                <div v-for="item in paginationPage" :key="item">
                  <button
                    type="button"
                    class="btn"
                    :class="paginationPagePosition.index == item ? 'btn-primary' : 'btn-light'"
                    @click="displayItems(item)"
                  >
                    {{ item }}
                  </button>
                </div>
                <button type="button" class="btn" @click="displayPageNavNext()">
                  <v-icon name="fa-arrow-right" :fill="black" scale="1" />
                </button>
              </div>

              <div class="total">total rows: {{ recordsFiltered.length }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#flex-container {
  margin-top: 80px;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: center;
  align-content: center;
}

#main {
  transition: margin-left 0.5s;
  padding: 16px;
}
.card {
  width: 90rem;
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
