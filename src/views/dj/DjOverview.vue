<template>
  <small>
    <active-dj><!--Zeigt aktuellen DJ an--></active-dj> @ DjOverview</small
  >
  <h2>Übersicht DJ</h2>
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
    <router-link to="/edit-profile"><button>Profil bearbeiten</button></router-link>
    <router-link to="/wishlist"><button class="contrast">Zur Wunschliste</button></router-link>
  </div>
</template>

<script>
import ActiveDj from '@/components/ActiveDj.vue'
import { initDj } from '@/components/InitDj'

export default {
  components: { ActiveDj },
  data() {
    return {}
  },
  mounted() {
    //Pinia bekommt Dj aus LocalStore//Überprüfen ob DJ eingeloggt
    initDj()
  },
  methods: {}
}
</script>
