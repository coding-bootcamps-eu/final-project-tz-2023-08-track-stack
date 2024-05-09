<template>
  <small>
    <active-dj><!--Zeigt aktuellen DJ an--></active-dj> @ PlaylistView</small
  >
  <h2>Playlisten verwalten</h2>

  <p>Hier verwaltest du deine Playlisten</p>
  <form @submit.prevent>
    <ol>
      <li v-for="playlist in playlists" :key="playlist.id">
        <details>
          <summary role="button" class="outline contrast">
            <h4>{{ playlist.title }}</h4>
            - Event ID: {{ playlist.eventId }} - User ID: {{ playlist.userId }} - DJ ID:
            {{ playlist.djId }}
          </summary>
          <section class="grid">
            <input
              id="event-edit"
              @click="this.$router.push({ path: '/edit-playlist' })"
              type="submit"
              value="Ändern"
            />
            <!-- <button id="event-duplicate">Duplizieren</button> -->
            <button id="event-delete">Löschen</button>
          </section>
        </details>
      </li>
    </ol>
  </form>
  <router-link to="/dj-overview"><button>Zurück zur Übersicht</button></router-link>
  <hr />
  <h3>Komplette Daten aus API inklusive Songs</h3>
  <div v-for="playlist in playlists" :key="playlist.id">
    <div>Title: {{ playlist.eventId }}</div>
    <div>Event ID: {{ playlist.eventId }}</div>
    <div>User ID: {{ playlist.userId }}</div>
    <div>DJ ID: {{ playlist.djId }}</div>
    <div>Songs: {{ playlist.songs }}</div>
    <hr />
  </div>
</template>
<script>
import { usePlaylistStore } from '@/stores/PlaylistStore'
import ActiveDj from '@/components/ActiveDj.vue'
import { initDj } from '@/components/InitDj'

export default {
  components: { ActiveDj },

  data() {
    return {
      playlists: []
    }
  },
  async mounted() {
    await usePlaylistStore().fetchPlaylists() // Fetch DJs data from API when component is mounted
    this.playlists = usePlaylistStore().playlists
    initDj()
  }
}
</script>
