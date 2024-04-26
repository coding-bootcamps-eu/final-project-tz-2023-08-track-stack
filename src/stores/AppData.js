import { defineStore } from 'pinia'

export const AppData = defineStore('appData', {
  state() {
    return {
      appDatas: []
    }
  }
})
