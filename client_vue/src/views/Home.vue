<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Countdown/>
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
