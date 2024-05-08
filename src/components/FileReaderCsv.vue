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
        //console.log('Dateiinhalt:', fileContent)

        // Verarbeite den Dateiinhalt hier weiter

        // hole Zeilen
        const lines = fileContent.split('\n')
        // filtere leere Zeilen heraus
        const nonEmptyLines = lines.filter((line) => line.trim() !== '')
        // trenne an Kommas
        const arrayData = nonEmptyLines.map((line) => line.split(','))

        // Array to Obj
        const dataAsObjects = arrayData.slice(1).map((row) => {
          return {
            Titel: row[0], // Der erste Wert in der Zeile ist der Titel
            Künstler: row[1] // Der zweite Wert in der Zeile ist der Künstler
          }
        })

        //console.log('ArrayDatenCSV:', arrayData)
        //console.log('ObjDatenCSV:', dataAsObjects)

        //emit to parent als Array und als Obj
        this.$emit('csv-data-uploaded', arrayData, dataAsObjects)
      }

      reader.readAsText(file)
    }
  }
}
</script>
