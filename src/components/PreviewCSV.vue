<template>
  <details v-if="previewData.length > 0" class="preview-details">
    <summary role="button" class="outline contrast summary">Vorschau anzeigen</summary>
    <div class="preview-table-container">
      <table class="preview-table">
        <thead>
          <tr>
            <th
              v-for="(header, headerIndex) in headers.length > 0 ? headers : previewData[0]"
              :key="headerIndex"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in headers.length > 0 ? previewData : previewData.slice(1)"
            :key="rowIndex"
          >
            <td v-for="(cell, cellIndex) in row" :key="cellIndex">
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </details>
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
  transition: background-color 0.3s ease;
}

.preview-details:focus {
  outline: none;
  box-shadow:
    0 0 0 2px #ffffff,
    0 0 0 4px #4caf50;
}

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
