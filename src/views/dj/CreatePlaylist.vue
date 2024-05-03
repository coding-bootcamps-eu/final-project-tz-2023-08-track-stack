<template>
  <small>CreatePlaylist</small>
  <h2>Playlist erstellen</h2>
  <p>Hier erstellst du deine Playlist</p>
  <form @submit.prevent>
    <label for="event-title">Titel:</label>
    <input type="text" name="event-title" />
    <!-- FILEREADER -->
    <file-reader-csv @csv-data-uploaded="handleCsvData"></file-reader-csv>

    <!-- FilePreview -->
    <PreviewCSV :previewData="csvArrayData"></PreviewCSV>

    <input
      @click="this.$router.push({ path: '/events' })"
      type="submit"
      value="Playlist hinzufügen"
    />
  </form>
</template>

<script>
import PreviewCSV from '@/components/PreviewCSV.vue'
import FileReaderCsv from '@/components/FileReaderCsv.vue'
export default {
  components: { PreviewCSV, FileReaderCsv },
  data() {
    return {
      csvArrayData: [],
      csvObjData: []
    }
  },
  methods: {
    //erhält CSV daten als Array und als Obj
    handleCsvData(arrayData, objData) {
      this.csvArrayData = arrayData
      this.csvObjData = objData
    }
  }
}
</script>

<!-- TODOS -->
