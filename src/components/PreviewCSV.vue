<!-- Im Parent CSV Daten an :previewData übergeben  <PreviewCSV :previewData="csvData"></PreviewCSV> -->
<template>
  <details v-if="previewData.length > 0" class="preview-details">
    <summary role="button" class="outline contrast summary">Vorschau anzeigen</summary>
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
  padding: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 2rem;
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
  border: 1px solid var(--pico-primary-background);
  padding: 8px;
  text-align: left;
}

.preview-table th {
  background-color: var(--pico-primary-background);
  color: var(--pico-primary-inverse);
}
</style>

<!-- Todo -->

<!-- //mapping -->
