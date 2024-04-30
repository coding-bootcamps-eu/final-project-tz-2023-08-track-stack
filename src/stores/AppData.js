import { defineStore } from 'pinia'

export const AppData = defineStore('appData', {
  state() {
    return {
      apiData: []
    }
  },

  // z.B: eingeloggten Dj bekommen
  getters: {
    djLoggedIn() {
      return this.apiData.djs.filter((t) => t.djLoggedin)
    }
  },

  actions: {
    async getApiData() {
      const res = await fetch('http://localhost:3000/apiData')
      this.apiData = await res.json()
    }
  }
})

export default {
  props: ['data']
}
