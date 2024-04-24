<template>
  <h2>CreatePlaylist</h2>
  <h3>Playlist erstellen</h3>
  <p>Hier erstellst du deine Playlist</p>
  <form>
    <label for="event-title">Titel:</label>
    <input type="text" name="event-title" />
    <label for="event-upload">Upload CSV:</label>
    <input type="file" name="event-upload" />
    <usecsv-button
      :onData="onData"
      :onClose="onClose"
      importerKey="2b88b88f-ed3a-4fae-8e9d-7dd83203eff8"
      v-slot="slotProps"
      @click="slotProps.openModal()"
    >
      Import CSV
    </usecsv-button>

    <Modal>
      <!-- Inhalt des Modals, der den CSV-Import ermöglicht -->
      <div class="modal-content">
        <input type="file" @change="handleFileInputChange" accept=".csv" />
        <div v-if="previewData.length > 0">
          <h3>Vorschau der Daten</h3>
          <table>
            <thead>
              <tr>
                <th v-for="(column, index) in previewData[0]" :key="index">
                  {{ column }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rowIndex) in previewData.slice(1)" :key="rowIndex">
                <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                  {{ cell }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <button @click="importCSV">Importieren</button> -->
        <!-- <button @click="closeModal">Abbrechen</button> -->
      </div>
    </Modal>
  </form>
  <div>##import CSV##</div>
  <router-link to="/events">Playlist hinzufügen</router-link>
</template>

<script>
import UseCSVButton from '@usecsv/vuejs3'

export default {
  components: {
    'usecsv-button': UseCSVButton
  },
  data() {
    return {
      fileData: null,
      previewData: []
    }
  },
  props: ['slotProps', 'showModal'],
  methods: {
    onData: function (data) {
      console.log('Data:', data)
    },
    onClose: function () {
      console.log('Importer is closed')
    },
    handleFileInputChange(event) {
      const file = event.target.files[0]
      const reader = new FileReader()

      reader.onload = (e) => {
        const rawData = e.target.result
        const rows = rawData.split('\n').map((row) => row.split(','))
        this.previewData = rows
      }

      reader.readAsText(file)
    }
    // importCSV() {
    //   // Hier kannst du die Logik zum Import der CSV-Daten implementieren
    //   console.log('CSV importiert:', this.previewData)
    //   this.closeModal()
    // },LOLOLOLOLOLOLwefsdfsdf
    // closeModal() {
    //   this.$emit('close')
    // }
  }
}
</script>

<style scoped>
.modal-content {
  background: brown;
  padding: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
}
</style>
