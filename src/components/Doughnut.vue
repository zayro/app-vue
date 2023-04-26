<template>
  <div>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const chart = ref(null)

    onMounted(() => {
      if (chart.value && props.chartData.datasets) {
        const doughnut = new Doughnut(chart.value, {
          data: props.chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        })

        // actualiza el gráfico cuando cambia el prop\n
        watch(
          () => props.chartData.datasets[0].data,
          () => {
            doughnut.update()
          }
        )
      }
    })
    return { chart }
  }
}
</script>
