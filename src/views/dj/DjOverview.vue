<template>
  <active-dj class="menu">nicht eingeloggt</active-dj>

  <h2>Übersicht DJ</h2>
  <p>Hier bist du auf deinem Dashboard</p>
  <div class="grid">
    <router-link class="" to="/create-event"><button>Event erstellen ➕</button></router-link>
    <router-link class="" to="/create-playlist"><button>Playlist erstellen ➕</button></router-link>
  </div>
  <hr />
  <div class="grid">
    <router-link class="" to="/events"><button>Deine Events ⚙️</button></router-link>
    <router-link class="" to="/playlists"><button>Deine Playlists ⚙️</button></router-link>
  </div>
  <hr />
  <div class="grid">
    <router-link class="" to="/wishlist"
      ><button class="contrast">Zur Wunschliste 🎵</button></router-link
    >
  </div>
</template>

<script>
import ActiveDj from '@/components/ActiveDj.vue'

export default {
  components: { ActiveDj }
}
</script>
