<template>
  <!-- Header mit Name/Logo-->
  <header>
    <h1>{{ projectName }}</h1>
    <img src="./logo.png" alt="Logo" />
  </header>

  <router-view />
</template>

<script>
export default {
  data() {
    return {
      projectName: 'TrackStack'
    }
  }
}
</script>

<style>
body {
  background-color: dodgerblue;
}
</style>
