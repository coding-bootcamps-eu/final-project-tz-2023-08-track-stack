<template>
  <img :src="this.eventData.eventImage" alt="" />
  <small><active-dj>nicht eingeloggt</active-dj> @ GuestOverview</small>

  <h2>Hallo {{ this.guestData.name }}!</h2>
  <p>
    Hier bist du auf deinem Dashboard. Du kannst dir Wünsche erfüllen oder auf bestehende Wünsche
    deine Stimme abgeben.
  </p>

  <div v-if="eventData">
    <h3>Event Details</h3>
    <p>Title: {{ eventData.title }}</p>
    <p>Veranstalter: {{ eventData.organizer }}</p>
    <p>Datum: {{ eventData.startDate }}</p>
    <p>Adresse: {{ eventData.address }}</p>
    <p>Information: {{ eventData.description }}</p>
  </div>

  <div class="grid">
    <router-link to="/wishsong"><button>Song wünschen</button></router-link>
    <router-link to="/wishlist"><button>Zur Wunschliste</button></router-link>
  </div>
</template>

<script>
import ActiveDj from '@/components/ActiveDj.vue'
import { useEventStore } from '@/stores/EventStore'

export default {
  components: { ActiveDj },
  data() {
    return {
      guestData: null // Hier werden die Daten aus dem Local Storage gespeichert
    }
  },

  created() {
    // Die gespeicherten Daten aus dem Local Storage holen
    this.getGuestDataFromLocalStorage(), this.loadEventDataFromLocalStorage()
  },

  computed: {
    //Die Event Daten aus dem Store holen, nachdem Gast weitergeleitet wurde
    eventData() {
      const eventStore = useEventStore()
      return eventStore.eventDataForGuest
    }
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
    },

    loadEventDataFromLocalStorage() {
      //Event Daten auch aus dem local Storage holen, damit wenn Seite reloadet wird die Daten bestehen bleiben
      const eventDataFromLocalStorage = localStorage.getItem('eventData')
      if (eventDataFromLocalStorage) {
        const eventStore = useEventStore()

        eventStore.setEventDataFromGuestStart(JSON.parse(eventDataFromLocalStorage))
      }
    }
  }
}
</script>
