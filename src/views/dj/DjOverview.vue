<template>
  <small>DjOverview</small>

  <h2>
    Übersicht DJ
    <span id="loggedDjWelcome">{{ loggedDj }}</span>
  </h2>
  <p>Hier bist du auf deinem Dashboard</p>
  <div class="grid">
    <router-link to="/create-event"><button>Event erstellen</button></router-link>
    <router-link to="/events"><button>Events verwalten</button></router-link>
  </div>
  <hr />
  <div class="grid">
    <router-link to="/create-playlist"><button>Playlist erstellen</button></router-link>
    <router-link to="/playlists"><button>Playlists verwalten</button></router-link>
  </div>
  <hr />
  <div class="grid">
    <router-link to="/profil"><button>Profil bearbeiten</button></router-link>
    <router-link to="/wishlist"><button class="contrast">Zur Wunschliste</button></router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedDj: ''
    }
  },
  mounted() {
    // Beim Laden der Komponente den DJ-Namen aus dem localStorage abrufen
    this.getLoggedDjFromLocalStorage()
  },
  methods: {
    getLoggedDjFromLocalStorage() {
      // Den DJ-Namen aus dem localStorage abrufen
      this.loggedDj = localStorage.getItem('loggedDj')
    }
  }
}
</script>

<style scoped>
#loggedDjWelcome {
  color: rgb(25, 255, 36);
  font-size: 2rem;
}
</style>
