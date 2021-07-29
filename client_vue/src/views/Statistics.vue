<template>

  <div id="chart_box">
    <test-chart2 class="chart"
                 :id="doughnutChart.id"
                 :type="doughnutChart.type"
                 :data="doughnutChart.data"
                 :show="doughnutChart.show"
                 @before-render="beforeRenderLogic"
    />
    <test-chart2 class="chart"
                 :id="doughnutChart.id"
                 :type="doughnutChart.type"
                 :data="doughnutChart.data"
                 :show="doughnutChart.show"
                 @before-render="beforeRenderLogic"
    />
    <test-chart2 class="chart"
                 :id="doughnutChart.id"
                 :type="doughnutChart.type"
                 :data="doughnutChart.data"
                 :show="doughnutChart.show"
                 @before-render="beforeRenderLogic"
    />
    <test-chart2 class="chart"
                 :id="doughnutChart.id"
                 :type="doughnutChart.type"
                 :data="doughnutChart.data"
                 :show="doughnutChart.show"
                 @before-render="beforeRenderLogic"
    />

  </div>
</template>

<script>
import TestChart2 from "@/components/Charts/ChartWrapper";
import {getDayCount} from "@/assets/backend_request";

export default {
  name: "Statistics",
  components: {TestChart2},
  created() {
    getDayCount().then(dayCounts => {
      console.log("received:", dayCounts);
      this.doughnutChart.data.datasets[0].data = dayCounts;
      this.doughnutChart.show = true;
    });
  },
  methods: {},
  data: function () {
    return {
      doughnutChart: {
        id: 'doughnut',
        type: 'doughnut',
        show: false,
        data: {
          labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
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

#chart_box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  align-items: flex-start;
}

.chart {
  min-width: 0;
  min-height: 0;
  max-width: 400px;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 300px;
}

</style>