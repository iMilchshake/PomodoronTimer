<template>
  <div id="timer">
    <h1> time: {{ getMinutes }}:{{ getSeconds }}</h1>
    <h2> done: {{ finished }}</h2>
    <h2> active: {{ active }}</h2>
    <button type="button" v-on:click="startTimer"> Start</button>
    <button type="button" v-on:click="stopTimer"> Stop</button>
  </div>
</template>

<script>

//const debug = true;

import {zeroPad} from '@/assets/timecalculations';

//const settings = debug ? debug_settings : deploy_settings;

export default {
  name: "Countdown",
  data() {
    return {
      t: 0
    };
  },
  created() {
    this.$store.dispatch('startTimer');
    this.updateLoop();
  },
  computed: {
    getSeconds() {
      return zeroPad(Math.floor(this.t % 60), 2);
    },
    getMinutes() {
      return zeroPad(Math.floor(this.t / 60), 2);
    },
    finished() {
      return (this.t === 0);
    },
    active() {
      return this.$store.state.active;
    }
  },
  methods: {
    startTimer() {
      this.$store.dispatch('startTimer');
    },
    stopTimer() {
      this.$store.dispatch('stopTimer');
      this.updateTime();
    },
    updateLoop() {
      this.updateTime();
      setTimeout(() => {
        this.updateLoop();
      }, 1000);
    },
    updateTime() {
      const t_left = this.$store.state.t_left;
      const t_0 = this.$store.state.t_0;
      let t_actual;
      if (this.$store.state.active) {
        t_actual = t_left - ((performance.now() - t_0) / 1000);
      } else {
        t_actual = t_left;
      }
      this.t = t_actual;
    }
  }
}
</script>

<style scoped>

</style>