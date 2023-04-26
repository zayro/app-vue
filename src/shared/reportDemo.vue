<template>
  <div class="flex-container">
    <div id="main">
      <div class="chart">
        <Doughnut :data="data" :options="options" />
      </div>
      <hr />
      {{ total_gastos }} -- {{ gastos }} -- {{ debe }}
      <hr />
      {{ total_pagos }} -- {{ pagos }}
    </div>
  </div>
</template>

<script>
import { getDataFilter } from '@/api/index'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'App',
  components: {
    Doughnut
  },

  data: () => ({
    total_gastos: [],
    total_pagos: [],
    data: {
      labels: ['Recibido', 'Gastos', 'Total', 'Deben'],
      datasets: [
        {
          backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
          data: [40, 20, 80, 10]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  computed: {
    pagos () {
      return this.total_pagos[0]?.total_pagos ?? 10
    },
    gastos () {
      return this.total_gastos[0]?.total_gastos ?? 0
    },
    debe () {
      return this.pagos - this.gastos
    }
  },
  mounted () {
    this.getTotalPagos()
    this.getTotalgastos()
    this.asignarValores()
  },
  methods: {
    async getTotalPagos () {
      try {
        const getYear = new Date().getFullYear()
        const result = await getDataFilter({
          url: '/general/search',
          From: 'adminApt.total_pagos',
          Fields: '*',
          Where: { year: getYear }
        })
        this.total_pagos = result.data
      } catch (err) {
        console.log('🚧 - getTotalPagos.catch - err', err)
      }
    },

    async getTotalgastos () {
      try {
        const getYear = new Date().getFullYear()
        const result = await getDataFilter({
          url: '/general/search',
          From: 'adminApt.total_gastos',
          Fields: '*',
          Where: { year: getYear }
        })

        this.total_gastos = result.data
      } catch (err) {
        console.log('🚧 - getTotalgastos.catch - err', err)
      }
    },

    async asignarValores () {
      this.data.datasets[0].data[0] = this.pagos
      this.data.datasets[0].data[1] = this.gastos
      this.data.datasets[0].data[2] = this.debe
      this.data.datasets[0].data[3] = 40000
    }
  }
}
</script>

<style scoped>
.flex-container {
  margin-top: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: center;
  align-content: center;
}

#main {
  transition: margin-left 0.5s;
  padding: 16px;
  width: 30%;
}
.chart {
}
</style>
