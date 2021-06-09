<template>
  <div id="timer">
    <div id="logo_head">
      <img class="logo" :src="'logo.png'">
    </div>
    <div id="content" class="shadow">
      <div id="phase" class="block shadow">
        <p> {{ getPhase }} </p>
      </div>
      <div id="time" class="block shadow">
        <p> {{ getMinutes }}:{{ getSeconds }}:{{ getMilliseconds }}</p>
      </div>
      <div id="buttons" class="block">
        <button class="button shadow" type="button" v-on:click="addTime(5)"> + 1min</button>
        <button class="button shadow" type="button" v-on:click="startTimer"> Start</button>
        <button class="button shadow" type="button" v-on:click="stopTimer"> Stop</button>
        <button class="button shadow" type="button" v-on:click="skipPhase"> Skip</button>
      </div>
    </div>
  </div>
</template>

<script>

import {zeroPad} from '@/assets/timecalculations';

let click_in = new Audio("click_in.mp3");
let click_out = new Audio("click_out.mp3");


export default {
  name: "Countdown",
  data() {
    return {
    };
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
    getPhase() {
      const phase = this.$store.state.phase;
      switch (phase) {
        case 'pomodoro':
          return 'Pomodoro';
        case 'short':
          return 'Short Break';
        case 'long':
          return 'Long Break';
        default:
          throw "invalid phase";
      }
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
      click_in.play();
    },
    stopTimer() {
      this.$store.dispatch('stopTimer');
      click_out.play();
    },
    addTime(t) {
      this.$store.dispatch('addTime', t);
      click_in.play();
    },
    skipPhase() {
      this.$store.dispatch('skipPhase');
      click_out.play();
    }
  }
}
</script>


<style scoped>


#logo_head {
  display: flex;
  flex-direction: row;
}

.logo {
  max-width: 300px;
  margin: 1em;
}

h1, p {
  margin: 0;
  padding: 0;
}

.shadow {
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

#timer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#content {
  background-color: gray;
  border-radius: 10px;
  margin: 1em;
}

.block {
  background-color: ghostwhite;
  border-radius: 10px;
  margin: 1em;
}

#time > p {
  padding: 0.5em;
  margin: 0;
  font-size: 4em;
}

#phase > p {
  font-size: 2em;
  padding: 0.33em;
}

#buttons {
  background-color: gray;
  display: flex;
  justify-content: space-between;
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