<!-- Im Parent CSV Daten an :previewData übergeben  <PreviewCSV :previewData="csvData"></PreviewCSV> -->
<template>
  <details v-if="previewData">
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

<!-- //mapping -->
