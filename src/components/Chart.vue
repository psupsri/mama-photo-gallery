<template>
  <canvas ref="element" :width="width" :height="height"></canvas>
</template>

<script>
import Chart from 'chart.js'

export default {
  props: {
    type: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    }
  },
  mounted () {
    this.createChart(this.chartData)
  },
  methods: {
    createChart (chartData) {
      const element = this.$refs.element
      const myChart = new Chart(element, {
        type: this.type,
        data: this.data
      })
    }
  }
}
// data: {
//   labels: ['1', '2', '3', '4', '5', '6'],
//   datasets: [{
//     label: '# of Votes',
//     data: [12, 19, 3, 5, 2, 3],
//     backgroundColor: [
//       'rgba(255, 99, 132, 0.2)',
//       'rgba(54, 162, 235, 0.2)',
//       'rgba(255, 206, 86, 0.2)',
//       'rgba(75, 192, 192, 0.2)',
//       'rgba(153, 102, 255, 0.2)',
//       'rgba(255, 159, 64, 0.2)'
//     ],
//     borderColor: [
//       'rgba(255,99,132,1)',
//       'rgba(54, 162, 235, 1)',
//       'rgba(255, 206, 86, 1)',
//       'rgba(75, 192, 192, 1)',
//       'rgba(153, 102, 255, 1)',
//       'rgba(255, 159, 64, 1)'
//     ],
//     borderWidth: 1
//   }]
// }
</script>
