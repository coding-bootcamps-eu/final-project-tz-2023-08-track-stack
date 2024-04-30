<template>
  <small>CreatePlaylist</small>
  <h2>Playlist erstellen</h2>
  <p>Hier erstellst du deine Playlist</p>
  <form @submit.prevent>
    <label for="event-title">Titel:</label>
    <input type="text" name="event-title" />
    <!-- FILEREADER -->
    <label for="event-upload">File Reader:</label>
    <input type="file" name="event-upload" accept=".csv" @change="handleFileUpload" />
    <PreviewCSV :previewData="previewData"></PreviewCSV>
    <input
      @click="this.$router.push({ path: '/events' })"
      type="submit"
      value="Playlist hinzufügen"
    />
  </form>
  <!-- <CsvReader /> -->
  <CsvReader @csv-loaded="setCsvData" />
  <!-- <CsvVorschau /> -->
  <details v-if="previewData.length > 0">
    <summary>Daten Vorschau</summary>
    <div>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Titel</th>
            <th>Künstler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in previewData.slice(0)" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex">
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </details>
  <!-- <div v-else>
    <p>CSV wird geladen...</p>
  </div> -->
</template>

<script>
import PreviewCSV from '@/components/PreviewCSV.vue'
import CsvReader from '/src/components/CsvReader.vue'
export default {
  components: { CsvReader, PreviewCSV },
  data() {
    return {
      previewData: [],
      csvData: []
    }
  },
  methods: {
    setCsvData(data) {
      console.log(data)
      this.csvData = data
      this.previewData = data
    },
    handleFileUpload(event) {
      const file = event.target.files[0]
      const reader = new FileReader()

      reader.onload = (e) => {
        const fileContent = e.target.result
        console.log('Dateiinhalt:', fileContent)
        // Verarbeite den Dateiinhalt hier weiter
        const lines = fileContent.split('\n')
        const arrayData = lines.map((line) => line.split(','))
        console.log('ArrayDaten:', arrayData)
        //'Daten Vorschau'-> wird für Test gefüllt
        this.previewData = arrayData
      }

      reader.readAsText(file)
    }
  }
}
</script>

<!-- TODOS -->
<!-- DATEI Auswahl fixen!! -->
<!-- Axios auf alternative umstellen -->

<!-- CSV-VORSCHAU mit in componente integrieren -->
