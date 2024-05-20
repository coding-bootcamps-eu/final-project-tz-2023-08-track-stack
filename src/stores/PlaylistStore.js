import { defineStore } from 'pinia'

export const usePlaylistStore = defineStore('playlist', {
  state: () => ({
    playlists: [],
    currentPlaylistId: null,
    currentPlaylist: {
      title: '',
      songs: []
    }
  }),

  actions: {
    setCurrentPlaylistId(playlistId) {
      this.currentPlaylistId = playlistId
      localStorage.setItem('currentPlaylistId', playlistId)
    },

    loadCurrentPlaylistIdFromLocalStorage() {
      const playlistId = localStorage.getItem('currentPlaylistId')
      if (playlistId) {
        this.currentPlaylistId = playlistId
      }
    },

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

    async fetchPlaylist(playlistId) {
      try {
        const response = await fetch(`http://localhost:3000/playlists/${playlistId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch playlist from API')
        }
        this.currentPlaylist = await response.json()
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

        const updatedPlaylist = await response.json()
        this.currentPlaylist = updatedPlaylist
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

        await this.fetchPlaylists()
      } catch (error) {
        console.error(error)
      }
    }
  }
})
