<template>
  <small><active-dj>nicht eingeloggt</active-dj> @ GuestOverview</small>

  <h2>Hallo {{ this.guestData.name }}!</h2>
  <p>
    Hier bist du auf deinem Dashboard. Du kannst dir Wünsche erfüllen oder auf bestehende Wünsche
    deine Stimme abgeben.
  </p>
  <div class="grid">
    <router-link to="/wishsong"><button>Song wünschen</button></router-link>
    <router-link to="/wishlist"><button>Zur Wunschliste</button></router-link>
  </div>
</template>

<script>
import ActiveDj from '@/components/ActiveDj.vue'

export default {
  components: { ActiveDj },
  data() {
    return {
      guestData: null // Hier werden die Daten aus dem Local Storage gespeichert
    }
  },

  created() {
    // Die gespeicherten Daten aus dem Local Storage holen
    this.getGuestDataFromLocalStorage()
  },

  methods: {
    getGuestDataFromLocalStorage() {
      // Versuche, die gespeicherten Daten aus dem Local Storage abzurufen
      const guestDataInLocalStorage = localStorage.getItem('guestData')

      // Überprüfen, ob gespeicherte Daten da sind
      if (guestDataInLocalStorage) {
        // Die gespeicherten Daten in JavaScript-Daten umwandeln
        this.guestData = JSON.parse(guestDataInLocalStorage)
      }
    }
  }
}
</script>
