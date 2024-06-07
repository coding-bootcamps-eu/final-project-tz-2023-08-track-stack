<template>
  <h3>Schön, dass du da bist!</h3>
  <p v-if="!aktivEvent">
    Das Event hat noch nicht begonnen, oder ist bereits gelöscht.<br />
    Bitte versuche es später nochmal.
  </p>
  <p v-if="aktivEvent">
    Herzlich willkommen bei Hulaloop, die App wo Musikwünsche wahr werden. Gib einfach deinen Namen
    ein und schon gehts los.
  </p>
  <form v-if="aktivEvent" @submit.prevent="submitGuestForm">
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
import { useEventStore } from '@/stores/EventStore'

export default {
  components: {},
  data() {
    return {
      inputGuestName: '',
      placeholderText: 'Dein Name',
      aktivEvent: false
    }
  },

  async created() {
    localStorage.removeItem('currentEventId')
    localStorage.removeItem('activeDjId')

    // Beim laden der Seite überprüfen, ob Name im Local Storage bereits gespeichert ist und die eventId abgreifen und das eventObjekt abrufen.
    await this.getEventDataFromUrl()
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
      if (guestData && this.aktivEvent) {
        // Wenn Name gespeichert ist, wird Gast sofort zur "guest-overview" weitergeleitet
        this.$router.push({ path: '/guest-overview' })
      }
    },

    async getEventDataFromUrl() {
      const currentUrl = window.location.href

      //Extrahiere die Event-ID aus der URL
      //Hier wird nach dem Index gesucht, an dem die Zeichenfolge 'eventId=' in der aktuellen URL vorkommt.
      const eventIdIndex = currentUrl.indexOf('eventId=')

      //Wenn die Zeichenfolge 'eventId=' in der URL gefunden wird (eventIdIndex ist nicht -1), dann wird die Event-ID extrahiert, indem sie aus der URL geschnitten wird. Beachte, dass 8 addiert werden, da 'eventId=' aus 8 Zeichen besteht.
      const eventId = eventIdIndex !== -1 ? currentUrl.slice(eventIdIndex + 8) : null
      console.log('EventID: ' + eventId)

      // GET-Request an die API senden
      if (eventId) {
        const apiUrl = `${import.meta.env.VITE_API_URL}/events/${eventId}`

        //Den Store aufrufen
        const eventStore = useEventStore()

        try {
          const response = await fetch(apiUrl)
          if (!response.ok) {
            throw new Error('Fehler beim Abrufen der Event-Daten')
          }

          const eventData = await response.json()
          const eventAktiv = eventData.active
          this.aktivEvent = eventAktiv
          console.log(this.aktivEvent)

          // Überprüfen, ob das Event aktiv ist
          if (eventData.active) {
            // Die eventData wird an den Store übergeben
            eventStore.setEventDataFromGuestStart(eventData)

            // Ebenfalls werden die eventData im local Storage gespeichert (bleiben persistent)
            localStorage.setItem('eventData', JSON.stringify(eventData))
            console.log('Event-Daten:', eventData)
          } else {
            localStorage.removeItem('eventData')
            this.$swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Dieses Event ist nicht aktiv!'
            })
            // alert('Dieses Event ist nicht aktiv.')
          }
        } catch (error) {
          console.error('Fehler:', error)
        }
      }
    }
  }
}
</script>
