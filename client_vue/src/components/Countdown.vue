<template>
  <div id="timer">
    <h1> time: {{ getMinutes }}:{{ getSeconds }}:{{getMilliseconds}}</h1>
    <h1> time: {{ getMinutes }}:{{ getSeconds }}:{{getMilliseconds}}</h1>
    <h1> time: {{ getMinutes }}:{{ getSeconds }}:{{getMilliseconds}}</h1>
    <h2> done: {{ finished }}</h2>
    <h2> active: {{ active }}</h2>
    <button type="button" v-on:click="startTimer"> Start</button>
    <button type="button" v-on:click="stopTimer"> Stop</button>
    <button type="button" v-on:click="restartTimer(20)"> Restart(20Sec)</button>

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
    // only runs if not active already
    this.$store.dispatch('startUpdateLoop');
  },
  computed: {
    getSeconds() {
      return zeroPad(Math.floor(this.$store.state.t % 60), 2);
    },
    getMinutes() {
      return zeroPad(Math.floor(this.$store.state.t / 60), 2);
    },
    getMilliseconds() {
      return zeroPad(Math.floor((this.$store.state.t % 1)*100) , 2);
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
    },
    restartTimer(t) {
      this.$store.dispatch('stopTimer');
      this.$store.dispatch('setupTimer', t);
    }
  }
}
</script>

<style scoped>

</style>