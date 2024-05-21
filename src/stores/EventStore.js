import { defineStore } from 'pinia'

export const useEventStore = defineStore('events', {
  state: () => ({
    events: [], // Hier werden die Event-Daten des activeDjs gespeichert
    eventData: null
  }),

  actions: {
    async fetchAndFilterEvents() {
      try {
        //Die Dj Id (activeDjId) aus dem locale storage holen
        const localStorageDjId = localStorage.getItem('activeDjId')
        if (!localStorageDjId) {
          return // Wenn activeDjId nicht im localStorage vorhanden ist
        }
        const response = await fetch('http://localhost:3000/events')
        if (!response.ok) {
          throw new Error('Failed to fetch events from API')
        }
        const allEvents = await response.json()

        this.events = allEvents.filter((event) => event.djId === localStorageDjId)
      } catch (error) {
        console.error(error)
      }
    },

    setEventDataFromGuestStart(data) {
      this.eventData = data
    },

    async deleteEvent(eventId) {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`, {
          method: 'DELETE'
        })

        if (!response.ok) {
          throw new Error('Failed to delete Event')
        }

        this.events = this.events.filter((event) => event.id !== eventId)
      } catch (error) {
        console.error(error)
      }
    }
  }
})
