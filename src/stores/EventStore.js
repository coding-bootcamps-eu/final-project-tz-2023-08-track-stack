// Importieren der defineStore-Funktion aus dem Pinia-Paket
import { defineStore } from 'pinia'

// Definition des Event Stores mit den Zustandsvariablen und Aktionen
export const useEventStore = defineStore('event', {
  state: () => ({
    events: [], // Hier werden die Event-Daten des activeDjs gespeichert
    currentEvent: null, // Das aktuell bearbeitete Event
    currentEventId: null, // Die ID des aktuell ausgewählten Event
    eventDataForGuest: null // Eventdaten für Gäste (nicht eingeloggte DJs)
  }),

  actions: {
    // Setzt die aktuelle Event-ID und speichert sie im lokalen Speicher
    setCurrentEventId(eventId) {
      this.currentEventId = eventId
      localStorage.setItem('currentEventId', eventId)
    },

    // Lädt die aktuelle Event-ID aus dem lokalen Speicher
    loadCurrentEventIdFromLocalStorage() {
      const eventId = localStorage.getItem('currentEventId')
      if (eventId) {
        this.currentEventId = eventId
      }
    },

    // RETURNS:  all Events from Api
    async fetchAllEvents() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/events`)
        if (!response.ok) {
          throw new Error('Failed to fetch events from API')
        }
        const allEvents = await response.json()
        return allEvents
      } catch (error) {
        console.error(error)
      }
    },
    // Aktion zum Abrufen und Filtern von Events des aktiven DJs
    async fetchAndFilterEvents() {
      try {
        const localStorageDjId = localStorage.getItem('activeDjId')
        if (!localStorageDjId) {
          return // Wenn activeDjId nicht im localStorage vorhanden ist, wird die Funktion beendet
        }
        const response = await fetch(`${import.meta.env.VITE_API_URL}/events`)
        if (!response.ok) {
          throw new Error('Failed to fetch events from API')
        }
        const allEvents = await response.json()
        // Filtern der Events nach der djId des aktiven DJs
        this.events = allEvents.filter((event) => event.djId === localStorageDjId)
      } catch (error) {
        console.error(error)
      }
    },

    // Aktion zum Setzen von Eventdaten für Gäste
    setEventDataFromGuestStart(data) {
      this.eventDataForGuest = data
    },

    // Aktion zum Laden des aktuellen Events aus dem Local Storage
    loadCurrentEventFromLocalStorage() {
      const eventData = localStorage.getItem('eventData')
      if (eventData) {
        this.currentEvent = JSON.parse(eventData)
      }
    },

    // Aktion zum Abrufen eines bestimmten Events aus der API
    async fetchEvent(eventId) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch events from API')
        }
        this.currentEvent = await response.json()
        return this.currentEvent
      } catch (error) {
        console.error(error)
        throw error
      }
    },

    // Aktion zum Aktualisieren eines Events in der API
    async updateEventInApi(eventData) {
      try {
        console.log('Sending data to API:', eventData) // Debugging
        const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${eventData.id}`, {
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

    // Aktion zum Löschen eines Events aus der API
    async deleteEvent(eventId) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}`, {
          method: 'DELETE'
        })

        if (!response.ok) {
          throw new Error('Failed to delete event')
        }

        // Entfernen des gelöschten Events aus der lokalen Events-Liste
        this.events = this.events.filter((event) => event.id !== eventId)
      } catch (error) {
        console.error(error)
      }
    }
  }
})
