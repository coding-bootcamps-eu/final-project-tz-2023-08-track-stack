<template>
  <active-dj class="menu">nicht eingeloggt</active-dj>

  <h2>Übersicht DJ</h2>
  <p>Hier bist du auf deinem Dashboard</p>
  <div class="grid">
    <div>
      <router-link class="fullwidth" to="/create-event"
        ><button><i class="si-plus"></i> Event erstellen</button></router-link
      >
    </div>
    <div>
      <router-link class="fullwidth" to="/events"
        ><button><i class="si-pencil"></i> Events verwalten</button></router-link
      >
    </div>
  </div>
  <hr />
  <div class="grid">
    <div>
      <router-link class="fullwidth" to="/create-playlist"
        ><button><i class="si-plus"></i> Playlist erstellen</button></router-link
      >
    </div>
    <div>
      <router-link class="fullwidth" to="/playlists"
        ><button><i class="si-pencil"></i> Playlists verwalten</button></router-link
      >
    </div>
  </div>
  <hr />
  <div class="grid">
    <div>
      <router-link class="fullwidth" to="/wishlist"
        ><button class="contrast"><i class="si-server"></i> Zur Wunschliste</button></router-link
      >
    </div>
  </div>
</template>

<script>
import ActiveDj from '@/components/ActiveDj.vue'

export default {
  components: { ActiveDj }
}
</script>
