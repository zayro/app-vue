<script setup>
import { ref, computed } from 'vue'
import { getDataFilter } from '@/api/index'

const currentPage = ref(1)
const itemsPerPage = ref(15)

const sort = ref({ key: null, direction: 1 })

const searchColumn = ref({
  apartamento: '',
  mes: '',
  año: ''
})

const nombreColumnas = ref(['apartamento', 'valor', 'mes', 'año'])

const tableData = ref([])

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage.value)
})

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value
})

const endIndex = computed(() => {
  return startIndex.value + itemsPerPage.value
})

const filteredData = computed(() => {
  const filtered = doLocalFilter()

  return filtered.sort((a, b) => {
    if (sort.value.key === null) return 0

    let comparison
    if (typeof a[sort.value.key] === 'string' && typeof b[sort.value.key] === 'string') {
      comparison = a[sort.value.key].localeCompare(b[sort.value.key])
    } else if (
      typeof a[sort.value.key] === 'object' &&
      a[sort.value.key] instanceof Date &&
      typeof b[sort.value.key] === 'object' &&
      b[sort.value.key] instanceof Date
    ) {
      comparison = a[sort.value.key].getTime() - b[sort.value.key].getTime()
    } else {
      comparison = a[sort.value.key] - b[sort.value.key]
    }
    return comparison * sort.value.direction
  })
})

const visibleItems = computed(() => {
  return filteredData.value.slice(startIndex.value, endIndex.value)
})

function doLocalFilter () {
  const filters = Object.keys(searchColumn.value).reduce((prev, key) => {
    if (!searchColumn.value[key]) {
      return prev
    }
    return { ...prev, [key]: searchColumn.value[key] }
  }, {})

  const filtered = tableData.value.filter((item) => {
    return Object.keys(filters).every((key) => {
      return item[key] == filters[key]
    })
  })
  return filtered
}

const urlGetSearch = '/general/search'

function onColumnFilter (column, value) {
  const copyColumn = { ...searchColumn.value }
  copyColumn[column] = value
  searchColumn.value = { ...copyColumn }
}

function loadData () {
  const getYear = new Date().getFullYear()
  getDataFilter({
    url: urlGetSearch,
    From: 'adminApt.vista_pagos_mensual',
    Fields: '*'
  })
    .then((result) => {
      tableData.value = result.data
    })
    .catch((err) => {
      console.error('🚧 - getUsers.then - err', err)
    })
}

loadData()

function goToPage (page) {
  currentPage.value = page
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
            <div class="col mb-3">
              <table class="table table-sm table-striped table-hover">
                <thead>
                  <tr>
                    <th v-for="(columna, index) in nombreColumnas" :key="index">
                      <input
                        v-if="columna !== 'valor'"
                        v-model="searchColumn[columna]"
                        type="search"
                        :placeholder="'Buscar por: ' + columna"
                        class="form-control"
                        @input="onColumnFilter(columna, $event.target.value)"
                      />
                    </th>
                  </tr>
                  <tr>
                    <th v-for="(columna, index) in nombreColumnas" :key="index">
                      {{ columna }}
                    </th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">
                  <tr v-for="(item, index) in visibleItems" :key="item.id">
                    <td>{{ item.apartamento }}</td>
                    <td>{{ item.valor }}</td>
                    <td>{{ item.mes + 1 }}</td>
                    <td>{{ item.año }}</td>
                  </tr>
                </tbody>
              </table>

              <div class="pagination justify-content-center">
                <ul class="pagination">
                  <li v-if="currentPage > 1" class="page-item" @click="goToPage(currentPage - 1)">
                    <a class="page-link" href="#"> Anterior </a>
                  </li>
                  <li
                    v-for="page in totalPages"
                    :key="page"
                    class="page-item"
                    :class="{ active: currentPage === page }"
                    @click="goToPage(page)"
                  >
                    <a class="page-link" href="#">
                      {{ page }}
                    </a>
                  </li>
                  <li v-if="currentPage < totalPages" class="page-item" @click="goToPage(currentPage + 1)">
                    <a class="page-link" href="#"> Siguiente </a>
                  </li>
                </ul>
              </div>
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
