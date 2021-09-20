<template>
  <div id="app">
    <div id="nav" v-bind:style="getSchemeStyle('navBackground')">
      <router-link to="/">Timer</router-link>
      |
      <router-link to="/settings">Settings</router-link>
      |
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
    // fetch settings and setup timer
    // const settings = {
    //   t_pomodoro: 1500,
    //   t_short: 300,
    //   t_long: 900,
    //   n_loops: 3,
    //   colorScheme: {
    //     neutral1: {
    //       backgroundColor: '#ff0000',
    //     },
    //     highlight1: {
    //       backgroundColor: '#0029ff',
    //       color: '#ff00be'
    //     },
    //   }
    // }

    //this.$store.commit("changeSettings", settings);

    fetch('./colors.json').then(response => {
      return response.json();
    }).then(colors => {
      let debugScheme = colors[0];
      console.log(debugScheme, "was fetched");
      this.$store.commit("changeColor", debugScheme);
    }).catch(err => {
      console.error("error while fetching colors.json \n", err)
    });

    // setup timer
    this.$store.dispatch("setupTimer", this.$store.state.settings.t_pomodoro)

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
  color: #2c3e50;
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
