<template>
  <div id="timer">
    <div id="content" class="shadow" v-bind:style="colorScheme.neutral1">
      <div id="phase" class="block shadow" v-bind:style="colorScheme.highlight1">
        <p> {{ getPhase }} </p>
      </div>
      <div id="time" class="block shadow" v-bind:style="colorScheme.highlight1">
        <p> {{ getTimeString }}</p>
      </div>
      <div id="buttons" class="block" v-bind:style="colorScheme.neutral1">
        <button class="button shadow" type="button" v-bind:style="colorScheme.highlight1" v-on:click="addTime(60)">
          +1min
        </button>
        <button class="button shadow" type="button" v-bind:style="colorScheme.highlight1" v-on:click="startTimer">
          Start
        </button>
        <button class="button shadow" type="button" v-bind:style="colorScheme.highlight1" v-on:click="stopTimer"> Stop
        </button>
        <button class="button shadow" type="button" v-bind:style="colorScheme.highlight1" v-on:click="skipPhase"> Skip
        </button>
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
  components: {},
  data() {
    return {
      colorScheme: {
        neutral1: {
          backgroundColor: '#8d8d8d',
        },
        highlight1: {
          backgroundColor: '#ffffff',
          color: '#363e3e'
        },
      }
    };
  },
  created() {
  },
  computed: {
    getColorScheme() {
      const colorScheme = this.$store.state.settings.colorScheme;
      console.log("scheme", colorScheme)
      return colorScheme;
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
    getTimeString() {
      const sec = zeroPad(Math.floor(this.$store.state.t % 60), 2);
      const min = zeroPad(Math.floor(this.$store.state.t / 60), 2);
      // const milli = zeroPad(Math.floor((this.$store.state.t % 1) * 100), 2);

      const timeString = min + ":" + sec;
      const headString = timeString + " - " + this.getPhase;

      // only update DOM if time actually changed
      if (document.title !== headString) {
        document.title = headString;
      }

      return timeString;
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

h1, p {
  margin: 0;
  padding: 0;
}

#timer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}

.shadow {
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

#content {
  background-color: gray;
  border-radius: 10px;
  margin: 1em;
  user-select: none;
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
  padding: 15px 0;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  outline: none;
  width: 80px;
}

</style>