import { defineStore } from 'pinia'

export const useDjStoreLars = defineStore('djLars', {
  state: () => ({
    djs: [], // Daten von der API
    activeDj: null // Hier wird der aktive DJ gespeichert
  }),
  actions: {
    async fetchDjs() {
      try {
        const response = await fetch('http://localhost:3000/users')
        if (!response.ok) {
          throw new Error('Failed to fetch DJs from API')
        }
        const data = await response.json()
        this.djs = data
      } catch (error) {
        console.error(error)
      }
    }
  }
})
