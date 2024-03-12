<script setup>
import { ref } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { useQuery } from '@tanstack/vue-query'
import { getDataFilter } from '@/api/'

import BackDrop from '@/components/BackDropComponent.vue'

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  address: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})

const size = ref({ label: 'Normal', value: 'null' })

const sizeOptions = ref([
  { label: 'Small', value: 'small' },
  { label: 'Normal', value: 'null' },
  { label: 'Large', value: 'large' }
])

const fetchProjects = async () => {
  try {
    const res = await getDataFilter({
      url: '/general/search',
      Query: 'demo.prueba',
      Fields: '*',
      Where: null
    })
    return res.data
  } catch (error) {
    console.log('🚧 - fetchProjects - error:', error)
  }
}

const { data, error, isFetching, isFetched, isPending, isError } = useQuery({
  queryKey: ['demo'],
  queryFn: fetchProjects,
  staleTime: 60 * 2000,
  initialPageParam: []
})
</script>

<template>
  <!-- DATAfILTER -->
  <div>
    <!-- BLOCKUI BAR -->
    <BackDrop :hidden="isFetched">
      <ProgressSpinner aria-label="Loading" />
      <div class="card flex flex-column align-items-center justify-content-center">
        <div>
          <span v-if="isPending">Loading...</span>
          <span v-else-if="isError">Error: {{ error.message }}</span>
          <div v-else-if="data">
            <span v-if="isFetching">Fetching...</span>
          </div>
        </div>
      </div>
    </BackDrop>

    <div class="surface-card p-4 shadow-2 border-round">
      <div class="surface-section">
        <div v-if="data" class="col-12 text-center md:text-left flex flex-column align-items-center">
          <!-- size Table -->

          <!-- DataTable -->
          <DataTable
            v-model:filters="filters"
            :size="size.value"
            :value="data"
            paginator
            :rows="10"
            data-key="id"
            filter-display="row"
            :global-filter-fields="['name', 'phone', 'address']"
            :rows-per-page-options="[5, 10, 20, 50]"
            striped-rows
            removable-sort
            scrollable
            scroll-height="600px"
            table-style="min-width: 80rem"
          >
            <template #header>
              <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                <span class="text-xl text-900 font-bold">Products</span>
                <SelectButton v-model="size" :options="sizeOptions" option-label="label" data-key="label" />

                <IconField icon-position="left">
                  <InputIcon>
                    <i class="pi pi-search" />
                  </InputIcon>
                  <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                </IconField>
              </div>
            </template>
            <template #empty> No customers found. </template>
            <template #loading> Loading customers data. Please wait. </template>
            <!-- Column-->
            <Column field="name" header="Name" sortable style="min-width: 12rem">
              <template #body="{ data }">
                {{ data.name }}
              </template>
              <template #filter="{ filterModel, filterCallback }">
                <InputText
                  v-model="filterModel.value"
                  type="text"
                  class="p-column-filter"
                  placeholder="Search by name"
                  @input="filterCallback()"
                />
              </template>
            </Column>
            <!-- Column-->
            <Column field="phone" header="Phone" filter-field="phone" sortable style="min-width: 12rem">
              <template #body="{ data }">
                <div class="flex align-items-center gap-2">
                  <span>{{ data.phone }}</span>
                </div>
              </template>
              <template #filter="{ filterModel, filterCallback }">
                <InputText
                  v-model="filterModel.value"
                  type="text"
                  class="p-column-filter"
                  placeholder="Search by phone"
                  @input="filterCallback()"
                />
              </template>
            </Column>
            <!-- Column-->
            <Column field="address" header="Address" filter-field="address" sortable style="min-width: 12rem">
              <template #body="{ data }">
                <div class="flex align-items-center gap-2">
                  <span>{{ data.address }}</span>
                </div>
              </template>
              <template #filter="{ filterModel, filterCallback }">
                <InputText
                  v-model="filterModel.value"
                  type="text"
                  class="p-column-filter"
                  placeholder="Search by address"
                  @input="filterCallback()"
                />
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>
