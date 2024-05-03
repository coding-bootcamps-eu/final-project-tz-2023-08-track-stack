<template>
  <label for="event-upload">CSV Upload:</label>
  <input type="file" name="event-upload" accept=".csv" @change="handleFileUpload" />
</template>

<script>
export default {
  name: 'FileReaderCsv',
  emits: ['csv-data-uploaded'],
  methods: {
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
        //emit to parent
        this.$emit('csv-data-uploaded', arrayData)
      }

      reader.readAsText(file)
    }
  }
}
</script>
