<template>
  <!-- Header mit Name/Logo-->
  <header
    :style="{
      background: `radial-gradient(circle, rgba(0, 0, 255, 0.5), rgba(255, 255, 255, 0.2)),
    url('/images/header_default.jpg') center/cover`
    }"
  >
    <a href="/"><img class="img-logo" src="/images/logo_hulaloop.svg" alt="Logo Senftraxx" /></a>
    <button v-if="isLoggedIn" @click="logout()">logout</button>
  </header>
  <!-- the choosen View-->
  <body>
    <main class="container">
      <router-view />
    </main>
  </body>
  <footer>Ein <strong>Coding Bootcamp Europe</strong> - Abschlussprojekt 2024</footer>
</template>

<script>
import { useDjStore } from '@/stores/DjStore'
export default {
  data() {
    return {
      projectName: 'Hulaloop',
      selectedEventImage: 'Default' // Initial
    }
  },
  computed: {
    isLoggedIn() {
      // Überprüfung, ob LocalStorage gesetzt ist
      return useDjStore().activeDjId !== null || localStorage.getItem('activeDjId') !== null
    }
  },
  methods: {
    logout() {
      // remove activeDjId from localstorage
      localStorage.removeItem('activeDjId')
      useDjStore().activeDjId = null
      // redirect to login page
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style scoped>
header {
  width: 100%;
  color: white;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-block: 2rem;
}

footer {
  background: black;
  padding: 1rem;
  color: white;
  text-align: center;
}
.img-logo {
  width: 25vw;
  padding-bottom: 1rem;
}
header h1 {
  color: white;
}
</style>
