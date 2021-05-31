<template>
  <div id="layout">
    <h1> Settings: </h1>
    <div class="outer_box">
      <div class="inner_box">
        <p> t_pomodoro {{ getSettingsString("t_pomodoro") }} sec </p>
        <p> t_short {{ getSettingsString("t_short") }} sec </p>
        <p> t_long {{ getSettingsString("t_long") }} sec </p>
        <p> n_loops {{ getSettingsString("n_loops") }} sec </p>
        <!--        <input type="text" v-model="getSettings[setting]">-->
      </div>
    </div>
    <h1> Log: </h1>
    <transition name="fade" mode="in-out">
      <div class="outer_box" v-if="times.length > 0" key="log">
        <div class="inner_box" v-for="t in times" :key="t.t_start">
          <p> {{ t }} </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

import settings from '../assets/settings';
import {clientside_storage} from "@/assets/logger";
import {getTimeObjects} from "@/assets/backend_request";

export default {
  name: "SettingsMenu",
  data: function () {
    return {
      times: [],
    }
  },
  created() {
    this.updateTimes();
  },
  computed: {
    getSettings() {
      return settings;
    },
    getLog() {
      const times = clientside_storage.map(obj => {
        return {
          t_start: obj.t_start.toLocaleString(),
          t_elapsed: obj.t_elapsed,
          t_phase: obj.phase,
        }
      });
      return JSON.stringify(times, null, 2)
    }
  },
  methods: {
    getSettingsString(s) {
      console.log("d", settings[s]);
      return "" + settings[s];
    },
    updateTimes: function () {
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
    }
  }
}
</script>

<style scoped>
#layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.outer_box {
  display: flex;
  flex-direction: column;
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