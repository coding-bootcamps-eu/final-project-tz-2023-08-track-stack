<template>
  <h2>Wünsch dir was!</h2>
  <p>Hier kannst du dir einen Song wünschen.</p>
  <form @submit.prevent="submitSong">
    <label class="hidden" for="song-search">Suche nach Titel oder Interpret:</label><br />
    <input
      type="search"
      name="song-search"
      autocomplete="off"
      placeholder="Wunschtitel oder Interpret eingeben …"
      v-model="inputSongSearch"
      @input="getSuggestionFromApi"
      required="required"
    />

    <table v-if="suggestions.length > 0" class="dropdown">
      <thead>
        <tr>
          <th>Titel</th>
          <th>Interpret</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(song, index) in suggestions" :key="index" @click="selectSong(song)">
          <td>{{ song.title }}</td>
          <td>{{ song.artist }}</td>
        </tr>
      </tbody>
    </table>

    <textarea
      v-model="message"
      type="text"
      placeholder="Möchtest du dem DJ eine Nachricht hinterlassen?"
    ></textarea>
    <label for="anonym">
      <input type="checkbox" name="anonym" id="anonym" v-model="isAnonym" />Ich möchte anonym
      bleiben
    </label>
    <hr />
    <div class="grid">
      <input type="submit" value="Wunsch abschicken" />
      <div>
        <router-link to="/guest-overview">
          <button class="secondary"><i class="si-grid"></i> Zurück zur Übersicht</button>
        </router-link>
      </div>
      <div>
        <router-link to="/wishlist"
          ><button class="contrast"><i class="si-server"></i> Zur Wunschliste</button></router-link
        >
      </div>
    </div>
  </form>
</template>

<script>
import { useEventStore } from '@/stores/EventStore'

export default {
  data() {
    return {
      inputSongSearch: '',
      suggestions: [],
      selectedSong: null,
      message: '',
      artist: null,
      title: null,
      requests: [], // requests als leeres Array initialisieren
      isAnonym: false
    }
  },

  created() {
    this.loadEventDataFromLocalStorage()
    this.loadRequestsFromApi()
  },

  computed: {
    eventData() {
      const eventStore = useEventStore()
      return eventStore.eventDataForGuest
    }
  },

  methods: {
    loadEventDataFromLocalStorage() {
      const eventDataFromLocalStorage = localStorage.getItem('eventData')
      if (eventDataFromLocalStorage) {
        const eventStore = useEventStore()
        eventStore.setEventDataFromGuestStart(JSON.parse(eventDataFromLocalStorage))
      }
    },

    async loadRequestsFromApi() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/requests?eventId=${this.eventData.id}`
        )
        if (response.ok) {
          this.requests = await response.json()
        }
      } catch (error) {
        console.error(error)
      }
    },

    async getSuggestionFromApi() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/playlists/${this.eventData.playlistId}`
        )
        if (response.ok) {
          const playlistFromApi = await response.json()
          const searchText = this.inputSongSearch.toLowerCase()

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
      this.suggestions = []
    },

    async submitSong() {
      try {
        const guestData = JSON.parse(localStorage.getItem('guestData'))
        if (!guestData) {
          throw new Error('Aktiver Gast nicht festgelegt.')
        }

        const existingRequest = this.requests.find(
          (request) => request.title === this.title && request.artist === this.artist
        )

        if (existingRequest) {
          const userConfirmed = confirm(
            'Der gewünschte Musikwunsch steht bereits auf der Liste. Möchtest du zur Wunschliste weitergeleitet werden?'
          )
          if (userConfirmed) {
            // Entferne das Upvoting und leite einfach weiter
            this.$router.push({ path: '/wishlist' })
            return
          } else {
            return
          }
        }

        const dataToSend = {
          eventId: this.eventData.id,
          artist: this.artist,
          title: this.title,
          message: this.message
        }
        // Füge den who-Key hinzu, wenn isAnonym false ist
        if (!this.isAnonym) {
          dataToSend.who = guestData
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/requests`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
        })

        if (!response.ok) {
          throw new Error('Fehler beim Senden der Daten')
        }

        this.$router.push({ path: '/wishlist' })
      } catch (error) {
        alert(error)
      }
    }
  }
}
</script>

<style scoped>
.dropdown {
  --pico-border-color: var(--pico-form-element-border-color);
  border-radius: 0.3rem;
}

.dropdown th {
  color: var(--pico-primary-background);
  padding: 0.5rem;
}
.dropdown td {
  margin: 0;
  width: 50%;
  padding: 0.5rem;
  position: relative;
  z-index: 1;
  border: 0;
  cursor: pointer;
}

.dropdown td:first-child {
  border-radius: 0.3rem 0 0 0.3rem;
}
.dropdown td:last-child {
  border-radius: 0 0.3rem 0.3rem 0;
}

.dropdown tr:hover td {
  background-color: var(--pico-primary-background);
  color: var(--pico-background-color);
}
</style>
