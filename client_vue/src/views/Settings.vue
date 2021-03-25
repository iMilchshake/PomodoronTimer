<template>
  <div class="about">
    <h1>SettingsPage</h1>
    <SettingsMenu/>
    <img alt="Vue logo" src="../assets/pomodoro-timer.png">
  </div>
</template>
<script>
import SettingsMenu from "@/components/SettingsMenu";
export default {
  components: {SettingsMenu}
}
</script>