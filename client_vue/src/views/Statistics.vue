<template>

  <div id="chart_box" class="shadow">
    <test-chart2 class="chart shadow"
                 :id="dayCountChart.id"
                 :type="dayCountChart.type"
                 :data="dayCountChart.data"
                 :show="dayCountChart.show"
                 @before-render="beforeRenderLogic"
    />
    <test-chart2 class="chart shadow"
                 :id="timeSpentChart.id"
                 :type="timeSpentChart.type"
                 :data="timeSpentChart.data"
                 :show="timeSpentChart.show"
                 @before-render="beforeRenderLogic"
    />
  </div>
</template>

<script>
import TestChart2 from "@/components/Charts/ChartWrapper";
import {getDayCount, getTimeSpend} from "@/assets/backend_request";
import {dayCountChart, timeSpentChart} from "@/assets/statistics";

export default {
  name: "Statistics",
  components: {TestChart2},
  created() {
    getDayCount().then(dayCounts => {
      console.log("received:", dayCounts);
      this.dayCountChart.data.datasets[0].data = dayCounts;
      this.dayCountChart.show = true;
    });

    getTimeSpend().then(timeSpend => {
      console.log("received:", timeSpend);
      this.timeSpentChart.data.datasets[0].data = Object.values(timeSpend);
      this.timeSpentChart.show = true;
    }).then(() => {
      console.log(this.timeSpentChart);
    })
  },
  methods: {},
  data: function () {
    return {
      dayCountChart: dayCountChart,
      timeSpentChart: timeSpentChart,
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
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  align-items: flex-start;
  gap: 1em;
  margin: 1em;
  padding: 1em;
  border-radius: 10px;
  background-color: gray;
}

.chart {
  min-width: 0;
  min-height: 0;
  max-width: 400px;
  max-height: 400px;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 300px;

  background-color: ghostwhite;
  border-radius: 10px;
  padding: 1em;
}

.shadow {
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

@media only screen and (max-width: 744px) {
  #chart_box {
    display: flex;
  }
}


</style>