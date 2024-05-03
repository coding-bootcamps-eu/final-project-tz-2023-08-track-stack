<!-- Im Parent CSV Daten an :previewData übergeben  <PreviewCSV :previewData="csvData"></PreviewCSV> -->
<template>
  <details v-if="previewData.length > 0" class="preview-details">
    <summary class="summary">Daten Vorschau</summary>
    <div class="preview-table-container">
      <table class="preview-table">
        <thead>
          <tr>
            <th v-for="(column, columnIndex) in previewData[0]" :key="columnIndex">{{ column }}</th>
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
  <!-- <div v-else>
    <p></p>
  </div> -->
</template>

<script>
export default {
  name: 'PreviewCSV',
  props: {
    previewData: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.preview-details {
  /* display: inline-block; Ändert das Anzeigeverhalten zu inline-block */
  /* cursor: pointer; Zeige den Cursor als Zeiger an */
  padding: 8px 16px; /* Abstand oben/unten 8px, links/rechts 16px */
  border: none; /* Kein Rahmen */
  border-radius: 4px; /* Abrundung der Ecken */
  background-color: #151f16; /* Hintergrundfarbe */
  color: white; /* Textfarbe */
  transition: background-color 0.3s ease; /* Übergangseffekt für Hintergrundfarbe */
}

/* Styling für das <details>-Element bei Hover */
/* .preview-details:hover {
  background-color: #45a049; Dunklere Hintergrundfarbe bei Hover
} */

/* Styling für das <details>-Element bei Focus */
.preview-details:focus {
  outline: none; /* Entferne den Standard-Umriss */
  box-shadow:
    0 0 0 2px #ffffff,
    0 0 0 4px #4caf50; /* Hervorhebungseffekt */
}

/* Entfernen des standardmäßigen Pfeilsymbols */
/* summary::-webkit-details-marker {
  display: none;
} */
.preview-details {
  margin-bottom: 10px;
}

.summary {
  font-weight: bold;
  cursor: pointer;
}

.summary::-webkit-details-marker {
  display: none;
}

.preview-table-container {
  overflow-x: auto;
}

.preview-table {
  width: 100%;
  border-collapse: collapse;
}

.preview-table th,
.preview-table td {
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
}

.preview-table th {
  background-color: #363636;
}
</style>

<!-- Todo -->

<!-- //mapping -->
