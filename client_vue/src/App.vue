<template>
  <div id="app">
    <div id="nav" v-bind:style="getSchemeStyle('navBackground')">
      <router-link to="/">Timer</router-link> |
      <router-link to="/settings">Settings</router-link> |
      <router-link to="/stats">Statistics</router-link>
    </div>
    <div id="dynamicView" v-bind:style="getSchemeStyle('background')">
      <router-view/>
    </div>
  </div>
</template>

<script>


export default {
  name: "App",
  beforeCreate() {

    // apply default color
    this.$store.dispatch("updateColorScheme", 1)

    // setup timer
    this.$store.commit("setTimer", this.$store.state.settings.t_pomodoro)

    // start timer's update loop
    this.$store.dispatch('startUpdateLoop');
  },
  methods: {
    getSchemeStyle(element) {
      const colorScheme = this.$store.state.colorScheme.scheme;
      return colorScheme[element];
    }
  }
}

</script>

<style>


#dynamicView {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;
  background-color: #f3f3f3;
  user-select: none;
}

#nav a {
  font-weight: bold;
  color: #5b5b5b;
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
