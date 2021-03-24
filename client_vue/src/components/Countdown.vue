<template>
  <div id="timer">
    <div id="content">

      <div id="time">
        <p> {{ getMinutes }}:{{ getSeconds }}:{{ getMilliseconds }}</p>
      </div>

      <div id="buttons">
        <button class="button" type="button" v-on:click="addTime(5)"> + 1min</button>
        <button class="button" type="button" v-on:click="startTimer"> Start</button>
        <button class="button" type="button" v-on:click="stopTimer"> Stop</button>
      </div>
    </div>
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
      return zeroPad(Math.floor((this.$store.state.t % 1) * 100), 2);
    },
    finished() {
      return (this.t === 0);
    },
    active() {
      return this.$store.state.active;
    },
    totalTime() {
      return this.$store.state.t_goal;
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
    },
    playClickSound() {
      let a = new Audio("CLICK7C.wav");
      a.play();
    },
    addTime(t) {
      const active = this.$store.state.active;
      this.$store.dispatch('stopTimer');

      const time_left = this.$store.state.t_left;
      this.$store.dispatch('setupTimer', time_left + t);

      if (active) {
        this.$store.dispatch('startTimer');
      }
    }
  }
}
</script>

<style scoped>
#timer {
  display: flex;
  align-items: center;
  justify-content: center;
}

#content {
  background-color: lightgray;
  border-radius: 10px;
  margin: 1em;
}

#time {
  background-color: ghostwhite;
  border-radius: 10px;
  margin: 1em;
}

#time > p {
  padding: 0.5em;
  margin: 0;
  font-size: 4em;
}

#buttons {
  padding: 0 1em 1em 1em;
  display: flex;
  gap: 0.5em;
}

.button {
  background-color: ghostwhite;
  border: none;
  border-radius: 5px;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  outline: none;
}

</style>