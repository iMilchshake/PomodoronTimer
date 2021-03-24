<template>
  <div class="home">
    <Countdown/>
    <img alt="Vue logo" src="../assets/pomodoro-timer.png">
  </div>
</template>

<script>
// @ is an alias to /src

import Countdown from "@/components/Countdown";
export default {
  name: 'Home',
  components: {
    Countdown
  }
}
</script>
