<template>
  <div>
    <transition name="fade" mode="in-out">
      <img class="fadeImg" :src="src" @load="ready()" v-show="loaded">
    </transition>
  </div>
</template>

<script>
export default {
  name: "FadeImage",
  data: function () {
    return {
      //src: "logo.png",
      loaded: false
    }
  },
  methods: {
    ready() {
      this.loaded = true;
    }
  },
  props: ["src"]
}
</script>

<style scoped>
.fadeImg {
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}
</style>