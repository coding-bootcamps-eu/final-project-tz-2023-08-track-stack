<template>
  <!-- Header mit Name/Logo-->
  <header
    :style="{
      background: `radial-gradient(circle, rgba(0, 0, 255, 0.5), rgba(255, 255, 255, 0.2)),
    url(${selectedEventImage}) center/cover`
    }"
  >
    <a href="/"><img class="img-logo" src="/images/logo_hulaloop.svg" alt="Logo Hulaloop" /></a>
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
import { useEventStore } from '@/stores/EventStore'
export default {
  data() {
    return {
      projectName: 'Hulaloop',
      selectedEventImage: '/images/header_default.jpg' // Initial
      //selectedEventImage: this.eventData.eventImage // Muss noch getestet werden, ggf. brauchen wir hier eine Computed
    }
  },
  computed: {
    isLoggedIn() {
      // Überprüfung, ob LocalStorage gesetzt ist
      return useDjStore().activeDjId !== null || localStorage.getItem('activeDjId') !== null
    },
    eventData() {
      const eventStore = useEventStore()
      return eventStore.eventDataForGuest
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
