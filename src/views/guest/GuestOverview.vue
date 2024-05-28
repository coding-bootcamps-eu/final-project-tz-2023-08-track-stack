<template>
  <h2>Hallo {{ this.guestData.name }}!</h2>
  <p>
    Hier bist du auf deinem Dashboard. Du kannst dir Wünsche erfüllen oder auf bestehende Wünsche
    deine Stimme abgeben.
  </p>
  <article>
    <h3>{{ eventData.title }}</h3>
    <section class="grid twothree">
      <img :src="this.eventData.eventImage" alt="event-image" />
      <div v-if="eventData">
        <table>
          <tbody>
            <tr>
              <td><strong>Beschreibung</strong></td>
              <td>{{ eventData.description }}</td>
            </tr>
            <tr>
              <td><strong>Datum</strong></td>
              <td>{{ eventData.startDate }}</td>
            </tr>
            <tr>
              <td><strong>Veranstalter</strong></td>
              <td>{{ eventData.organizer }}</td>
            </tr>
            <tr>
              <td><strong>Adresse</strong></td>
              <td>{{ eventData.address }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </article>
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
    this.loadGuestDataFromLocalStorage(), this.loadEventDataFromLocalStorage()
  },

  computed: {
    //Die Event Daten aus dem Store holen, nachdem Gast weitergeleitet wurde
    eventData() {
      const eventStore = useEventStore()
      return eventStore.eventDataForGuest
    }
  },

  methods: {
    loadGuestDataFromLocalStorage() {
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
<style scoped>
.grid.twothree {
  grid-template-columns: 1fr 3fr;
}
</style>
