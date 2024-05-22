<template>
  <!-- Anzeige des DJ-Status und des aktuellen Moduls -->
  <small><active-dj>nicht eingeloggt</active-dj> @ PlaylistView</small>
  <h2>Playlisten verwalten</h2>

  <p>Hier verwaltest du deine Playlisten</p>
  <!-- Formular zur Anzeige und Verwaltung der Playlisten -->
  <form @submit.prevent>
    <ol>
      <!-- Durchlaufen der Playlists und Erstellen von Listeneinträgen -->
      <li v-for="playlist in playlists" :key="playlist.id">
        <details name="accordion">
          <summary role="button" class="outline contrast">
            <h4>{{ playlist.title }}</h4>
            - Playlist ID: {{ playlist.id }} <br />
            - DJ ID: {{ playlist.djId }}
          </summary>
          <section class="grid">
            <!-- Button zum Bearbeiten der Playlist -->
            <button type="button" @click="editPlaylist(playlist.id)">Ändern</button>
            <!-- Button zum Löschen der Playlist -->
            <button type="button" @click="deletePlaylist(playlist.id)">Löschen</button>
          </section>
        </details>
      </li>
    </ol>
  </form>
  <!-- Button zum Zurückgehen zur DJ-Übersicht -->
  <router-link to="/dj-overview"><button>Zurück zur Übersicht</button></router-link>
</template>

<script>
import { usePlaylistStore } from '@/stores/PlaylistStore'
import ActiveDj from '@/components/ActiveDj.vue'

export default {
  components: { ActiveDj },

  data() {
    return {
      playlists: [] // Array zur Speicherung der Playlists
    }
  },

  created() {
    // Ruft die Playlists ab, sobald die Komponente erstellt wird
    this.fetchPlaylists()
  },

  methods: {
    // Methode zum Bearbeiten einer Playlist
    async editPlaylist(playlistId) {
      const playlistStore = usePlaylistStore()
      // Setzt die aktuelle Playlist-ID im Store
      playlistStore.setCurrentPlaylistId(playlistId)
      // Navigiert zur Bearbeitungsseite der Playlist
      this.$router.push({ path: '/edit-playlist' })
    },

    // Methode zum Abrufen der Playlists
    async fetchPlaylists() {
      // Holt die DJ-ID aus dem lokalen Speicher
      const localStorageDjId = localStorage.getItem('activeDjId')
      if (!localStorageDjId) {
        return
      }

      // Ruft die Playlists vom Server ab
      await usePlaylistStore().fetchPlaylists()
      // Filtert die Playlists nach der DJ-ID
      this.playlists = usePlaylistStore().playlists.filter(
        (playlist) => playlist.djId === localStorageDjId
      )
    },

    // Methode zum Löschen einer Playlist
    async deletePlaylist(playlistId) {
      // Löscht die Playlist anhand der ID
      await usePlaylistStore().deletePlaylist(playlistId)
      // Ruft die Playlists erneut ab, um die Liste zu aktualisieren
      this.fetchPlaylists()
    }
  }
}
</script>
