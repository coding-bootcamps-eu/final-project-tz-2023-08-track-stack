import { defineStore } from 'pinia'

export const useDjStore = defineStore('dj', {
  state: () => ({
    djs: ['martin', 'irina', 'lars'],
    activeDj: ''
  }),
  //================================
  // get Information from the state
  getters: {
    // Anzahl der Djs, quasi unsere Registrierten Nutzer
    getDjCount(state) {
      return state.djs.length
    },
    // Dj who is logged in
    getActiveDj(state) {
      return state.activeDj
    }
  },
  //================================
  // change the state with actions
  actions: {
    //add a new Dj zb. 'Ferdi'
    addDj(newDj) {
      this.djs.push(newDj)
    },
    //überschreibt Djs mit den ApiDaten
    setAllDjsFromApi(apiDjs) {
      this.djs = apiDjs
    },

    //setzte einen eingeloggten Dj
    setActiveDj(dj) {
      this.activeDj = dj
    }
  }
})

// TODOs

//Pinistore füttern:
//  registrierte DJs
