import { defineStore } from 'pinia'

export const useEventStore = defineStore('event', {
  state: () => ({
    events: [], // Hier werden die Event-Daten des activeDjs gespeichert
    currentEvent: null,
    eventDataForGuest: null
  }),

  actions: {
    async fetchAndFilterEvents() {
      try {
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
      this.eventDataForGuest = data
    },

    loadCurrentEventFromLocalStorage() {
      const eventData = localStorage.getItem('eventData')
      if (eventData) {
        this.currentEvent = JSON.parse(eventData)
      }
    },

    async fetchEvent(eventId) {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch events from API')
        }
        this.currentEvent = await response.json()
      } catch (error) {
        console.error(error)
        throw error
      }
    },

    async updateEventInApi(eventData) {
      try {
        console.log('Sending data to API:', eventData) // Debugging
        const response = await fetch(`http://localhost:3000/events/${eventData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(eventData)
        })

        if (!response.ok) {
          const errorDetails = await response.text()
          throw new Error(`Failed to update event in API: ${errorDetails}`)
        }

        const updatedEvent = await response.json()
        this.currentEvent = updatedEvent
        return updatedEvent
      } catch (error) {
        console.error('Error updating event in API:', error)
        throw error
      }
    },

    async deleteEvent(eventId) {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`, {
          method: 'DELETE'
        })

        if (!response.ok) {
          throw new Error('Failed to delete event')
        }

        this.events = this.events.filter((event) => event.id !== eventId)
      } catch (error) {
        console.error(error)
      }
    }
  }
})
