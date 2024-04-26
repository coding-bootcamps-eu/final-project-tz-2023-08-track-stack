import { defineStore } from 'pinia'

export const AppData = defineStore('appData', {
  state() {
    return {
      apiData: []
    }
  },

  actions: {
    async getApiData() {
      const res = await fetch('http://localhost:3000/apiData')
      this.apiData = await res.json()
    }
  }
})
