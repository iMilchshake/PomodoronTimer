<template>
  <div id="layout" v-bind:style="getSchemeStyle('background')">

    <div v-bind:style="getSchemeStyle('text')">
      <input type="checkbox" id="dark_mode" name="dark_mode" v-model="dark_mode" @change="changeColorScheme($event)">
      <label for="dark_mode">Dark-Mode</label>
    </div>

    <!-- <FadeImage :src="'logo.png'" class="logo"/> -->

    <h1 v-bind:style="getSchemeStyle('text')"> Settings: </h1>
    <transition name="fade" mode="in-out">

      <div class="outer_box" v-bind:style="getSchemeStyle('neutral1')">
        <div class="inner_box" v-bind:style="getSchemeStyle('highlight1')">
          <!-- <p> t_pomodoro: {{ getSettingsString("t_pomodoro") }}sec </p>
          <p> t_short: {{ getSettingsString("t_short") }}sec </p>
          <p> t_long: {{ getSettingsString("t_long") }}sec </p>
          <p> n_loops: {{ getSettingsString("n_loops") }}x </p> -->


          <label for="t_pomodoro"> Pomodoro Time</label>
          <input type="number" id="t_pomodoro" name="t_pomodoro" v-model="settings.t_pomodoro">
          <p> sec </p>

          <label for="t_short"> Short-Break Time</label>
          <input type="number" id="t_short" name="t_short" v-model="settings.t_short">
          <p> sec </p>

          <label for="t_long"> Long-Break Time</label>
          <input type="number" id="t_long" name="t_long" v-model="settings.t_long">
          <p> sec </p>

          <label for="n_loops"> Loop Count</label>
          <input type="number" id="n_loops" name="n_loops" v-model="settings.n_loops">
          <p> sec </p>

          <div/>
          <input type="button" value="Submit" @click="updateSettings()">
          <div/>

        </div>
      </div>
    </transition>
    <h1 v-bind:style="getSchemeStyle('text')"> Log: </h1>
    <transition name="fade" mode="in-out">
      <div class="outer_box" v-if="times.length > 0" key="log" v-bind:style="getSchemeStyle('neutral1')">
        <div class="inner_box" v-for="t in times" :key="t.start" v-bind:style="getSchemeStyle('highlight1')">
          <p> {{ t }} </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// import FadeImage from "@/components/FadeImage";
import {getTimeObjects} from "@/assets/backend_request";


export default {
  name: "SettingsMenu",
  components: {},
  data: function () {
    return {
      dark_mode: Boolean(this.$store.state.colorIndex),
      times: [],
      settings: this.$store.state.settings,
    }
  },
  created() {
    this.updateLog();
    console.log(this.$store.state.colorIndex)
    //this.updateSettings();
  },
  computed: {},
  methods: {
    getSettingsString(s) {
      return this.$store.state.settings[s];
    },
    changeColorScheme(e) {
      const scheme_index = this.dark_mode ? 1 : 0;
      this.$store.dispatch("updateColorScheme", scheme_index)
      console.log(scheme_index, e.returnValue)
    },
    getSchemeStyle(element) {
      const colorScheme = this.$store.state.colorScheme.scheme;
      return colorScheme[element];
    },
    updateLog: function () {
      getTimeObjects()
          .then(t => {
            return t.data.map(obj => {
              return {
                start: new Date(obj.start).toLocaleString(),
                end: new Date(obj.end).toLocaleString(),
                time: obj.time_goal,
                time_left: obj.time_left,
                phase: obj.phase,
              }
            })
          })
          .then(t => {
            this.times = t;
          });
    },
    updateSettings() {
      this.$store.commit("updateSettings", this.settings);
      this.$store.dispatch("resetTimer");
      console.log("timer has been reset!");
    }
  }
}
</script>

<style scoped>

.logo {
  width: 300px;
  height: 300px;
}


#layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.outer_box {
  display: flex;
  flex-direction: column-reverse;
  align-items: stretch;
  justify-content: center;
  background-color: gray;
  gap: 1em;
  padding: 1em;
  border-radius: 8px;
  max-width: 350px;
  width: 100%;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}


.inner_box {
  display: grid;
  grid-template-columns: minmax(130px, 60%) 30% auto;
  grid-template-rows: auto;
  row-gap: 0.25em;
  /* flex-direction: column; */
  /* align-content: center; */
  /* justify-content: flex-start; */


  white-space: pre-wrap;
  text-align: left;

  background-color: ghostwhite;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

  border-radius: 8px;
  padding: 1em;
  margin: 0;
}

.inner_box > p {
  margin: 0;
  padding: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}


</style>