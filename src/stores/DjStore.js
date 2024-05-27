import { defineStore } from 'pinia'

export const useDjStore = defineStore('dj', {
  state: () => ({
    djs: [], // leeres Array wird mit fetchDjs befüllt
    activeDjId: null, // Standardwert auf null setzen
    activeDj: null, // der Aktive User
    updateData: {} // Userdaten zum Updaten @updateUserData(), Daten von @EditProfil
  }),

  actions: {
    // hole alle DJs aus der Api in den State
    async fetchDjs() {
      try {
        const response = await fetch('http://localhost:3000/users')
        if (!response.ok) {
          throw new Error('Failed to fetch DJs from API')
        }
        const data = await response.json()
        this.djs = data
      } catch (error) {
        console.error(error)
      }
    },
    // lade einen bestimmten DJ aus der Api in den State
    async fetchDj(id) {
      try {
        const response = await fetch(`http://localhost:3000/users/${id}`)
        if (!response.ok) {
          throw new Error('Fehler beim Abrufen des aktiven DJs von der API')
        }
        const data = await response.json()
        this.activeDj = data
        // console.log('dj: ', data)
      } catch (error) {
        console.error(error)
        console.error('Fehler beim Festlegen des aktiven DJs:', error)
      }
    },

    // lade die aktive DJ-ID aus dem LocalStorage
    loadActiveDjIdFromLocalStorage() {
      const activeDjId = localStorage.getItem('activeDjId')
      if (activeDjId) {
        this.activeDjId = activeDjId
      }
    },
    // lade den activDj in den PiniaStore, über die Id aus dem localStorage
    async fetchActiveDj() {
      const activeDjId = localStorage.getItem('activeDjId')

      if (!activeDjId) {
        return {} // Wenn kein activeDjId vorhanden ist, leeres Objekt zurückgeben
      }

      await this.fetchDj(activeDjId)
    },

    // Update den ActiveDj
    async updateUserData() {
      console.log('UpdateData: ', this.updateData)
      if (this.activeDj.id) {
        const url = 'http://localhost:3000/users/' + this.activeDj.id

        //Data to Update/Send
        const data = this.updateData
        //Was wenn nicht alles ausgefüllt? Dann Autocomplete || V-model mit Daten

        try {
          const response = await fetch(url, {
            method: 'PUT', // Verwende die PUT-Methode für Aktualisierungen
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // Konvertiere das Datenobjekt in JSON
          })
          if (!response.ok) {
            throw new Error('Error @ Update Request')
          }

          const responseData = await response.json()
          console.log('Update erfolgreich:', responseData) // UpdateNachricht
        } catch (error) {
          console.error('Fehler beim Update:', error) //Ausgabe Fehler
        }
      } else {
        console.error('Update fehlgeschlagen: Kein Aktiver Dj gefunden!')
      }
    }
  }
})
