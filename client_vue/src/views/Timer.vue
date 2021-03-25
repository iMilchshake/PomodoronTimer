<template>
  <div class="home">
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
