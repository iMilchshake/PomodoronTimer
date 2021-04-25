<template>
  <test-chart2
      :id="doughnutChart.id"
      :type="doughnutChart.type"
      :data="doughnutChart.data"
      :show="doughnutChart.show"
      @before-render="beforeRenderLogic"
  ></test-chart2>
  <button type="button" v-on:click="changeData()"> ChangeProps </button>
</template>

<script>
import TestChart2 from "@/components/Charts/ChartWrapper";


export default {
  name: "Statistics",
  components: {TestChart2},
  created() {
    setTimeout(() => {
      console.log("activating chart!");
      this.doughnutChart.data.datasets[0].data = [1, 2, 3, 4, 5];
      this.doughnutChart.show = true;
    }, 1000);
  },
  methods: {
  },
  data: function () {
    return {
      doughnutChart: {
        id: 'doughnut',
        type: 'doughnut',
        show: false,
        data: {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          datasets: [
            {
              backgroundColor: [
                '#41B883',
                '#E46651',
                '#00D8FF',
                '#DD1B16',
                '#411A16'
              ],
              data: [1, 1, 1, 1, 1]
            }
          ]
        }
      },
      finishedChart: false,
      beforeRenderLogic: () => {
        //...
        //if(a === b) {
        //  event.preventDefault()
        //}
      }
    }
  }
}
</script>

<style scoped>

</style>