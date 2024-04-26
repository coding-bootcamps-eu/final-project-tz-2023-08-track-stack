<template>
  <small>CreateEvent</small>
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
    <select name="event-playlist">
      <option>Playlist 1</option>
      <option>Playlist 2</option>
      <option>Playlist 3</option>
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

export default {
  data() {
    return {
      selectedEventImage: 'Default' // Initial
    }
  },
  components: { QrCodeGenerator: QrCodeGenerator },

  methods: {
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
