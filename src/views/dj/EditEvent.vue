<template>
  <active-dj class="menu">nicht eingeloggt</active-dj>
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
      <label for="event-description">
        Beschreibung:
        <input type="text" name="event-description" v-model="event.description" />
      </label>
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
    <fieldset id="event-image">
      <div class="grid">
        <label for="default">
          <input
            type="radio"
            id="default"
            name="event-image-radio"
            value="Default"
            v-model="event.eventImage"
          />Standardbild
        </label>
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
      <figure class="chooseHeaderFigure">
        <img
          class="chooseHeaderImg"
          :src="getImagePath(event.eventImage)"
          :alt="event.eventImage"
        />
        <figcaption class="chooseHeaderFigcaption">{{ event.eventImage }}</figcaption>
      </figure>
    </div>
    <hr />
    <h4>QR Code</h4>
    <!-- eventId als Prop übergeben -->
    <QrCodeGenerator2 :eventId="event.id" />

    <hr />
    <div class="grid">
      <input type="submit" value="Event aktualisieren" />
      <router-link to="/events"
        ><button class="contrast">
          <i class="si-chevron-left"></i> Zurück zu den Events
        </button></router-link
      >
    </div>
  </form>
  <p use aria-busy="true" v-else>Lade Inhalte ...</p>
</template>

<script>
import QrCodeGenerator2 from '@/components/QrCodeGenerator2.vue'
import ActiveDj from '@/components/ActiveDj.vue'
import { useEventStore } from '@/stores/EventStore'
import { usePlaylistStore } from '@/stores/PlaylistStore'

export default {
  components: { ActiveDj, QrCodeGenerator2 },

  computed: {
    event() {
      const eventStore = useEventStore()
      return eventStore.currentEvent
    }
  },

  async created() {
    //Playlists
    await this.fetchPlaylists()
    //
    const eventStore = useEventStore()
    eventStore.loadCurrentEventFromLocalStorage()
    if (eventStore.currentEventId) {
      await eventStore.fetchEvent(eventStore.currentEventId)
    }
  },

  data() {
    return {
      playlists: []
    }
  },

  methods: {
    async fetchPlaylists() {
      await usePlaylistStore().fetchPlaylistsForLocalStoredDJ()
      this.playlists = usePlaylistStore().playlists
    },

    async updateEvent() {
      try {
        localStorage.setItem('eventData', JSON.stringify(this.event))
        const eventStore = useEventStore()
        this.event.eventImage = this.getImagePath(this.event.eventImage)
        await eventStore.updateEventInApi(this.event)
        // alert('Event erfolgreich aktualisiert')
        this.$router.push({ path: '/events' })
      } catch (error) {
        console.error('Fehler beim Aktualisieren des Events:', error)
        alert('Fehler beim Aktualisieren des Events')
      }
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
        case 'Default':
          return 'images/header_default.jpg'
        default:
          return this.event.eventImage
      }
    }
  }
}
</script>
