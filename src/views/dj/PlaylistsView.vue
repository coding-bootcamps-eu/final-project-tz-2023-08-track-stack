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
            - Playlist ID: {{ playlist.id }} <br />
            - DJ ID: {{ playlist.djId }}
          </summary>
          <section class="grid">
            <button type="button" @click="editPlaylist(playlist.id)">Ändern</button>
            <button type="button" @click="deletePlaylist(playlist.id)">Löschen</button>
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
    async editPlaylist(playlistId) {
      const playlistStore = usePlaylistStore()
      playlistStore.setCurrentPlaylistId(playlistId)
      this.$router.push({ path: '/edit-playlist' })
    },
    async fetchPlaylists() {
      const localStorageDjId = localStorage.getItem('activeDjId')
      if (!localStorageDjId) {
        return
      }

      await usePlaylistStore().fetchPlaylists()
      this.playlists = usePlaylistStore().playlists.filter(
        (playlist) => playlist.djId === localStorageDjId
      )
    },

    async deletePlaylist(playlistId) {
      await usePlaylistStore().deletePlaylist(playlistId)
      this.fetchPlaylists()
    }
  }
}
</script>
