<template>
  <div id="nav">
    <router-link to="/">Timer</router-link> |
    <router-link to="/settings">Settings</router-link> |
    <router-link to="/stats">Statistics</router-link>
  </div>
  <router-view/>
</template>

<script>

export default {
  name: "App",
  created() {

    // fetch settings and setup timer
    fetch('./settings.json').then(response => {
      return response.json();
    }).then(settings => {
      console.log("fetched settings", settings);
      this.$store.state.settings = settings;
      this.$store.dispatch("setupTimer", settings.t_pomodoro)
    }).catch(err => {
      console.error("error while fetching settings.json \n", err)
    });

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
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
