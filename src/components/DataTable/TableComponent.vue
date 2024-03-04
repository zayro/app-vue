<script setup>
import { ref, defineProps, defineEmits } from 'vue'

import { createUsers } from '@/tools/DemoFaker'
import { DifferenceSymmetrical, excludePropertiesFromArrayOfObjects } from '@/tools/ArrayTools'

import { useOffsetPagination } from '@vueuse/core'

const props = defineProps({
  database: {
    type: Array,
    required: true,
    default: () => []
  },
  databaseHidden: {
    type: Array,
    required: false,
    default: () => []
  },
  title: {
    type: String,
    required: false,
    event: 'change',
    default: ''
  }
})
console.log('🚧 - props:', props)

const emit = defineEmits({
  'table-select': null
})

const database = ref([])
const data = ref([])
const page = ref(1)
const pageSize = ref(15)

database.value = props?.database || createUsers(100)
const hidden = props?.databaseHidden || []

const columnName = DifferenceSymmetrical(Object.keys(database.value[0]), hidden)

function fetch (page, pageSize) {
  return new Promise((resolve, reject) => {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    setTimeout(() => {
      resolve(database.value.slice(start, end))
    }, 100)
  })
}

fetchData({
  currentPage: page.value,
  currentPageSize: pageSize.value
})

function fetchData ({ currentPage, currentPageSize }) {
  fetch(currentPage, currentPageSize).then((responseData) => {
    data.value = responseData
  })
}

const { currentPage, currentPageSize, pageCount, isFirstPage, isLastPage, prev, next } = useOffsetPagination({
  total: database.value.length,
  page: 1,
  pageSize,
  onPageChange: fetchData,
  onPageSizeChange: fetchData
})
console.group('table')
console.log('🚧 - isLastPage:', isLastPage)
console.log('🚧 - isFirstPage:', isFirstPage)
console.log('🚧 - pageCount:', pageCount)
console.log('🚧 - currentPage:', currentPage)
console.log('🚧 - currentPageSize:', currentPageSize)
console.groupEnd()
</script>

<template>
  <div class="card mb-3">
    <div class="card-body p-4">
      <div class="col mb-3">
        <div class="table-responsive">
          <table class="table table-sm table-striped table-hover">
            <thead>
              <tr>
                <th v-for="(columna, index) in columnName" :key="index">
                  {{ columna }}
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr v-for="(value, key, index) in data" :key="index">
                <td
                  v-for="(item, indexa) in Object.values(excludePropertiesFromArrayOfObjects([value], hidden)[0])"
                  :key="indexa"
                >
                  {{ item }}
                </td>

                <td><button class="btn btn-primary btn-sm" @click="emit('table-select', value)">show</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination justify-content-center">
          <ul class="pagination">
            <li :disabled="isFirstPage" class="page-item" @click="prev">
              <a href="#" class="page-link">prev</a>
            </li>
            <li
              v-for="item in pageCount"
              :key="item"
              class="page-item"
              :disabled="currentPage === item"
              :class="{ active: currentPage === item }"
              @click="currentPage = item"
            >
              <a class="page-link" href="#">
                {{ item }}
              </a>
            </li>
            <li :disabled="isLastPage" class="page-item" @click="next">
              <a href="#" class="page-link">Next</a>
            </li>
          </ul>
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
