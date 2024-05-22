<template>
  <small><active-dj>nicht eingeloggt</active-dj> @ EditEvent</small>
  <h2 v-if="event">
    Event <strong>{{ event.title }}</strong> bearbeiten
  </h2>

  <p v-if="event">Hier erstellst du deine Veranstaltung</p>
  <form v-if="event" @submit.prevent="updateEvent">
    <div class="grid">
      <label for="event-title">
        Titel:
        <input type="text" name="event-title" v-model="event.title" />
      </label>
      <label for="event-date">
        Datum:
        <input
          type="datetime-local"
          name="event-date"
          v-model="event.startDate"
          aria-label="Datetime local"
        />
      </label>
    </div>
    <div class="grid">
      <label for="event-organizer">
        Veranstalter:
        <input type="text" name="event-organizer" v-model="event.organizer" />
      </label>
      <label for="event-address">
        Veranstaltungsort:
        <input type="text" name="event-address" v-model="event.address" />
      </label>
      <label for="event-description"
        >Beschreibung: <input type="text" name="event-description" v-model="event.description"
      /></label>
    </div>

    <label for="event-playlist">
      Playlist:
      <select name="event-playlist" v-model="event.playlistId">
        <option v-for="playlist in playlists" :key="playlist.id" :value="playlist.id">
          {{ playlist.title }}
        </option>
      </select>
    </label>
    <hr />
    <h4>Veranstaltungsfoto</h4>
    <label for="event-image">Bildmotiv auswählen:</label>
    <fieldset id="event-image">
      <div class="grid">
        <label for="birthday">
          <input
            type="radio"
            id="birthday"
            name="event-image-radio"
            value="Geburtstag"
            v-model="event.eventImage"
          />Geburtstag
        </label>

        <label for="marriage">
          <input
            type="radio"
            id="marriage"
            name="event-image-radio"
            value="Hochzeit"
            v-model="event.eventImage"
          />Hochzeit
        </label>

        <label for="business">
          <input
            type="radio"
            id="business"
            name="event-image-radio"
            value="Firmenfeier"
            v-model="event.eventImage"
          />Firmenfeier
        </label>

        <label for="festival">
          <input
            type="radio"
            id="festival"
            name="event-image-radio"
            value="Festival"
            v-model="event.eventImage"
          />Festival
        </label>
      </div>
    </fieldset>
    <div id="event-image">
      <figure>
        <img :src="getImagePath(event.eventImage)" :alt="event.eventImage" />
        <figcaption>{{ event.eventImage }}</figcaption>
      </figure>
    </div>
    <hr />
    <h4>QR Code</h4>
    <!-- eventId als Prop übergeben -->
    <QrCodeGenerator2 :eventId="eventId" />

    <hr />
    <div class="grid">
      <input type="submit" value="Event aktualisieren" />
      <router-link to="/events"><button class="contrast">zurück</button></router-link>
    </div>
  </form>
  <p v-else>Loading...</p>
</template>

<script>
// Importieren der benötigten Komponenten und Stores
import QrCodeGenerator2 from '@/components/QrCodeGenerator2.vue'
import ActiveDj from '@/components/ActiveDj.vue'
import { useEventStore } from '@/stores/EventStore'

export default {
  components: { ActiveDj, QrCodeGenerator2 }, // Registrieren der Komponenten ActiveDj und QrCodeGenerator2

  computed: {
    // Berechnete Eigenschaft, um das aktuelle Event aus dem Store zu erhalten
    event() {
      const eventStore = useEventStore()
      return eventStore.currentEvent
    }
  },

  async created() {
    // Laden des aktuellen Events aus dem Local Storage beim Erstellen der Komponente
    const eventStore = useEventStore()
    eventStore.loadCurrentEventFromLocalStorage()

    // Laden der Playlists aus der API
    await this.loadPlaylists()
  },

  data() {
    return {
      // Array für die Playlists
      playlists: []
    }
  },

  methods: {
    // Methode zum Laden der Playlists aus der API
    async loadPlaylists() {
      try {
        const response = await fetch('http://localhost:3000/playlists')
        if (!response.ok) {
          throw new Error('Failed to fetch playlists from API')
        }
        this.playlists = await response.json()
      } catch (error) {
        console.error('Fehler beim Laden der Playlists:', error)
      }
    },

    // Methode zum Aktualisieren des Events
    async updateEvent() {
      try {
        // Speichern der Eventdaten im Local Storage
        localStorage.setItem('eventData', JSON.stringify(this.event))

        const eventStore = useEventStore()

        // Aktualisieren des eventImage-Attributs entsprechend
        this.event.eventImage = this.getImagePath(this.event.eventImage)

        // Aktualisieren des Events in der API
        await eventStore.updateEventInApi(this.event)

        // Anzeigen einer Erfolgsmeldung und Weiterleitung zur Eventliste
        alert('Event erfolgreich aktualisiert')
        this.$router.push({ path: '/events' })
      } catch (error) {
        console.error('Fehler beim Aktualisieren des Events:', error)
        alert('Fehler beim Aktualisieren des Events')
      }
    },

    // Methode zum Abrufen des Bildpfads basierend auf dem Veranstaltungsmotiv
    getImagePath(image) {
      switch (image) {
        case 'Geburtstag':
          return '/images/header_birthday.jpg'
        case 'Hochzeit':
          return '/images/header_marriage.jpg'
        case 'Firmenfeier':
          return '/images/header_business.jpg'
        case 'Festival':
          return '/images/header_festival.jpg'
        default:
          return '/images/header_default.jpg'
      }
    }
  }
}
</script>
