<template>
  <h1> XD </h1>
  <test-chart2
      :id="doughnutChart.id"
      :type="doughnutChart.type"
      :data="doughnutChart.data"
  ></test-chart2>
  <button type="button" v-on:click="changeData()"> ChangeProps</button>
</template>

<script>
import TestChart2 from "@/components/Charts/testChart2";


export default {
  name: "Statistics",
  components: {TestChart2},
  methods: {
    changeData: function () {
      this.doughnutChart.data.datasets[0] = {
        backgroundColor: [
          '#41B883',
          '#E46651',
          '#00D8FF',
          '#DD1B16',
          '#411A16'
        ],
        data: [1, 1, 5, 4, 2]
      };

      this.doughnutChart.data.labels = ['1', '2', '3', '4', '5'];
      console.log(this.doughnutChart.data.datasets[0].data)
    }
  },
  data: function () {
    return {
      doughnutChart: {
        id: 'doughnut',
        type: 'doughnut',
        data: {
          labels: [],
          datasets: [
          ]
        }
      }
    }
  }
}
</script>

<style scoped>

</style>