import { defineStore } from 'pinia'

export const PlaylistStore = defineStore('playlistStore', {
  state() {
    return {
      apiTracks: [],
      tracks: [
        { id: 1, titel: 'Pokemon Theme Song', artist: 'Jason Paige', vote: false },

        { id: 2, titel: 'The Final Countdown', artist: 'Europe', vote: false },

        { id: 3, titel: 'Get Up And Dance', artist: 'Freedom', vote: false }
      ]
    }
  }

  // actions: {
  //   async getApiTracks() {
  //     const response = await fetch('http://.../tracks')
  //     const apiDataTracks = await response.json()

  //     this.apiTracks = apiDataTracks
  //   }
  // }
})
