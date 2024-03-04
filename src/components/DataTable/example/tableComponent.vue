<script setup>
import { ref, computed } from 'vue'

import { createUsers } from '@/tools/DemoFaker'

import tableComponent from '@/components/DataTable/tableComponent.vue'

const componentKey = ref(0)

const forceRerender = () => {
  componentKey.value += 1
}

const search = ref('')
const hidden = ref(['id'])
const database = createUsers(100)

const seleted = (data) => {
  console.log(data)
}

const filteredData = computed(() => {
  const searchText = search.value
  const results = database.filter((object) => Object.values(object).some((i) => i.includes(searchText)))
  return results
})
</script>

<template>
  <div class="flex-container">
    <div class="main">
      <div class="d-flex flex-column justify-content-center align-item-center">
        <div class="flex-item">
          <div class="card mb-3">
            <div class="card-body p-4">
              <div class="card-title">Filtros</div>
              <hr />

              <div class="row g-3">
                <div class="col-10">
                  <input
                    v-model="search"
                    class="form-control form-control-sm"
                    type="text"
                    placeholder="Buscar"
                    aria-label=".form-control-sm example"
                  />
                </div>
                <div class="col-2">
                  <button type="button" class="form-control btn btn-primary btn-sm" @click="forceRerender">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-item">
          <tableComponent
            :key="componentKey"
            v-model="search.value"
            :database="filteredData"
            :database-hidden="hidden"
            @table-select="seleted"
          />
        </div>
      </div>
    </div>
  </div>
</template>
