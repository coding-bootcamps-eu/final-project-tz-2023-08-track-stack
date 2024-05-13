<template>
  <small><active-dj>nicht eingeloggt</active-dj> @ PlaylistView</small>
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
            <button type="button" @click="this.$router.push({ path: '/edit-playlist' })">
              Ändern
            </button>
            <button @click="deletePlaylist(playlist.id)">Löschen</button>
          </section>
        </details>
      </li>
    </ol>
  </form>
  <router-link to="/dj-overview"><button>Zurück zur Übersicht</button></router-link>
</template>

<script>
import { usePlaylistStore } from '@/stores/PlaylistStore'
import ActiveDj from '@/components/ActiveDj.vue'

export default {
  components: { ActiveDj },

  data() {
    return {
      playlists: []
    }
  },

  created() {
    this.fetchPlaylists()
  },

  methods: {
    async fetchPlaylists() {
      await usePlaylistStore().fetchPlaylists()
      this.playlists = usePlaylistStore().playlists
    },

    async deletePlaylist(playlistId) {
      await usePlaylistStore().deletePlaylist(playlistId)
      this.fetchPlaylists() // Erneut fetchen nach Löschvorgang
    }
  }
}
</script>
