<script setup>
import { getData, deleteData } from '@/api/index'

import {
  records,
  recordsFiltered,
  paginationLimit,
  recordsShowTable,
  searchTable,
  columnFilter,
  displayPageNavNext,
  displayPageNavPrev,
  displayPageNav,
  displayItems,
  SortArrayObject,
  currency
} from '@/services/table'

// SECTION - Logic

const column = ['apartamento', 'valor', 'fecha_rango']

// ANCHOR - Observable to input Search

columnFilter.value = column

// ANCHOR - API CONECTION

function loadData () {
  getData('/general/select/adminApt.pagos')
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

loadData()

const deleteRow = (value) => {
  const info = { table: 'adminApt.pagos', condition: { id: value } }

  deleteData(info)
    .then((result) => {
      console.log('🚧 - deleteData.then - result', result)
      loadData()
    })
    .catch((err) => {
      console.log('🚧 - getUsers.then - err', err)
    })
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
                        <input type="text" class="form-control" @input="searchTable" />
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
                    <td>{{ currency(item.valor) }}</td>
                    <td>{{ item.fecha_rango }}</td>
                  </tr>
                </tbody>
              </table>

              <div id="pagination">
                <button type="button" class="btn" @click="displayPageNavPrev()">
                  <v-icon name="fa-arrow-left" fill="black" scale="1" />
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
                  <v-icon name="fa-arrow-right" fill="black" scale="1" />
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
