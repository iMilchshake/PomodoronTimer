<template>
  <div id="timer">
    <h1> active: {{ active }}, finished: {{ finished }}</h1>
    <h1> {{ getMinutes }}:{{ getSeconds }}</h1>
    <button type="button" v-on:click="startTimer"> Start</button>
    <button type="button" v-on:click="stopTimer"> Stop</button>
  </div>
</template>

<script>

const zeroPad = (num, places) => String(num).padStart(places, '0')

export default {
  name: "Countdown",
  data() {
    return {
      time: 70,
      timeoutObject: null,
      active: false
    };
  },
  computed: {
    getSeconds() {
      return zeroPad(this.time % 60, 2);
    },
    getMinutes() {
      return zeroPad(Math.floor(this.time / 60), 2);
    },
    finished() {
      return (this.time === 0);
    }
  },
  methods: {
    countDown() {
      this.timeoutObject = setTimeout(() => {
        if (this.active && this.time > 0) {
          this.time -= 1;
          this.countDown();
        }
      }, 1000)
    },
    startTimer() {
      if (this.active === false && this.timeoutObject === null) {
        this.active = true;
        this.countDown();
      }
    },
    stopTimer() {
      if (this.active === true && this.timeoutObject !== null) {
        clearTimeout(this.timeoutObject)
        this.timeoutObject = null;
        this.active = false;
      }
    }
  }
}
</script>

<style scoped>

</style>