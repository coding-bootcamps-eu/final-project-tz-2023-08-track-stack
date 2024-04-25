import { defineStore } from 'pinia'

export const AppData = defineStore('appData', {
  state() {
    return {
      appDatas: [],
      tracks: [
        { id: 1, titel: 'Pokemon Theme Song', artist: 'Jason Paige', vote: false },

        { id: 2, titel: 'The Final Countdown', artist: 'Europe', vote: false },

        { id: 3, titel: 'Get Up And Dance', artist: 'Freedom', vote: false }
      ]
    }
  },

  actions: {
    async getApiData() {
      const response = await fetch('http://localhost:3000/appData')
      const apiData = await response.json()

      this.appDatas = apiData
    }
  }
})
