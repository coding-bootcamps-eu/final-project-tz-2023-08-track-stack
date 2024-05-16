<template>
  <small><active-dj>nicht eingeloggt</active-dj> @ GuestStart</small>
  <h3>Schön, dass du da bist!</h3>
  <p>
    Herzlich Willkommen bei Hulaloop, die App wo Musikwünsche wahr werden. Gib einfach deinen Namen
    ein und los gehts.
  </p>
  <form @submit.prevent="submitGuestForm">
    <div class="grid">
      <label class="hidden" for="guest-name">Dein Name:</label>
      <input
        type="text"
        name="guest-name"
        id="guest-name"
        :placeholder="placeholderText"
        v-model="inputGuestName"
      />
      <input type="submit" value="Ab geht die Post" />
    </div>
  </form>
</template>

<script>
import ActiveDj from '@/components/ActiveDj.vue'

export default {
  components: { ActiveDj },
  data() {
    return {
      inputGuestName: '',
      placeholderText: 'Dein Name'
    }
  },

  created() {
    // Beim laden der Seite überprüfen, ob Name im Local Storage bereits gespeichert ist
    this.checkIfNameInLocalStorage()
  },

  methods: {
    submitGuestForm() {
      // Überprüfen, ob ein Name eingegeben wurde
      if (this.inputGuestName.trim() !== '') {
        // Vergib eine ID
        const guestId = Date.now()

        // Daten im Local Storage speichern
        const guestData = {
          id: guestId,
          name: this.inputGuestName.trim()
        }
        localStorage.setItem('guestData', JSON.stringify(guestData))

        // Weiter zur guest-overview
        this.$router.push({ path: '/guest-overview' })
      } else {
        alert('Bitte gib deinen Namen ein.')
      }
    },

    // Prüfe, ob ein Name im Local Storage gespeichert ist. Soll zur Absicherung dienen, dass sich der Gast nicht unter verschiedenen Namen einloggen kann.
    checkIfNameInLocalStorage() {
      const guestData = localStorage.getItem('guestData')
      if (guestData) {
        // Wenn Name gespeichert ist, wird Gast sofort zur "guest-overview" weitergeleitet
        this.$router.push({ path: '/guest-overview' })
      }
    },

    getEventIdFromUrl() {
      const currentUrl = window.location.href

      // Dann extrahierst du die Event-ID aus der URL
      //Hier wird nach dem Index gesucht, an dem die Zeichenfolge 'eventId=' in der aktuellen URL vorkommt.
      const eventIdIndex = currentUrl.indexOf('eventId=')
      //Wenn die Zeichenfolge 'eventId=' in der URL gefunden wird (eventIdIndex ist nicht -1), dann wird die Event-ID extrahiert, indem sie aus der URL geschnitten wird. Beachte, dass 8 addiert werden, da 'eventId=' aus 8 Zeichen besteht.
      const eventId = eventIdIndex !== -1 ? currentUrl.slice(eventIdIndex + 8) : null

      // GET-Request an die API senden
      if (eventId) {
        const apiUrl = `http://localhost:3000/events/${eventId}`

        fetch(apiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Fehler beim Abrufen der Event-Daten')
            }
            return response.json()
          })
          .then((eventData) => {
            // Hier erhältst du die Daten des Events
            console.log('Event-Daten:', eventData)
          })
          .catch((error) => {
            console.error('Fehler:', error)
          })
      } else {
        console.error('Event-ID nicht in der URL gefunden')
      }
    }
  }
}
</script>
