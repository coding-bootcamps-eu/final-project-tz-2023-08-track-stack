<template>
  <!-- Header mit Name/Logo-->
  <header>
    <img class="img-logo" src="./images/logo.png" alt="Logo" />
    <h1 class="pname">{{ projectName }}</h1>
    <button @click="this.goBack()">Back</button>
  </header>
  <!-- the choosen View-->
  <body>
    <router-view />
  </body>
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
header {
  min-height: 4rem;
  height: 10vh;
  background: rgba(121, 121, 221, 0.15);
  display: flex;
}
.img-logo {
  margin: 0.5rem;
  min-height: 3rem;
  height: 8vh;
}
.pname {
  font-size: 2rem;
}
</style>
