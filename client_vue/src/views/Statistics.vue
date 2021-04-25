<template>
  <test-chart2
      :id="doughnutChart.id"
      :type="doughnutChart.type"
      :data="doughnutChart.data"
      :show="doughnutChart.show"
      @before-render="beforeRenderLogic"
  />
  <test-chart2
      :id="doughnutChart.id"
      :type="doughnutChart.type"
      :data="doughnutChart.data"
      :show="doughnutChart.show"
      @before-render="beforeRenderLogic"
  />

<!--  <button type="button" v-on:click="changeData()"> ChangeProps </button>-->
</template>

<script>
import TestChart2 from "@/components/Charts/ChartWrapper";
import {getDayCount} from "@/assets/backend_request";

export default {
  name: "Statistics",
  components: {TestChart2},
  created() {
    // setTimeout(() => {
    //   console.log("activating chart!");
    //   this.doughnutChart.data.datasets[0].data = [1, 2, 3, 4, 5];
    //   this.doughnutChart.show = true;
    // }, 1000);
    console.log("requesting daycount");
    getDayCount().then(dayCounts => {
        console.log("received:", dayCounts);
        this.doughnutChart.data.datasets[0].data = dayCounts;
        this.doughnutChart.show = true;
    });
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
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          datasets: [
            {
              backgroundColor: [
                '#c8a23f',
                '#e06231',
                '#2bba84',
                '#8164c6',
                '#7829b0',
                '#7e7e7e',
                '#2d2d2d'
              ],
              data: [1, 1, 1, 1, 1, 1, 1]
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