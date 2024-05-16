<template>
  <small><active-dj>nicht eingeloggt</active-dj> @ CreateEvent</small>
  <h2>Event erstellen</h2>
  <p>Hier erstellst du deine Veranstaltung</p>
  <form @submit.prevent="addEvent()">
    <div class="grid">
      <label for="event-title"
        >Titel: <input type="text" name="event-title" v-model="title"
      /></label>
      <label for="event-description"
        >Beschreibung: <input type="text" name="event-description" v-model="description"
      /></label>
      <label for="event-date">Datum: <input type="text" name="event-date" v-model="date" /></label>
    </div>
    <div class="grid">
      <label for="event-organizer"
        >Veranstalter:<input type="text" name="event-organizer" v-model="organizer"
      /></label>
      <label for="event-address"
        >Adresse:<input type="text" name="event-address" v-model="address"
      /></label>
    </div>
    <hr />
    <h4>Playlist</h4>
    <label for="event-playlist">Playlist auswählen:</label>
    <select name="event-playlist" v-model="selectedPlaylistId">
      <option v-for="playlist in playlists" :key="playlist.id" :value="playlist.id">
        {{ playlist.title }}
      </option>
    </select>
    <hr />
    <h4>Veranstaltungsfoto</h4>
    <label for="event-image">Bildmotiv auswählen:</label>
    <fieldset id="event-image">
      <div class="grid">
        <label for="default">
          <input
            type="radio"
            id="default"
            name="event-image-radio"
            value="Default"
            v-model="selectedEventImage"
          />Standardbild
        </label>

        <label for="birthday">
          <input
            type="radio"
            id="birthday"
            name="event-image-radio"
            value="Geburtstag"
            v-model="selectedEventImage"
          />Geburtstag
        </label>

        <label for="marriage">
          <input
            type="radio"
            id="marriage"
            name="event-image-radio"
            value="Hochzeit"
            v-model="selectedEventImage"
          />Hochzeit</label
        >

        <label for="business">
          <input
            type="radio"
            id="business"
            name="event-image-radio"
            value="Firmenfeier"
            v-model="selectedEventImage"
          />Firmenfeier</label
        >
        <label for="festival">
          <input
            type="radio"
            id="festival"
            name="event-image-radio"
            value="Festival"
            v-model="selectedEventImage"
          />Festival</label
        >
      </div>
    </fieldset>
    <div id="event-image">
      <figure>
        <img :src="getImagePath(selectedEventImage)" :alt="selectedEventImage" />
        <figcaption>{{ selectedEventImage }}</figcaption>
      </figure>
    </div>
    <hr />
    <h4>QR Code</h4>
    <QrCodeGenerator />
    <hr />
    <input type="submit" value="Event hinzufügen" />
    <!-- @click="this.$router.push({ path: '/events' })" -->
  </form>
</template>

<script>
import QrCodeGenerator from '@/components/QrCodeGenerator.vue'
import { usePlaylistStore } from '@/stores/PlaylistStore'
import ActiveDj from '@/components/ActiveDj.vue'

export default {
  data() {
    return {
      title: '',
      description: '', //ist für die Api erforderlich
      date: '',
      organizer: '',
      address: '',
      selectedPlaylistId: null,

      playlists: [],

      selectedEventImage: 'Default' // Initial
    }
  },

  components: { ActiveDj, QrCodeGenerator: QrCodeGenerator },

  created() {
    this.fetchPlaylists()
  },

  methods: {
    async fetchPlaylists() {
      //nur Playlists vom eingeloggten (activeDj) Dj anzeigen
      const localStorageDjId = localStorage.getItem('activeDjId')
      if (!localStorageDjId) {
        // Wenn activeDjId nicht im localStorage vorhanden ist
        return
      }

      await usePlaylistStore().fetchPlaylists()

      // Die playlists anhand der localStorageDjId filtern
      this.playlists = usePlaylistStore().playlists.filter(
        (playlist) => playlist.djId === localStorageDjId
      )
    },

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
    },

    async addEvent() {
      // Hier kannst du die Logik zum Hinzufügen des Events implementieren
      try {
        const activeDjId = localStorage.getItem('activeDjId')
        if (!activeDjId) {
          throw new Error('Aktiver DJ nicht festgelegt.')
        }

        const dataToSend = {
          title: this.title,
          description: this.description,
          djId: activeDjId,
          playlistId: this.selectedPlaylistId,
          address: this.address,
          startDate: this.date,
          organizer: this.organizer,
          eventImage: this.selectedEventImage
        }

        const response = await fetch('http://localhost:3000/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
        })

        if (!response.ok) {
          throw new Error('Fehler beim Senden der Daten')
        }
        console.log('Event hinzugefügt mit Playlist ID:', this.selectedPlaylistId)

        // Erfolgreiches Senden der Daten, Weiterleitung zur Events View
        this.$router.push({ path: '/events' })
      } catch (error) {
        console.error('Fehler:', error)
      }
    }
  }
}
</script>
