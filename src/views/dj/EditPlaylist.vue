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

        <file-reader-csv @csv-data-uploaded="handleCsvData"></file-reader-csv>

        <!-- Übergabe der Header an PreviewCSV -->
        <PreviewCSV :previewData="csvArrayData" :headers="csvHeaders"></PreviewCSV>

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
      csvArrayData: [],
      csvObjData: null,
      csvHeaders: []
    }
  },
  computed: {
    playlist() {
      const playlistStore = usePlaylistStore()
      return playlistStore.currentPlaylist
    }
  },

  async created() {
    const djStore = useDjStore()
    djStore.loadActiveDjIdFromLocalStorage()

    const playlistStore = usePlaylistStore()
    playlistStore.loadCurrentPlaylistIdFromLocalStorage()
    const playlistId = playlistStore.currentPlaylistId

    if (playlistId) {
      await playlistStore.fetchPlaylist(playlistId)
    }
  },

  methods: {
    async updatePlaylist() {
      try {
        if (this.csvObjData) {
          this.playlist.songs = this.csvObjData
        }

        await usePlaylistStore().updatePlaylistInApi(this.playlist)
        alert('Playlist erfolgreich aktualisiert')
      } catch (error) {
        console.error('Fehler beim Aktualisieren der Playlist:', error)
        alert('Fehler beim Aktualisieren der Playlist')
      }
    },

    handleCsvData(arrayData, objData) {
      if (arrayData.length > 0) {
        this.csvHeaders = arrayData[0]
        this.csvArrayData = arrayData.slice(1)
        this.csvObjData = objData.slice(1)
      } else {
        this.csvHeaders = []
        this.csvArrayData = []
        this.csvObjData = []
      }
      this.playlist.songs = this.csvObjData
    }
  }
}
</script>
