import { defineStore } from 'pinia'

export const useDjStore = defineStore('dj', {
  state: () => ({
    regDjs: ['martin', 'irina', 'lars'],
    activeDj: { name: '_', id: '_' }
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
      return state.activeDj.name
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
    setActiveDj(djName) {
      this.activeDj.name = djName
      console.log('activeDJ-NAME:' + this.activeDj.name)
      console.log('activeDJ-ID:' + this.activeDj.id)
      //HIER MUSS VLLT NOCH REST REIN?
    },

    resetActiveDj() {
      this.activeDj = { name: '', id: '' } // Setze den activeDj zurück
      console.log('resetingActiveDJ:' + this.activeDj)
    }
  }
})

// TODOs

//Pinistore füttern:

//IDEE: Active DJ
// VOLLSTÄNDIG holen von api-> zugreifbar machen-> zugriff ID/name/email/....
// brauchen ja nicht die daten von jedem!
// activeDj wird Objekt!
