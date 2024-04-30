<template>
  <div>
    <!-- Benutzeroberfläche für den CSV-Reader, wenn nötig -->
    <label for="event-upload">Upload CSV:</label>
    <input type="file" name="event-upload" accept=".csv" @change="loadCSV" />
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      csvData: [] // Hier werden die geparsten Daten gespeichert
    }
  },
  methods: {
    async loadCSV(event) {
      const filePath = event.target.value
      console.log(filePath)
      try {
        const response = await axios.get(
          'https://support.staffbase.com/hc/en-us/article_attachments/360009197031/username.csv'
        ) // Passe den Pfad zur CSV-Datei an
        const csvData = []
        // Parsen der CSV-Daten im Browser
        const lines = response.data.split('\n')
        const headers = lines[0].split(',')
        for (let i = 1; i < lines.length; i++) {
          const data = {}
          const values = lines[i].split(',')
          for (let j = 0; j < headers.length; j++) {
            data[headers[j]] = values[j]
          }

          csvData.push(data)
        }

        // Speichern der geparsten Daten im State
        this.csvData = csvData
        console.log('Read:', csvData)
        // Optional: Weitergabe der geparsten Daten an die übergeordnete Komponente
        this.$emit('csv-loaded', csvData)
      } catch (error) {
        console.error('Fehler beim Laden der CSV:', error)
      }
    }
  }
  //   mounted() {
  //     this.loadCSV()
  //   }
}
</script>
