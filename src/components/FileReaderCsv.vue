<template>
  <label for="event-upload"
    >CSV Upload: <span class="required">*</span>
    <input
      type="file"
      name="event-upload"
      required="required"
      accept=".csv"
      @change="handleFileUpload"
  /></label>
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

        // Entferne das "\r" am Ende jeder Zeile
        const cleanedContent = fileContent.replace(/\r$/, '')
        // hole Zeilen
        const lines = cleanedContent.split('\n')
        // filtere leere Zeilen heraus
        const nonEmptyLines = lines.filter((line) => line.trim() !== '')
        // identifiziere das Trennzeichen
        const separator = this.identifySeparator(nonEmptyLines[0])
        // trenne an identifiziertem Trennzeichen
        const arrayData = nonEmptyLines.map((line) => this.splitLine(line, separator))
        // Array to Obj
        const dataAsObjects = arrayData.slice(1).map((row) => {
          return {
            artist: row[1] ? row[1] : '', // Der zweite Wert in der Zeile ist der Künstler
            title: row[0] ? row[0] : '' // Der erste Wert in der Zeile ist der Titel
          }
        })

        //console.log('ArrayDatenCSV:', arrayData)
        //console.log('ObjDatenCSV:', dataAsObjects)

        //emit to parent als Array und als Obj
        this.$emit('csv-data-uploaded', arrayData, dataAsObjects)
      }

      reader.readAsText(file)
    },
    identifySeparator(line) {
      // identifiziere das Trennzeichen basierend auf der ersten Zeile
      if (line.includes('","')) {
        return ','
      } else if (line.includes('";"')) {
        return ';'
      } else {
        return line.includes(',') ? ',' : ';'
      }
    },
    splitLine(line, separator) {
      // Trenne an identifiziertem Trennzeichen, beachte Anführungszeichen
      const parts = []
      let currentPart = ''
      let inQuotes = false

      for (let i = 0; i < line.length; i++) {
        const char = line[i]
        if (char === '"') {
          inQuotes = !inQuotes
        } else if (char === separator && !inQuotes) {
          parts.push(currentPart)
          currentPart = ''
        } else if (char === '\r') {
          // Ignoriere \r-Zeichen
          continue
        } else {
          currentPart += char
        }
      }

      parts.push(currentPart)

      // Falls nur ein Teil vorhanden ist und das Trennzeichen nicht gefunden wurde
      if (parts.length === 1 && !line.includes(separator)) {
        // Teilung erzwingen
        parts.push('')
      }

      return parts
    }
  }
}
</script>
