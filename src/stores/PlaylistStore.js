// PlaylistStore.js

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
        const playlists = await response.json()
        this.playlists = playlists
      } catch (error) {
        console.error(error)
      }
    },

    async fetchPlaylist(djId) {
      try {
        const response = await fetch(`http://localhost:3000/playlists/${djId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch playlist from API')
        }
        return await response.json()
      } catch (error) {
        console.error(error)
        throw error
      }
    },

    async updatePlaylistInApi(playlistData) {
      try {
        const response = await fetch(`http://localhost:3000/playlists/${playlistData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(playlistData)
        })

        if (!response.ok) {
          throw new Error('Failed to update playlist in API')
        }

        // Annahme: Die API antwortet mit den aktualisierten Playlist-Daten
        const updatedPlaylist = await response.json()

        // Hier könntest du die aktualisierte Playlist in den lokalen State aktualisieren, falls erforderlich

        return updatedPlaylist
      } catch (error) {
        console.error(error)
        throw error
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
    },

    async createPlaylist(playlistData) {
      try {
        const response = await fetch('http://localhost:3000/playlists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(playlistData)
        })

        if (!response.ok) {
          throw new Error('Failed to create playlist')
        }

        // Fetch playlists again to update the local state
        await this.fetchPlaylists()
      } catch (error) {
        console.error(error)
      }
    }
  }
})
