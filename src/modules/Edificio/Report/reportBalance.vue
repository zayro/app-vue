<script setup>
import { reactive, computed, ref, onMounted } from 'vue'
import { getDataFilter } from '@/api/index'
import { currency } from '@/services/table'

const total_gastos = ref([])
const total_pagos = ref([])
// Datos que se mostrarán en el gráfico
const chartData = ref([44, 55, 41])

async function getTotalPagos () {
  try {
    const getYear = new Date().getFullYear()
    const result = await getDataFilter({
      url: '/general/search',
      From: 'adminApt.total_pagos',
      Fields: '*',
      Where: { year: getYear }
    })
    total_pagos.value = result.data
  } catch (err) {
    console.log('🚧 - getTotalPagos.catch - err', err)
  }
}

async function getTotalgastos () {
  try {
    const getYear = new Date().getFullYear()
    const result = await getDataFilter({
      url: '/general/search',
      From: 'adminApt.total_gastos',
      Fields: '*',
      Where: { year: getYear }
    })

    total_gastos.value = result.data
  } catch (err) {
    console.log('🚧 - getTotalgastos.catch - err', err)
  }
}

const pagos = computed(() => {
  const resultPagos = parseInt(total_pagos.value[0]?.total_pagos) ?? 0

  chartData.value[0] = resultPagos

  return resultPagos
})

const gastos = computed(() => {
  const resultGastos = parseInt(total_gastos.value[0]?.total_gastos) ?? 0
  chartData.value[1] = resultGastos
  return resultGastos
})

const debe = computed(() => {
  const resultDebe = pagos.value - gastos.value
  chartData.value[2] = resultDebe
  return resultDebe
})

// Objeto de opciones del gráfico
const chartOptions = reactive({
  chart: {
    type: 'donut'
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  ],
  labels: ['Recibido', 'Gastos', 'Saldo']
})

onMounted(() => {
  console.log('myheader mounted')
  getTotalPagos()
  getTotalgastos()
})
</script>

<template>
  <div class="flex-container">
    <div class="main-widget">
      <div class="row justify-content-center">
        <div class="flex-widget">
          <div class="widget-card">
            <div class="d-flex justify-content-between align-items-center">
              <div class="value-box">
                <h4 class="mb-0">{{ currency(pagos) }}</h4>
              </div>
              <div class="text-recibido">
                <strong><span> Recibido </span></strong>
              </div>
            </div>
          </div>

          <div class="widget-card">
            <div class="d-flex justify-content-between align-items-center">
              <div class="value-box">
                <h4 class="mb-0">{{ currency(gastos) }}</h4>
              </div>
              <div class="text-gastos">
                <strong><span>Gastos</span></strong>
              </div>
            </div>
          </div>

          <div class="widget-card">
            <div class="d-flex justify-content-between align-items-center">
              <div class="value-box">
                <h4 class="mb-0">{{ currency(debe) }}</h4>
              </div>
              <div class="text-saldo">
                <strong><span>Saldo</span></strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr />

    <div class="main-chart">
      <div class="row justify-content-center">
        <apexchart type="donut" :options="chartOptions" :series="chartData"></apexchart>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-recibido {
  color: rgb(0, 143, 251);
}

.text-gastos {
  color: rgb(0, 227, 150);
}

.text-saldo {
  color: rgb(254, 176, 25);
}
.widget-card {
  background-color: white;
  border: 1px solid rgb(224, 224, 224);
  padding: 20px;
  border-radius: 10px;
  width: 30%;
}

.flex-widget {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.flex-container {
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  justify-content: center;
  align-content: center;
}

.main-widget {
  transition: margin-left 0.5s;
  padding: 16px;
  width: 80%;
}
.main-chart {
  transition: margin-left 0.5s;
  padding: 16px;
  width: 40%;
}
</style>
