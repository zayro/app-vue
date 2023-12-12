<script setup>
import { ref, computed } from 'vue'
import { getData, deleteData } from '@/api/index'
import swal from 'sweetalert'

import { currency } from '@/services/table'

// SECTION - Logic
const currentPage = ref(1)
const itemsPerPage = ref(10)

const sort = ref({ key: null, direction: 1 })

const search = ref('')

const nombreColumnas = ref(['tipo_pago', 'tipo_gasto', 'valor', 'mes', 'año'])

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
  const searchText = search.value.toLowerCase()

  return tableData.value
    .filter((item) => {
      return item.tipo_gasto.toLowerCase().includes(searchText) || item.tipo_pago.toLowerCase().includes(searchText)
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
})

const visibleItems = computed(() => {
  return filteredData.value.slice(startIndex.value, endIndex.value)
})

function goToPage (page) {
  currentPage.value = page
}

// ANCHOR - API CONECTION

function loadData () {
  getData('/general/select/adminApt.vista_gastos')
    .then((result) => {
      tableData.value = result.data
    })

    .catch((err) => {
      console.log('🚧 - getUsers.then - err', err)
    })
}

loadData()

const deleteRow = (item) => {
  const info = { table: 'adminApt.gastos', condition: { id: item.id } }
  swal({
    title: 'Estas Seguro?',
    text: `Una vez eliminado, no podras recuperar de nuevo el registros \n tipo gasto:  ${item.tipo_gasto}  mes: ${item.mes} año: ${item.año} `,
    icon: 'warning',
    buttons: true,
    dangerMode: true
  }).then((willDelete) => {
    if (willDelete) {
      swal('Se Elimino el registros seleccionado!', {
        icon: 'success'
      })

      deleteData(info)
        .then((result) => {
          console.log('🚧 - deleteData.then - result', result)
          loadData()
        })
        .catch((err) => {
          console.log('🚧 - getUsers.then - err', err)
        })
    } else {
      swal('Se cancelo la accion de Eliminar')
    }
  })
}
</script>

<template>
  <div class="flex-container">
    <div class="main">
      <div class="card mb-3">
        <div class="card-body">
          <div class="card-title">Reporte de Gastos</div>
          <hr />
          <div class="column">
            <div class="col mb-5">
              <table class="table">
                <thead>
                  <tr>
                    <th class="text-center align-middle" style="width: 10%">Buscador:</th>
                    <th style="width: 90%">
                      <input
                        v-model="search"
                        type="search"
                        placeholder="Buscar por gasto o pago"
                        class="form-control"
                      />
                    </th>
                  </tr>
                </thead>
              </table>
            </div>

            <div class="col mb-3">
              <table class="table table-sm table-striped">
                <thead>
                  <tr>
                    <th></th>
                    <th v-for="(columna, index) in nombreColumnas" :key="index">
                      {{ columna }}
                    </th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">
                  <tr v-for="(item, index) in visibleItems" :key="item.id">
                    <td>
                      <div>
                        <!-- <v-icon name="fa-edit" fill="#686868" title="Edit" scale="1" /> -->
                        <button class="btn btn-outline-dark">
                          <v-icon
                            name="md-delete"
                            fill="#983C3C"
                            title="Delete"
                            scale="1"
                            class="cursor-pointer"
                            @click="deleteRow(item)"
                          />
                        </button>
                      </div>
                    </td>

                    <td>{{ item.tipo_pago }}</td>
                    <td>{{ item.tipo_gasto }}</td>
                    <td>{{ currency(item.valor) }}</td>
                    <td>{{ item.mes }}</td>
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
