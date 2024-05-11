import { defineStore } from 'pinia'

export const usePlaylistStore = defineStore('events', {
  state: () => ({
    events: [] // Hier werden die Playlist-Daten gespeichert
  }),

  actions: {
    async fetchEvents() {
      try {
        const response = await fetch('http://localhost:3000/events')
        if (!response.ok) {
          throw new Error('Failed to fetch events from API')
        }
        this.playlists = await response.json()
      } catch (error) {
        console.error(error)
      }
    }
  }
})
