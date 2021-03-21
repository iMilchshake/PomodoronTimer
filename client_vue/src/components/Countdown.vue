<template>
  <div id="timer">
    <h1> time: {{ getMinutes }}:{{ getSeconds }}</h1>
    <h2> done: {{ finished }}</h2>
    <h2> active: {{active}}</h2>
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
    return {};
  },
  created() {
    this.$store.dispatch('startTimer');
  },
  computed: {
    getSeconds() {
      return zeroPad(this.getTimer() % 60, 2);
    },
    getMinutes() {
      return zeroPad(Math.floor(this.getTimer() / 60), 2);
    },
    finished() {
      return (this.getTimer() === 0);
    },
    active() {
      return this.$store.state.active;
    }
  },
  methods: {
    getTimer() {
      const t = this.$store.state.time;
      return t;
    },
    startTimer() {
      this.$store.dispatch('startTimer');
    },
    stopTimer() {
      this.$store.dispatch('stopTimer');
    }
  }
}
</script>

<style scoped>

</style>