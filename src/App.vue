<template>
  <!-- Header mit Name/Logo-->
  <header>
    <img class="img-logo" src="./images/logo_senftraxx.svg" alt="Logo Senftraxx" />
    <h1 class="pname">{{ projectName }}</h1>
    <button @click="this.goBack()">Zurück</button>
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
      projectName: 'SENF TRAXX'
    }
  }
}
</script>

<style>
header {
  width: 100%;
  min-height: 10rem;
  color: white;
  background: black;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.img-logo {
  padding: 1rem;
  width: 15vw;
}
</style>
