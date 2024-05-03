import { defineStore } from 'pinia'

export const AppData = defineStore('appData', {
  state() {
    return {
      apiData: []
    }
  },

  // getters: {
  //   // e.g. filter for logged in DJs
  //   djLoggedIn() {
  //     return this.apiData.djs.filter((dj) => dj.djLoggedin)
  //   },

  //   // e.g. show the total of playlists
  //   totalPlaylists() {
  //     return this.apiData.playlists.length
  //   }
  // },

  actions: {
    // fetch the API to get the data
    async getApiData() {
      const res = await fetch('http://localhost:3000/users')
      this.apiData = await res.json()
    }

    // addSong(song) {
    //   this.apiData.playlists.push(song)
    // }
  }
})
