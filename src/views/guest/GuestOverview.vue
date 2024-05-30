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
              <td><strong>Datum / Uhrzeit</strong></td>
              <td>{{ formatDateTime(eventData.startDate) }}</td>
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
    <router-link to="/wishsong"
      ><button><i class="si-gift"></i> Song wünschen</button></router-link
    >
    <router-link to="/guest-edit-profile"
      ><button><i class="si-pencil"></i> Profil ändern</button></router-link
    >
    <router-link to="/wishlist"
      ><button><i class="si-server"></i> Zur Wunschliste</button></router-link
    >
  </div>
</template>

<script>
import { useEventStore } from '@/stores/EventStore'

export default {
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
    },
    formatDateTime(dateTime) {
      const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }
      const date = new Date(dateTime)
      return `${date.toLocaleDateString('de-DE', options).replace(',', ' um')} Uhr`
    }
  }
}
</script>
<style scoped>
.grid.twothree {
  grid-template-columns: 1fr 3fr;
}
</style>
