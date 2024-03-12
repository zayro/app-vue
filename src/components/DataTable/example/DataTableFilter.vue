<script setup>
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { useQuery } from '@tanstack/vue-query'
import { CustomerService } from '@/components/DataTable/data/customerData'

const customers = ref()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  representative: { value: null, matchMode: FilterMatchMode.IN },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
  verified: { value: null, matchMode: FilterMatchMode.EQUALS }
})
const representatives = ref([
  { name: 'Amy Elsner', image: 'amyelsner.png' },
  { name: 'Anna Fali', image: 'annafali.png' },
  { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
  { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
  { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
  { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
  { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
  { name: 'Onyama Limba', image: 'onyamalimba.png' },
  { name: 'Stephen Shaw', image: 'stephenshaw.png' },
  { name: 'XuXue Feng', image: 'xuxuefeng.png' }
])
const statuses = ref(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'])
const loading = ref(true)

onMounted(() => {
  CustomerService.getCustomersMedium().then((data) => {
    customers.value = getCustomers(data)
    loading.value = false
  })
})

const getCustomers = (data) => {
  return [...(data || [])].map((d) => {
    d.date = new Date(d.date)

    return d
  })
}
const formatDate = (value) => {
  return value.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
const getSeverity = (status) => {
  switch (status) {
    case 'unqualified':
      return 'danger'

    case 'qualified':
      return 'success'

    case 'new':
      return 'info'

    case 'negotiation':
      return 'warning'

    case 'renewal':
      return null
  }
}
</script>

<template>
  <div class="card flex flex-column align-items-center justify-content-center">
    <div>
      <span v-if="isPending">Loading...</span>
      <span v-else-if="isError">Error: {{ error.message }}</span>
      <div v-else-if="data">
        <span v-if="isFetching && !isFetchingNextPage">Fetching...</span>
      </div>
    </div>
  </div>

  <!-- BLOCKUI BAR -->
  <BlockUI :blocked="isPending"></BlockUI>

  <!-- DataTable -->
  <div class="surface-card p-4 shadow-2 border-round">
    <div class="grid grid-nogutter surface-section">
      <div class="col-12 text-center md:text-left flex align-items-center">
        <DataTable
          v-model:filters="filters"
          :value="customers"
          paginator
          :rows="10"
          data-key="id"
          filter-display="row"
          :loading="loading"
          :global-filter-fields="['name', 'country.name', 'representative.name', 'status']"
        >
          <template #header>
            <div class="flex justify-content-end">
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
          <Column field="name" header="Name" style="min-width: 12rem">
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
          <Column header="Country" filter-field="country.name" style="min-width: 12rem">
            <template #body="{ data }">
              <div class="flex align-items-center gap-2">
                <img
                  alt="flag"
                  src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                  :class="`flag flag-${data.country.code}`"
                  style="width: 24px"
                />
                <span>{{ data.country.name }}</span>
              </div>
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                class="p-column-filter"
                placeholder="Search by country"
                @input="filterCallback()"
              />
            </template>
          </Column>
          <Column
            header="Agent"
            filter-field="representative"
            :show-filter-menu="false"
            :filter-menu-style="{ width: '14rem' }"
            style="min-width: 14rem"
          >
            <template #body="{ data }">
              <div class="flex align-items-center gap-2">
                <img
                  :alt="data.representative.name"
                  :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`"
                  style="width: 32px"
                />
                <span>{{ data.representative.name }}</span>
              </div>
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <MultiSelect
                v-model="filterModel.value"
                :options="representatives"
                option-label="name"
                placeholder="Any"
                class="p-column-filter"
                style="min-width: 14rem"
                :max-selected-labels="1"
                @change="filterCallback()"
              >
                <template #option="slotProps">
                  <div class="flex align-items-center gap-2">
                    <img
                      :alt="slotProps.option.name"
                      :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.option.image}`"
                      style="width: 32px"
                    />
                    <span>{{ slotProps.option.name }}</span>
                  </div>
                </template>
              </MultiSelect>
            </template>
          </Column>
          <Column
            field="status"
            header="Status"
            :show-filter-menu="false"
            :filter-menu-style="{ width: '14rem' }"
            style="min-width: 12rem"
          >
            <template #body="{ data }">
              <Tag :value="data.status" :severity="getSeverity(data.status)" />
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <Dropdown
                v-model="filterModel.value"
                :options="statuses"
                placeholder="Select One"
                class="p-column-filter"
                style="min-width: 12rem"
                :show-clear="true"
                @change="filterCallback()"
              >
                <template #option="slotProps">
                  <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                </template>
              </Dropdown>
            </template>
          </Column>
          <Column field="verified" header="Verified" data-type="boolean" style="min-width: 6rem">
            <template #body="{ data }">
              <i
                class="pi"
                :class="{
                  'pi-check-circle text-green-500': data.verified,
                  'pi-times-circle text-red-400': !data.verified
                }"
              ></i>
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <TriStateCheckbox v-model="filterModel.value" @change="filterCallback()" />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
