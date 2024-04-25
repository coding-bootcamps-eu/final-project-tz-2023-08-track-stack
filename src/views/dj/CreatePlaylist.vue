<template>
  <h2>CreatePlaylist</h2>
  <h3>Playlist erstellen</h3>
  <p>Hier erstellst du deine Playlist</p>
  <form>
    <label for="event-title">Titel:</label>
    <input type="text" name="event-title" />
    <!-- <label for="event-upload">Upload CSV:</label>
    <input type="file" name="event-upload" /> -->
    <usecsv-button
      :onData="onData"
      :onClose="onClose"
      importerKey="2b88b88f-ed3a-4fae-8e9d-7dd83203eff8"
    >
      Import CSV
      <!--ModalFunktion hab ich nicht geckeckt -> Workaround mit <details> -->
      <!-- <button class="btn" @click="slotProps.openModal()">Import Data</button> -->
    </usecsv-button>
  </form>

  <details v-if="previewData.length > 0">
    <summary>Daten Vorschau</summary>
    <div>
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
  </details>

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
      previewData: []
    }
  },
  methods: {
    onData: function (data) {
      console.log('Data:', data)
      console.log('Rows: ', data.rows)
      this.previewData = data.rows
    },
    onClose: function () {
      console.log('Importer is closed')
    }
  }
}
</script>

<style scoped></style>
