<template>
  <small><active-dj>nicht eingeloggt</active-dj> @ WishSong</small>

  <h2>Wünsch dir was!</h2>
  <p>Hier kannst du dir einen Song wünschen.</p>
  <form @submit.prevent="submitSong()">
    <label class="hidden" for="song-search">Suche nach Titel oder Interpret:</label><br />
    <input
      type="search"
      name="song-search"
      placeholder="Gib hier deinen Wunschtitel ein …"
      v-model="inputSongSearch"
      @input="getSuggestionFromApi"
    />

    <div v-if="suggestions.length > 0" class="dropdown">
      <p v-for="(song, index) in suggestions" :key="index" @click="selectSong(song)">
        {{ song.artist }} - {{ song.title }}
      </p>
    </div>

    <textarea
      v-model="message"
      type="text"
      placeholder="Möchtest du jemanden grüßen oder hast eine Bitte?"
    ></textarea
    ><br />
    <label for="anonym"
      ><input type="checkbox" name="anonym" id="anonym" />Ich möchte anonym bleiben</label
    >
    <hr />
    <div class="grid">
      <input type="submit" value="Wunsch abschicken" />
      <router-link to="/guest-overview"
        ><button class="secondary">Zurück zur Übersicht</button></router-link
      >
    </div>
  </form>
</template>

<script>
import ActiveDj from '@/components/ActiveDj.vue'
import { useEventStore } from '@/stores/EventStore'

export default {
  components: { ActiveDj },
  data() {
    return {
      inputSongSearch: '',
      suggestions: [],
      selectedSong: null,
      message: '',
      artist: null,
      title: null
    }
  },

  created() {
    this.loadEventDataFromLocalStorage()
  },

  computed: {
    //Die Event Daten aus dem Store holen
    eventData() {
      const eventStore = useEventStore()
      return eventStore.eventDataForGuest
    }
  },

  methods: {
    loadEventDataFromLocalStorage() {
      //Event Daten auch aus dem local Storage holen
      const eventDataFromLocalStorage = localStorage.getItem('eventData')
      if (eventDataFromLocalStorage) {
        const eventStore = useEventStore()

        eventStore.setEventDataFromGuestStart(JSON.parse(eventDataFromLocalStorage))
      }
    },

    async getSuggestionFromApi() {
      try {
        // Eine Playlist mit ihrer ID fetchen
        const response = await fetch(`http://localhost:3000/playlists/${this.eventData.playlistId}`)
        if (response.ok) {
          const playlistFromApi = await response.json()
          const searchText = this.inputSongSearch.toLowerCase()

          // Filtere die Songs, die mit dem eingegebenen Buchstaben beginnen
          this.suggestions = playlistFromApi.songs.filter((song) => {
            const title = song.title.toLowerCase()
            const artist = song.artist.toLowerCase()

            return artist.includes(searchText) || title.includes(searchText)
          })
        }
      } catch (error) {
        console.error(error)
      }
    },

    selectSong(song) {
      this.inputSongSearch = `${song.artist} - ${song.title}`
      this.selectedSong = song
      this.artist = `${song.artist}`
      this.title = `${song.title}`
      this.suggestions = [] // Schließe die Dropdown-Liste, nachdem ein Song ausgewählt wurde
      console.log(this.selectedSong)
    },

    async submitSong() {
      try {
        //guestData aus dem locale storage holen
        const guestData = localStorage.getItem('guestData')
        if (!guestData) {
          throw new Error('Aktiver Gast nicht festgelegt.')
        }

        const dataToSend = {
          eventId: this.eventData.id, //required
          artist: this.artist, //required
          title: this.title, //required
          who: guestData,
          message: this.message
        }

        const response = await fetch('http://localhost:3000/requests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
        })

        if (!response.ok) {
          throw new Error('Fehler beim Senden der Daten')
        }

        //hier die Rückantwort der Api erhalten und den Request bekommen
        const requestData = await response.json()
        console.log(requestData)

        // Erfolgreiches Senden der Daten, Weiterleitung zum Login
        this.$router.push({ path: '/wishlist' })
      } catch (error) {
        alert('Fehler: Bitte trage deinen Wunschtitel ein.')
      }
    }
  }
}
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown p {
  list-style-type: none;
  margin: 0;
  margin-bottom: 1.2rem;
  padding: 0;
  position: relative;
  background-color: rgb(23, 23, 35);
  width: 100%;
  height: 2.5rem;
  z-index: 1;
  /* border: 1px solid #ddd; */
  cursor: pointer;
}

.dropdown p:hover {
  background-color: darkgray;
}
</style>
