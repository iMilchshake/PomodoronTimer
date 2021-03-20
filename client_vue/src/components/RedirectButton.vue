<template>
  <button type="button" @click="run" content="asd">{{title}}</button>
</template>

<script>
export default {
  name: "RunScriptButton",
  props: ['title', 'url'],
  methods: {
    run: function () {
      console.log("redirecting to: " + this.url)
      window.location.href = this.url;
    }
  }
}
</script>

<style scoped>

</style>