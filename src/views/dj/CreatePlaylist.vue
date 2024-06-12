<template>
  <div>
    <active-dj class="menu">nicht eingeloggt</active-dj>
    <h2>Playlist erstellen</h2>

    <section class="grid threetwo">
      <p>
        Hier erstellst du deine Playlist für das Event. Du benötigst hierzu eine CSV Datei, rechts
        kannst du dir Beispieldateien herunterladen und mit Excel oder einem ähnlichen Programm
        bearbeiten. Als Trennzeichen verwende bitte ein Komma oder Semikolon.
      </p>

      <details class="dropdown">
        <summary>Beispieldateien herunterladen</summary>
        <ul dir="rtl">
          <li>
            <a href="/csv-sample/song_csv_semicolon_500.csv" download>500 Songs, CSV, Semikolon</a>
          </li>
          <li>
            <a href="/csv-sample/song_csv_comma.csv" download>21 Songs, CSV, Komma</a>
          </li>

          <li>
            <a href="/csv-sample/song_csv_critical.csv" download>43 Songs, CSV, Sonderzeichen</a>
          </li>
        </ul>
      </details>
    </section>

    <form @submit.prevent="submitPlaylist">
      <label for="playlist-title"
        >Titel: <span class="required">*</span>
        <input type="text" name="playlist-title" required="required" v-model="playlistTitle"
      /></label>
      <!-- FILEREADER -->
      CSV Upload: <span class="required">*</span>
      <file-reader-csv required="required" @csv-data-uploaded="handleCsvData"></file-reader-csv>

      <!-- FilePreview -->
      <PreviewCSV :previewData="csvArrayData"></PreviewCSV>
      <div class="grid">
        <input type="submit" value="Playlist hinzufügen" :disabled="!isFormValid" />
        <div>
          <router-link to="/playlists"
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
        import.meta.env.VITE_API_URL + '/users'
        const response = await fetch(import.meta.env.VITE_API_URL + '/playlists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
        })

        if (!response.ok) {
          throw new Error('Fehler beim Senden der Daten')
        }

        this.$swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Deine Playlist wurde erstellt!',
          showConfirmButton: false,
          timer: 1500
        })

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
