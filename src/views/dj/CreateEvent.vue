<template>
  <small><active-dj>nicht eingeloggt</active-dj> @ CreateEvent</small>
  <h2>Event erstellen</h2>
  <p>Hier erstellst du deine Veranstaltung</p>
  <form @submit.prevent>
    <div class="grid">
      <label for="event-title">Titel: <input type="text" name="event-title" /></label>
      <label for="event-date">Datum: <input type="text" name="event-date" /></label>
    </div>
    <div class="grid">
      <label for="event-organizer">Veranstalter:<input type="text" name="event-organizer" /></label>
      <label for="event-address">Adresse:<input type="text" name="event-address" /></label>
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
    <input @click="this.$router.push({ path: '/events' })" type="submit" value="Event hinzufügen" />
  </form>
</template>

<script>
import QrCodeGenerator from '@/components/QrCodeGenerator.vue'
import { usePlaylistStore } from '@/stores/PlaylistStore'
import ActiveDj from '@/components/ActiveDj.vue'

export default {
  data() {
    return {
      selectedEventImage: 'Default', // Initial
      selectedPlaylistId: null,
      playlists: []
    }
  },
  components: { ActiveDj, QrCodeGenerator: QrCodeGenerator },
  created() {
    this.fetchPlaylists()
  },
  methods: {
    async fetchPlaylists() {
      await usePlaylistStore().fetchPlaylists()
      this.playlists = usePlaylistStore().playlists
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
    addEvent() {
      // Hier kannst du die Logik zum Hinzufügen des Events implementieren
      console.log('Event hinzugefügt mit Playlist ID:', this.selectedPlaylistId)
      // Beispiel: this.$router.push({ path: '/events' })
    }
  }
}
</script>
