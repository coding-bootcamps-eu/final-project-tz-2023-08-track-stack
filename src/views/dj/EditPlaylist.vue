<template>
  <div>
    <small><active-dj>nicht eingeloggt</active-dj> @ DjOverview</small>
    <div>
      <h2>
        Playlist: <strong>{{ playlist.title }}</strong> ändern
      </h2>

      <p>Hier änderst du deine Playlist</p>
      <form @submit.prevent="updatePlaylist">
        <label for="event-title">Titel:</label>
        <input type="text" name="event-title" v-model="playlist.title" />

        <!-- FileReader -->
        <file-reader-csv @csv-data-uploaded="handleCsvData"></file-reader-csv>

        <!-- FilePreview -->
        <PreviewCSV :previewData="csvArrayData"></PreviewCSV>

        <div class="grid">
          <input type="submit" value="Playlist aktualisieren" />
          <router-link to="/dj-overview"><button class="contrast">zurück</button></router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useDjStore } from '@/stores/DjStore'
import { usePlaylistStore } from '@/stores/PlaylistStore'
import ActiveDj from '@/components/ActiveDj.vue'
import PreviewCSV from '@/components/PreviewCSV.vue'
import FileReaderCsv from '@/components/FileReaderCsv.vue'

export default {
  components: { ActiveDj, PreviewCSV, FileReaderCsv },

  data() {
    return {
      playlistId: null,
      playlist: {
        csvArrayData: [],
        csvObjData: [],
        title: '' // Hier wird der Titel der Playlist gespeichert
      }
    }
  },
  async created() {
    // Lade die aktive DJ-ID aus dem LocalStorage
    useDjStore().loadActiveDjIdFromLocalStorage()

    const playlistId = this.$route.query.playlistId

    // Annahme: Du hast eine Methode fetchPlaylistById, die die Playlist-Daten anhand der ID abruft
    const playlistData = await usePlaylistStore().fetchPlaylist(playlistId)

    // Setze die Playlist-Daten im data-Objekt
    this.playlist = playlistData
  },
  methods: {
    async updatePlaylist() {
      try {
        // Annahme: Du hast bereits die Playlist-Daten in deinem Komponenten-Data-Objekt `playlist`

        // Lösche zuerst alle Songs aus der Playlist
        //this.playlist.songs = []

        // Rufe die `updatePlaylistInApi`-Aktion aus dem PlaylistStore auf, um die Playlist in der API zu aktualisieren
        await usePlaylistStore().updatePlaylistInApi(this.playlist)

        // Erfolgreich aktualisiert, führe weitere Aktionen aus, z.B. Navigation oder Benachrichtigung
        alert('Playlist erfolgreich aktualisiert')
      } catch (error) {
        console.error('Fehler beim Aktualisieren der Playlist:', error)
        // Behandlung des Fehlers, z.B. Benachrichtigung des Benutzers
        alert('Fehler beim Aktualisieren der Playlist')
      }
    },
    handleCsvData(arrayData, objData) {
      this.csvArrayData = arrayData
      this.csvObjData = objData
    }
  }
}
</script>
