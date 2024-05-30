<template>
  <div>
    <active-dj class="menu">nicht eingeloggt</active-dj>
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
                <a href="/csv-sample/song_csv_comma.csv" download
                  >Download CSV mit Komma getrennt</a
                >
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
      <div class="grid">
        <input type="submit" value="Playlist hinzufügen" :disabled="!isFormValid" />
        <div>
          <router-link to="/dj-overview"
            ><button class="contrast"><i class="si-chevron-left"></i> zurück</button></router-link
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { useDjStore } from '@/stores/DjStore'
import ActiveDj from '@/components/ActiveDj.vue'
import PreviewCSV from '@/components/PreviewCSV.vue'
import FileReaderCsv from '@/components/FileReaderCsv.vue'

export default {
  components: { PreviewCSV, FileReaderCsv, ActiveDj },
  data() {
    return {
      csvArrayData: [],
      csvObjData: [],
      playlistTitle: ''
    }
  },
  computed: {
    isFormValid() {
      return this.playlistTitle.trim() !== '' && this.csvObjData.length > 0
    }
  },
  async created() {
    // Lade die aktive DJ-ID aus dem LocalStorage, wenn die Komponente erstellt wird
    useDjStore().loadActiveDjIdFromLocalStorage()
  },
  methods: {
    async submitPlaylist() {
      try {
        const activeDjId = useDjStore().activeDjId
        if (!activeDjId) {
          throw new Error('Aktiver DJ nicht festgelegt.')
        }

        const dataToSend = {
          title: this.playlistTitle,
          djId: activeDjId,
          songs: this.csvObjData
        }

        const response = await fetch('http://localhost:3000/playlists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
        })

        if (!response.ok) {
          throw new Error('Fehler beim Senden der Daten')
        }

        // Erfolgreiches Senden der Daten, Weiterleitung zum Login
        this.$router.push({ path: '/dj-overview' })
      } catch (error) {
        console.error('Fehler:', error)
        // Hier kannst du geeignete Maßnahmen ergreifen, z.B. dem Benutzer eine Fehlermeldung anzeigen
      }
    },
    handleCsvData(arrayData, objData) {
      this.csvArrayData = arrayData
      this.csvObjData = objData
    }
  }
}
</script>
