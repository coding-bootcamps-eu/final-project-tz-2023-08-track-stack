import { defineStore } from 'pinia'

export const usePlaylistStore = defineStore('playlist', {
  state: () => ({
    playlists: [] // Hier werden die Playlist-Daten gespeichert
  }),

  actions: {
    async fetchPlaylists() {
      try {
        const response = await fetch('http://localhost:3000/playlists')
        if (!response.ok) {
          throw new Error('Failed to fetch playlists from API')
        }
        const data = await response.json()
        this.playlists = data
      } catch (error) {
        console.error(error)
      }
    },

    async deletePlaylist(playlistId) {
      try {
        const response = await fetch(`http://localhost:3000/playlists/${playlistId}`, {
          method: 'DELETE'
        })

        if (!response.ok) {
          throw new Error('Failed to delete playlist')
        }

        // Remove the deleted playlist from the local state
        this.playlists = this.playlists.filter((playlist) => playlist.id !== playlistId)
      } catch (error) {
        console.error(error)
      }
    }
  }
})
