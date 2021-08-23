<template>

  <div id="chart_box" class="shadow">
    <div class="chart_container shadow">
      <h2 class="heading shadow"> Day Distribution </h2>
      <test-chart2 class="chart"
                   :id="dayCountChart.id"
                   :type="dayCountChart.type"
                   :data="dayCountChart.data"
                   :show="dayCountChart.show"
                   @before-render="beforeRenderLogic"
      />
    </div>

    <div class="chart_container">
      <h2 class="heading shadow"> Phase Distribution </h2>
      <test-chart2 class="chart shadow"
                   :id="timeSpentChart.id"
                   :type="timeSpentChart.type"
                   :data="timeSpentChart.data"
                   :show="timeSpentChart.show"
                   @before-render="beforeRenderLogic"
      />
    </div>

    <div class="chart_container">
      <h2 class="heading shadow"> Phase Distribution </h2>
      <test-chart2 class="chart shadow"
                   :id="timeSpentChart.id"
                   :type="timeSpentChart.type"
                   :data="timeSpentChart.data"
                   :show="timeSpentChart.show"
                   @before-render="beforeRenderLogic"
      />
    </div>
<div class="chart_container">
      <h2 class="heading shadow"> Phase Distribution </h2>
      <test-chart2 class="chart shadow"
                   :id="timeSpentChart.id"
                   :type="timeSpentChart.type"
                   :data="timeSpentChart.data"
                   :show="timeSpentChart.show"
                   @before-render="beforeRenderLogic"
      />
    </div>
<div class="chart_container">
      <h2 class="heading shadow"> Phase Distribution </h2>
      <test-chart2 class="chart shadow"
                   :id="timeSpentChart.id"
                   :type="timeSpentChart.type"
                   :data="timeSpentChart.data"
                   :show="timeSpentChart.show"
                   @before-render="beforeRenderLogic"
      />
    </div>
<div class="chart_container">
      <h2 class="heading shadow"> Phase Distribution </h2>
      <test-chart2 class="chart shadow"
                   :id="timeSpentChart.id"
                   :type="timeSpentChart.type"
                   :data="timeSpentChart.data"
                   :show="timeSpentChart.show"
                   @before-render="beforeRenderLogic"
      />
    </div>

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

.chart_container {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 355px;

  min-width: 0;
  max-width: 700px;
  border-radius: 10px;
  background-color: #cfcaca;
}

.chart {
  background-color: ghostwhite;
  border-radius: 10px;
  padding: 1em;

  min-height: 0;
  max-height: 700px;
}

.heading {
  margin: 0 0 0.35em 0;
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