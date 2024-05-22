<template>
  <div>
    <!-- Anzeige, dass der Benutzer nicht eingeloggt ist und Angabe des aktuellen Moduls -->
    <small><active-dj>nicht eingeloggt</active-dj> @ DjOverview</small>
    <div>
      <h2>
        Playlist: <strong>{{ playlist.title }}</strong> ändern
      </h2>

      <p>Hier änderst du deine Playlist</p>
      <!-- Formular zur Aktualisierung der Playlist -->
      <form @submit.prevent="updatePlaylist">
        <label for="event-title">Titel:</label>
        <!-- Eingabefeld für den Titel der Playlist -->
        <input type="text" name="event-title" v-model="playlist.title" />

        <!-- Komponente zum Hochladen von CSV-Dateien -->
        <file-reader-csv @csv-data-uploaded="handleCsvData"></file-reader-csv>

        <!-- Übergabe der CSV-Daten an die Vorschau-Komponente -->
        <PreviewCSV :previewData="csvArrayData" :headers="csvHeaders"></PreviewCSV>

        <div class="grid">
          <!-- Button zum Absenden des Formulars und Aktualisieren der Playlist -->
          <input type="submit" value="Playlist aktualisieren" />
          <!-- Button zum Zurückgehen zur DJ-Übersicht -->
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
      csvArrayData: [], // Array-Daten der CSV-Datei
      csvObjData: null, // Objekt-Daten der CSV-Datei
      csvHeaders: [] // Header der CSV-Datei
    }
  },

  computed: {
    // Computed Property, um die aktuelle Playlist aus dem Store zu holen
    playlist() {
      const playlistStore = usePlaylistStore()
      return playlistStore.currentPlaylist
    }
  },

  async created() {
    // Lädt beim Erstellen der Komponente die ID des aktiven DJs und die aktuelle Playlist-ID aus dem lokalen Speicher
    const djStore = useDjStore()
    djStore.loadActiveDjIdFromLocalStorage()

    const playlistStore = usePlaylistStore()
    playlistStore.loadCurrentPlaylistIdFromLocalStorage()
    const playlistId = playlistStore.currentPlaylistId

    // Falls eine Playlist-ID vorhanden ist, wird die entsprechende Playlist vom Server geladen
    if (playlistId) {
      await playlistStore.fetchPlaylist(playlistId)
    }
  },

  methods: {
    // Methode zur Aktualisierung der Playlist
    async updatePlaylist() {
      try {
        // Falls CSV-Daten vorhanden sind, werden sie in die Playlist übernommen
        if (this.csvObjData) {
          this.playlist.songs = this.csvObjData
        }

        // Aktualisiert die Playlist im API-Server
        await usePlaylistStore().updatePlaylistInApi(this.playlist)
        alert('Playlist erfolgreich aktualisiert')
      } catch (error) {
        console.error('Fehler beim Aktualisieren der Playlist:', error)
        alert('Fehler beim Aktualisieren der Playlist')
      }
    },

    // Methode zum Handling der hochgeladenen CSV-Daten
    handleCsvData(arrayData, objData) {
      if (arrayData.length > 0) {
        // Setzt die Header und die Daten aus der CSV-Datei
        this.csvHeaders = arrayData[0]
        this.csvArrayData = arrayData.slice(1)
        this.csvObjData = objData.slice(1)
      } else {
        // Setzt die Daten auf leer, falls die CSV-Datei keine Daten enthält
        this.csvHeaders = []
        this.csvArrayData = []
        this.csvObjData = []
      }
      // Aktualisiert die Songs der Playlist mit den hochgeladenen CSV-Daten
      this.playlist.songs = this.csvObjData
    }
  }
}
</script>
