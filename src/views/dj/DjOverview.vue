<template>
  <div>
    <p>Daten zum testen</p>
    <p>{{ store.apiData.djs }}</p>
  </div>
  <small>DjOverview</small>
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
    <router-link to="/profil"><button>Profil bearbeiten</button></router-link>
    <router-link to="/wishlist"><button class="contrast">Zur Wunschliste</button></router-link>
  </div>
</template>

<script>
import { AppData } from '@/stores/AppData.js'

export default {
  data() {
    return {
      store: AppData()
    }
  },

  created() {
    this.store.getApiData()
  }
}
</script>
