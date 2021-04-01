<template>
  <div id="layout">
    <h1> Settings: </h1>
    <p class="json_display"> {{ getSettings }}</p>
    <h1> Log: </h1>
    <p class="json_display"> {{ times }}</p>
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
      return JSON.stringify(settings, null, 2);
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
    updateTimes: function () {
      getTimeObjects()
          .then(t => {
            return t.data.map(obj => {
              return {
                t_start: obj.t_start.toLocaleString(),
                t_elapsed: obj.t_elapsed,
                t_phase: obj.phase,
              }
            })
          })
          .then(t_mapped => {
            return JSON.stringify(t_mapped, null, 2);
          })
          .then(t_string => {
            this.times = t_string;
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

.json_display {
  white-space: pre-wrap;
  text-align: left;
}
</style>