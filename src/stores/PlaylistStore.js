import { defineStore } from 'pinia'

// Definiere einen neuen Pinia Store namens 'playlist'
export const usePlaylistStore = defineStore('playlist', {
  // Definiere den Zustand (state) des Stores
  state: () => ({
    playlists: [], // Eine Liste von Playlists
    currentPlaylistId: null, // Die ID der aktuell ausgewählten Playlist
    currentPlaylist: {
      // Die Daten der aktuell ausgewählten Playlist
      title: '', // Der Titel der aktuellen Playlist
      songs: [] // Die Liste von Songs in der aktuellen Playlist
    }
  }),

  // Definiere Aktionen (actions) des Stores
  actions: {
    // Setzt die aktuelle Playlist-ID und speichert sie im lokalen Speicher
    setCurrentPlaylistId(playlistId) {
      this.currentPlaylistId = playlistId
      localStorage.setItem('currentPlaylistId', playlistId)
    },

    // Lädt die aktuelle Playlist-ID aus dem lokalen Speicher
    loadCurrentPlaylistIdFromLocalStorage() {
      const playlistId = localStorage.getItem('currentPlaylistId')
      if (playlistId) {
        this.currentPlaylistId = playlistId
      }
    },

    // Holt alle Playlists vom API-Server
    async fetchPlaylists() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/playlists`)
        if (!response.ok) {
          throw new Error('Failed to fetch playlists from API')
        }
        const playlists = await response.json()
        this.playlists = playlists
      } catch (error) {
        console.error(error)
      }
    },
    async fetchPlaylistsForLocalStoredDJ() {
      const localStorageDjId = localStorage.getItem('activeDjId')
      if (!localStorageDjId) {
        // Wenn activeDjId nicht im localStorage vorhanden ist
        return
      }
      await usePlaylistStore().fetchPlaylists()
      //nur Playlists vom eingeloggten (activeDj) Dj anzeigen
      // Die playlists anhand der localStorageDjId filtern
      this.playlists = usePlaylistStore().playlists.filter(
        (playlist) => playlist.djId === localStorageDjId
      )
    },

    // Holt eine spezifische Playlist vom API-Server anhand der Playlist-ID
    async fetchPlaylist(playlistId) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/playlists/${playlistId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch playlist from API')
        }
        this.currentPlaylist = await response.json()
      } catch (error) {
        console.error(error)
        throw error
      }
    },

    // Aktualisiert eine Playlist im API-Server
    async updatePlaylistInApi(playlistData) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/playlists/${playlistData.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(playlistData)
          }
        )

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

    // Löscht eine Playlist vom API-Server anhand der Playlist-ID
    async deletePlaylist(playlistId) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/playlists/${playlistId}`, {
          method: 'DELETE'
        })

        if (!response.ok) {
          throw new Error('Failed to delete playlist')
        }

        // Entfernt die gelöschte Playlist aus der lokalen Liste der Playlists
        this.playlists = this.playlists.filter((playlist) => playlist.id !== playlistId)
      } catch (error) {
        console.error(error)
      }
    },

    // Erstellt eine neue Playlist im API-Server
    async createPlaylist(playlistData) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/playlists`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(playlistData)
        })

        if (!response.ok) {
          throw new Error('Failed to create playlist')
        }

        // Aktualisiert die lokale Liste der Playlists nach dem Erstellen einer neuen Playlist
        await this.fetchPlaylists()
      } catch (error) {
        console.error(error)
      }
    }
  }
})
