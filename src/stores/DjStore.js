import { defineStore } from 'pinia'

export const useDjStore = defineStore('dj', {
  state: () => ({
    regDjs: ['martin', 'irina', 'lars'],
    activeDj: { login: '', id: '' }
  }),
  //================================
  // get Information from the state
  getters: {
    // Anzahl der Djs, quasi unsere Registrierten Nutzer
    getDjCount(state) {
      return state.regDjs.length
    },
    // Dj who is logged in
    getActiveDj(state) {
      return state.activeDj.login
    }
  },
  //================================
  // change the state with actions
  actions: {
    //add a new Dj zb. 'Ferdi'
    addDj(newDj) {
      this.regDjs.push(newDj)
    },
    //überschreibt Djs mit den ApiDaten
    setAllDjsFromApi(apiDjs) {
      this.regDjs = apiDjs
    },

    //setzte einen eingeloggten Dj
    setActiveDj(login) {
      this.activeDj.login = login
      // console.log('activeDJ-login:' + this.activeDj.login)
      // console.log('activeDJ-ID:' + this.activeDj.id)
      //HIER MUSS VLLT NOCH REST REIN?
    },

    resetActiveDj() {
      this.activeDj = { login: '', id: '' } // Setze den activeDj zurück
      console.log('reset ActiveDJ')
      // console.log('resetingActiveDJ:' + this.activeDj)
    }
  }
})

// TODOs

//Pinistore füttern:

//IDEE: Active DJ
// VOLLSTÄNDIG holen von api-> zugreifbar machen-> zugriff ID/login/email/....
// brauchen ja nicht die daten von jedem!
