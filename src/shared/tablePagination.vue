<script setup>
import { ref, computed, defineProps } from 'vue'

const props = defineProps({
  nombreColumnas: {
    type: Array,
    default () {
      return ['id', 'nombre', 'apellido', 'edad']
    }
  },
  tableData: {
    type: Array,
    default () {
      return [{ id: 1, nombre: 'Juan', apellido: 'Pérez', edad: 28, email: 'juan.perez@gmail.com' }]
    }
  }
})

const currentPage = ref(1)
const itemsPerPage = ref(3)

const sort = ref({ key: null, direction: 1 })

const search = ref('')

const nombreColumnas = ref(props.nombreColumnas)

const tableData = ref(props.tableData)

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
  const searchText = search.value.toLowerCase()

  return tableData.value
    .filter((item) => {
      return (
        item.nombre.toLowerCase().includes(searchText) ||
        item.apellido.toLowerCase().includes(searchText) ||
        item.email.toLowerCase().includes(searchText) ||
        item.edad.toString().includes(searchText) // Convertir la edad a string para poder utilizar el método includes()
      )
    })
    .sort((a, b) => {
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
    .slice(startIndex.value, endIndex.value)
})

const visibleItems = computed(() => {
  return filteredData.value.slice(startIndex.value, endIndex.value)
})

function sortTable (key) {
  if (typeof key !== 'string' || !Object.keys(visibleItems.value[0]).includes(key)) {
    console.error(`Invalid key "${key}" for sorting`)
    return
  }

  if (sort.value.key === key) {
    sort.value.direction = -sort.value.direction
  } else {
    sort.value.key = key
    sort.value.direction = 1
  }
}

function goToPage (page) {
  currentPage.value = page
}
</script>

<template>
  <div>
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
                      <input v-model.trim="search" type="search" class="form-control" />
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>

          <div class="col">
            <table class="table table-sm table-striped table-hover">
              <thead class="thead-dark">
                <tr>
                  <th v-for="(columna, index) in nombreColumnas" :key="index">
                    {{ columna }}
                    <button @click="sortTable(columna)">
                      <span v-if="sort.key === columna">{{ sort.direction === 1 ? '▼' : '▲' }}</span>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in visibleItems" :key="index">
                  <td v-for="(columna, i) in nombreColumnas" :key="i">
                    {{ item[columna] }}
                  </td>
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
</template>
