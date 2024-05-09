import { defineStore } from 'pinia'

export const useDjStore = defineStore('dj', {
  state: () => ({
    regDjs: ['martin', 'irina', 'lars'], // Alle Registrierten Djs
    activeDj: {
      username: '',
      id: '',
      djname: '',
      email: '',
      phone: '',
      createdAt: Number
    },
    playlists: [] //{ id: '', eventId: '', userId: '', titel: '', songs: [] }
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
      return state.activeDj.username
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
    setActiveDj(username) {
      this.activeDj.username = username
      this.activeDj.id = 'fakeID'
      this.activeDj.djname = 'fakeName'

      //Waaa sorry lars, glaub ich grätsche hier grad voll rein :D
      //HIER MUSS VLLT NOCH REST REIN?
    },

    resetActiveDj() {
      this.activeDj = { username: '', id: '' } // Setze den activeDj zurück
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
