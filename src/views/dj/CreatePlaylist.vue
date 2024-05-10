<template>
  <small>
    <active-dj><!--Zeigt aktuellen DJ an--></active-dj> @ CreatePlaylist</small
  >
  <h2>Playlist erstellen</h2>

  <nav>
    <ul>
      <li>Hier erstellst du deine Playlist für das Event.</li>
    </ul>
    <ul>
      <li>
        <details class="dropdown">
          <summary>Download Test CSV</summary>
          <ul dir="rtl">
            <li>
              <a href="/csv-sample/song_csv_comma.csv" download>Download CSV mit Komma getrennt</a>
            </li>
            <li>
              <a href="/csv-sample/song_csv_semicolon.csv" download
                >Download CSV mit Semikolon getrennt</a
              >
            </li>
            <li>
              <a href="/csv-sample/song_csv_critical.csv" download
                >Download CSV mit Anführungszeichen und Umlauten</a
              >
            </li>
          </ul>
        </details>
      </li>
    </ul>
  </nav>
  <hr />
  <form @submit.prevent="submitPlaylist">
    <label class="hidden" for="playlist-title">Titel:</label>
    <input
      type="text"
      name="playlist-title"
      placeholder="Bitte vergebe einen aussagekräftigen Titel "
      v-model="playlistTitle"
    />
    <!-- FILEREADER -->
    <file-reader-csv @csv-data-uploaded="handleCsvData"></file-reader-csv>

    <!-- FilePreview -->
    <PreviewCSV :previewData="csvArrayData"></PreviewCSV>

    <input type="submit" value="Playlist hinzufügen" :disabled="!isFormValid" />
  </form>
</template>

<script>
import PreviewCSV from '@/components/PreviewCSV.vue'
import FileReaderCsv from '@/components/FileReaderCsv.vue'
import { useDjStore } from '@/stores/DjStore'
import ActiveDj from '@/components/ActiveDj.vue'
import { initDj } from '@/components/InitDj'

export default {
  components: { PreviewCSV, FileReaderCsv, ActiveDj },
  data() {
    const activeDjFromStore = useDjStore().activeDj
    const playlistsFromStore = useDjStore().playlists
    return {
      csvArrayData: [],
      csvObjData: [],
      activeDJ: activeDjFromStore,
      playlists: playlistsFromStore,
      playlistTitle: ''
    }
  },
  mounted() {
    initDj()
  },
  computed: {
    isFormValid() {
      return (
        this.playlistTitle !== '' // Titel darf nicht leer sein
        // Hier kannst du weitere Validierungen hinzufügen
      )
    }
  },
  methods: {
    //erhält CSV daten als Array und als Obj
    handleCsvData(arrayData, objData) {
      this.csvArrayData = arrayData
      this.csvObjData = objData
    },

    submitPlaylist() {
      const dataToSend = {
        //title,djId,songs REQUIRED
        title: this.playlistTitle,
        djId: this.activeDJ.id,
        songs: this.csvObjData
      }

      fetch('http://localhost:3000/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Fehler beim Senden der Daten')
          }
          // Weiterleitung zum Login
          this.$router.push({ path: '/dj-overview' })
        })
        .catch((error) => {
          console.error('Fehler:', error)
        })
    }
  }
}
</script>

<!-- TODOS -->
