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
html {
  min-width: 300px;
  margin: 0;
  height: 100vh;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgb(130, 150, 150) 30%,
    rgb(130, 150, 150) 70%,
    rgba(255, 255, 255, 1) 100%
  );
}
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
body {
  margin: 0;
  /* background: green; */
}
</style>
