<template>
  <div id="layout">

    <div>
      <input type="checkbox" id="dark_mode" name="dark_mode" v-model="dark_mode" @change="changeColorScheme($event)">
      <label for="scales">Dark-Mode</label>
    </div>

    <FadeImage :src="'logo.png'" class="logo"/>
    <h1> Settings: </h1>
    <transition name="fade" mode="in-out">
      <div class="outer_box">
        <div class="inner_box">
          <p> t_pomodoro: {{ getSettingsString("t_pomodoro") }}sec </p>
          <p> t_short: {{ getSettingsString("t_short") }}sec </p>
          <p> t_long: {{ getSettingsString("t_long") }}sec </p>
          <p> n_loops: {{ getSettingsString("n_loops") }}x </p>
        </div>
      </div>
    </transition>
    <h1> Log: </h1>
    <transition name="fade" mode="in-out">
      <div class="outer_box" v-if="times.length > 0" key="log">
        <div class="inner_box" v-for="t in times" :key="t.start">
          <p> {{ t }} </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import FadeImage from "@/components/FadeImage";
import {getTimeObjects} from "@/assets/backend_request";


export default {
  name: "SettingsMenu",
  components: {FadeImage},
  data: function () {
    return { 
      dark_mode: Boolean(this.$store.state.colorIndex),
      times: [],
      settings: {}
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
    updateSettings: function () {
      fetch("settings.json")
          .then(response => {
            return response.json()
          })
          .then(data => {
            this.settings = data;
          });
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
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;

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