<template>
  <active-dj class="menu">nicht eingeloggt</active-dj>
  <h2>Event erstellen</h2>
  <p>Hier erstellst du deine Veranstaltung</p>
  <form @submit.prevent="addEvent()">
    <div class="grid">
      <label for="event-title"
        >Titel: <span class="required">*</span>
        <input type="text" name="event-title" required="required" v-model="title"
      /></label>
      <label for="event-date"
        >Datum / Uhrzeit: <span class="required">*</span>
        <input
          type="datetime-local"
          name="eventdate"
          required="required"
          v-model="date"
          aria-label="Datetime local"
        />
      </label>
    </div>
    <label for="event-description"
      >Beschreibung: <span class="required">*</span>
      <input type="text" name="eventdescription" v-model="description"
    /></label>

    <div class="grid">
      <label for="event-organizer"
        >Veranstalter:<input type="text" name="eventorganizer" v-model="organizer"
      /></label>
      <label for="event-address"
        >Adresse:<input type="text" name="eventaddress" v-model="address"
      /></label>
    </div>
    <hr />
    <h4>Playlists</h4>
    <label
      >Playlist auswählen: <span class="required">*</span>
      <select name="event-playlist" required="required" v-model="selectedPlaylistId">
        <option v-for="playlist in playlists" :key="playlist.id" :value="playlist.id">
          {{ playlist.title }}
        </option>
      </select></label
    >
    <hr />
    <h4>Veranstaltungsfoto</h4>
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
      <figure class="chooseHeaderFigure">
        <img
          class="chooseHeaderImg"
          :src="getImagePath(selectedEventImage)"
          :alt="selectedEventImage"
        />
        <figcaption class="chooseHeaderFigcaption">{{ selectedEventImage }}</figcaption>
      </figure>
    </div>
    <hr />
    <p>Bitte füge zuerst das Event hinzu, anschließend wird der QR Code und der Link generiert.</p>
    <!-- eventId als Prop übergeben -->
    <QrCodeGenerator2 v-if="this.eventId !== ''" :eventId="eventId" />
    <hr />
    <div class="grid">
      <input type="submit" value="Event hinzufügen" :disabled="!isFormValid" />
      <div>
        <router-link to="/events">
          <button><i class="si-grid"></i> Eventübersicht</button>
        </router-link>
      </div>
      <div>
        <router-link to="/dj-overview"
          ><button class="contrast"><i class="si-chevron-left"></i> zurück</button></router-link
        >
      </div>
    </div>
  </form>
</template>

<script>
import QrCodeGenerator2 from '@/components/QrCodeGenerator2.vue'
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
      eventId: '',

      playlists: [],

      selectedEventImage: 'Default' // Initial
    }
  },

  components: { ActiveDj, QrCodeGenerator2 },

  created() {
    this.fetchPlaylists()
  },
  computed: {
    isFormValid() {
      return (
        this.title.trim() !== '' && // Login darf nicht leer sein oder nur Leerzeichen enthalten
        this.date.trim() !== '' && // Login darf keine Leerzeichen am Anfang oder Ende haben
        this.description.trim() !== '' &&
        this.selectedPlaylistId !== '' // Playlist darf nicht leer sein

        // Hier kannst du weitere Validierungen hinzufügen
      )
    }
  },
  methods: {
    async fetchPlaylists() {
      await usePlaylistStore().fetchPlaylistsForLocalStoredDJ()
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

    async addEvent() {
      // Erstelle ein Event und bekomme die EventId in die Konsole ausgegeben
      try {
        //activeDj aus dem locale storage holen
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
          eventImage: this.getImagePath(this.selectedEventImage)
        }

        const response = await fetch(import.meta.env.VITE_API_URL + '/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
        })

        if (!response.ok) {
          throw new Error('Fehler beim Senden der Daten')
        }
        //hier die Rückantwort der Api erhalten und die Event ID bekommen
        const eventData = await response.json()
        const eventId = eventData.id

        //Die eventId in einer Variablen speichern und an data übergeben
        this.eventId = eventId

        //debug
        //console.log('Neues Event hinzugefügt mit Playlist ID:', this.selectedPlaylistId)
        //console.log('Neues Event hinzugefügt mit der ID:', eventId)

        // alert
        this.$swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Dein Event wurde erstellt!',
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        console.error('Fehler:', error)
      }
    }
  }
}
</script>
