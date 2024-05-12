import { defineStore } from 'pinia'

export const useDjStore = defineStore('dj', {
  state: () => ({
    djs: [], // leeres Array wird mit fetchDjs befüllt
    activeDjId: null // Standardwert auf null setzen
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
    async setActiveDj(id) {
      try {
        const response = await fetch(`http://localhost:3000/users/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch active DJ from API')
        }
        const data = await response.json()
        this.activeDjId = data.id
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
      } else {
        // Setzen Sie den Standardwert basierend auf Ihrer Anwendungslogik
        this.activeDjId = null
      }
    }
  }
})
