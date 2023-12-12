<script setup>
import { ref, computed } from 'vue'

import { createUsers } from '@/tools/DemoFaker'

const currentPage = ref(1)
const itemsPerPage = ref(20)

const sort = ref({ key: null, direction: 1 })

const nombreColumnas = ref(['id', 'name', 'email', 'address'])

const tableData = ref([])

tableData.value = createUsers(100)

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
  const filtered = tableData.value

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

const goToPage = (page) => {
  currentPage.value = page
}
</script>

<template>
  <div class="flex-container">
    <div class="main">
      <div class="d-flex flex-column justify-content-center align-item-center">
        <div class="flex-item">
          <div class="card mb-3">
            <div class="card-body p-4">
              <div class="card-title">Reports</div>
              <hr />
              <div class="col mb-3">
                <table class="table table-sm table-striped table-hover">
                  <thead>
                    <tr>
                      <th v-for="(columna, index) in nombreColumnas" :key="index">
                        {{ columna }}

                        <button @click="sortTable(columna)">
                          <span v-if="sort.key === columna">{{ sort.direction === 1 ? '▼' : '▲' }}</span>
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="table-group-divider">
                    <tr v-for="(item, index) in visibleItems" :key="index">
                      <td>{{ item.id }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.email }}</td>
                      <td>{{ item.address }}</td>
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
  </div>
</template>

<style scoped="scss">
.btn {
  padding-left: 0.4rem;
  padding-right: 0.4rem;
}

thead th {
  font-size: 14px;
  text-transform: uppercase;
}

tbody td {
  font-size: 12px;
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

.page-link {
  font-size: 12px;
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
</style>
