<template>
  <transition name="fade" mode="in-out">
    <div v-show="show">
      <vue3-chart-js
          :id="id"
          :type="type"
          :data="data"
          ref="chartRef"
          @before-render="beforeRenderLogic"
      ></vue3-chart-js>
    </div>
  </transition>
</template>

<script>

import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import {ref, watch} from 'vue'

export default {
  name: "ChartWrapper",
  components: {
    Vue3ChartJs
  },
  setup() {
    // define ref and update-method for chart
    const chartRef = ref(null)
    const updateChart = () => {
      chartRef.value.update();
    }
    return {
      updateChart,
      chartRef
    }
  },
  created() {
    // call updateChart() when props change
    watch(() => this.$props, () => {
          this.updateChart();
        },
        {deep: true}
    );
  },
  data: function () {
    return {}
  },
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    show: {
      type: Boolean,
      default: true
    },
    // options: {
    //   type: Object,
    //   default: () => ({})
    // },
    // plugins: {
    //   type: Array,
    //   default: () => []
    // },
    beforeRenderLogic: {
      type: Function,
      default: () => {
      }
    }
  }
}
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}
</style>