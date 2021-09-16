<template>
  <div id="page">
    <div id="nav">
      <router-link to="/">Timer</router-link>
      |
      <router-link to="/settings">Settings</router-link>
      |
      <router-link to="/stats">Statistics</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: "App",
  created() {
    // fetch settings and setup timer
    // const settings = {
    //   t_pomodoro: 1500,
    //   t_short: 300,
    //   t_long: 900,
    //   n_loops: 3,
    // }
    //
    // this.$store.commit("changeSettings", settings);

    // fetch('./settings.json').then(response => {
    //   return response.json();
    // }).then(settings => {
    //   console.log("fetched settings", settings);
    //   this.$store.commit("changeSettings", settings);
    //   this.$store.dispatch("setupTimer", settings.t_pomodoro)
    // }).catch(err => {
    //   console.error("error while fetching settings.json \n", err)
    // });

    // setup timer
    this.$store.dispatch("setupTimer", this.$store.state.settings.t_pomodoro)

    // start timer's update loop
    this.$store.dispatch('startUpdateLoop');
  },
}

</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#page {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#nav {
  padding: 30px;
  background-color: #f3f3f3;
  user-select: none;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #838383;
}

body {
  margin: 0;
  padding: 0;
  height: 100%;
  max-height: 100%;
  width: 100%;
}

html {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
