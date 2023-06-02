<script setup>
import { ref, computed } from 'vue'
import swal from 'sweetalert'
import html2pdf from 'html2pdf.js'
import html2canvas from 'html2canvas'
import { getData, deleteData } from '@/api/index'

const factura = ref()
const sumatoriaFactura = ref(0)
const currentPage = ref(1)
const itemsPerPage = ref(7)

const sort = ref({ key: null, direction: 1 })

const search = ref('')

const nombreColumnas = ref(['apartamento', 'pago', 'detalle'])

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
      return item.apartamento.toLowerCase().includes(searchText)
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

function loadData () {
  getData('/general/select/adminApt.vista_pagos_simple')
    .then((result) => {
      tableData.value = result.data
    })

    .catch((err) => {
      console.log('🚧 - getUsers.then - err', err)
    })
}

loadData()

const deleteRow = (item) => {
  const info = { table: 'adminApt.pagos', condition: { id: item.id } }

  swal({
    title: 'Estas Seguro?',
    text: `Una vez eliminado, no podras recuperar de nuevo el registros \n apartamento:  ${item.apartamento}   `,
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

const sumatoria = (index) => {
  return visibleItems.value[index].detalle_pago.reduce((acumulado, objeto) => {
    return acumulado + objeto.valor
  }, 0)
}

function goToPage (page) {
  currentPage.value = page
}

function infoFactura (data) {
  factura.value = data

  sumatoriaFactura.value = data.detalle_pago.reduce((acumulado, objeto) => {
    return acumulado + objeto.valor
  }, 0)
}

function generatePDF () {
  const element = document.getElementById('content-to-pdf')
  html2pdf().from(element).save('documento.pdf')
}

function captureImage () {
  const element = document.getElementById('content-to-pdf')

  html2canvas(element).then((canvas) => {
    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = 'captura.png'
    link.click()
  })
}
</script>

<template>
  <div class="flex-container">
    <div class="main">
      <!-- Modal -->
      <div
        id="staticBackdrop"
        class="modal fade"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h1 id="staticBackdropLabel" class="modal-title fs-5">Factura</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div id="content-to-pdf">
                <div class="container">
                  <div class="row">
                    <div class="d-flex flex-row justify-content-around">
                      <div>
                        <h3>Información del Cliente</h3>
                        <p>Nombre: {{ factura?.propietario }}</p>
                        <p>Dirección: Crr 20 # 22-76</p>
                        <p>Ciudad: Bucaramanga</p>
                      </div>
                      <div>
                        <h3>Información de la Factura</h3>
                        <p>Factura #: {{ factura?.id }}</p>
                        <p>Fecha: {{ factura?.fecha_creacion }}</p>
                      </div>
                    </div>
                  </div>
                  <table class="table mt-4">
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Valor</th>
                      </tr>
                    </thead>
                    <tbody class="table-group-divider">
                      <tr v-for="data in factura?.detalle_pago" :key="data">
                        <td>{{ data.fecha.month + 1 }} / {{ data.fecha.year }}</td>
                        <td>{{ currency(data.valor) }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="text-end">
                    <h4>Total: {{ currency(sumatoriaFactura) }}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="generatePDF()">
                pdf
              </button>
              <button type="button" class="btn btn-primary" @click="captureImage()">jpg</button>
            </div>
          </div>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-body">
          <div class="card-title">Reporte de Pagos</div>
          <hr />
          <div class="column">
            <div class="col mb-5">
              <table class="table">
                <thead>
                  <tr>
                    <th class="text-center align-middle" style="width: 10%">Buscador:</th>
                    <th style="width: 90%">
                      <input v-model="search" type="search" placeholder="Buscar por apt" class="form-control" />
                    </th>
                  </tr>
                </thead>
              </table>
            </div>

            <div class="col mb-3">
              <table class="table table-sm table-striped table-hover">
                <thead>
                  <tr>
                    <th v-for="(columna, index) in nombreColumnas" :key="index">
                      {{ columna }}
                    </th>
                    <th>Eliminar</th>
                    <th>Factura</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">
                  <tr v-for="(item, index) in visibleItems" :key="item.id">
                    <td>
                      <div class="d-flex justify-content-center">
                        {{ item.apartamento }}
                      </div>
                    </td>
                    <td>{{ item.pago }}</td>
                    <td>
                      <div class="d-flex flex-column justify-content-center">
                        <div v-for="data in item.detalle_pago" :key="data">
                          <strong>Valor : </strong> {{ currency(data.valor) }} | <strong>Fecha : </strong>
                          {{ data.fecha.month + 1 }} / {{ data.fecha.year }}
                        </div>
                        <!--          <div>
                          <strong>Total : </strong>
                          {{ currency(sumatoria(index)) }}
                        </div> -->
                      </div>
                    </td>

                    <td>
                      <div class="d-flex justify-content-center">
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

                    <td>
                      <div class="d-flex justify-content-center">
                        <button
                          type="button"
                          class="btn btn-outline-dark"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          @click="infoFactura(item)"
                        >
                          <v-icon name="io-document" fill="#3C6498" title="Delete" scale="1" class="cursor-pointer" />
                        </button>
                        <a
                          v-if="item.comprobante"
                          target="_blank"
                          :href="'http://localhost:4000/public/uploads/' + item.id_apartamento + '/' + item.comprobante"
                        >
                          abrir</a
                        >
                      </div>
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
  </div>
</template>

<style scoped>
.btn {
  padding-left: 0.4rem;
  padding-right: 0.4rem;
}

table th {
  text-transform: uppercase;
  text-align: center;
}

table td {
  text-align: center;
}

.table > tbody {
  vertical-align: middle;
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
