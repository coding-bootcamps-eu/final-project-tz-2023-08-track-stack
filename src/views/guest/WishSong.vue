<template>
  <small><active-dj>nicht eingeloggt</active-dj> @ WishSong</small>

  <h2>Wünsch dir was!</h2>
  <p>Hier kannst du dir einen Song wünschen.</p>
  <form @submit.prevent>
    <label class="hidden" for="song-search">Suche nach Titel oder Interpret:</label><br />
    <input
      type="search"
      name="song-search"
      placeholder="Gib hier deinen Wunschtitel ein …"
      v-model="inputSongSearch"
      @input="getSuggestionFromApi"
    />
    <article v-if="suggestions.length > 0" class="dropdown">
      <table>
        <thead>
          <tr>
            <th scope="col">Interpret</th>
            <th scope="col">Titel</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(song, index) in suggestions" :key="index" @click="selectSong(song)">
            <td>{{ song.artist }}</td>
            <td>{{ song.title }}</td>
          </tr>
        </tbody>
      </table>
    </article>

    <textarea type="text" placeholder="Möchtest du jemanden grüßen oder hast eine Bitte?"></textarea
    ><br />
    <label for="anonym"
      ><input type="checkbox" name="anonym" id="anonym" />Ich möchte anonym bleiben</label
    >
    <hr />
    <div class="grid">
      <input
        @click="this.$router.push({ path: '/wishlist' })"
        type="submit"
        value="Wunsch abschicken"
      />
      <router-link to="/guest-overview"
        ><button class="secondary">Zurück zur Übersicht</button></router-link
      >
    </div>
  </form>
</template>

<script>
import ActiveDj from '@/components/ActiveDj.vue'

export default {
  components: { ActiveDj },
  data() {
    return {
      inputSongSearch: '',
      suggestions: [],
      selectedSong: null
    }
  },

  methods: {
    async getSuggestionFromApi() {
      try {
        // Eine Playlist mit ihrer ID fetchen
        const response = await fetch(
          `http://localhost:3000/playlists/36c8b241-173f-487a-8203-71fb9be40d5d`
        )
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
      this.inputSongSearch = `${song.title} - ${song.artist}`
      this.selectedSong = song
      this.suggestions = [] // Schließe die Dropdown-Liste, nachdem ein Song ausgewählt wurde
      console.log(this.selectSong)
    },

    submitSong() {
      // Hier kann man die ausgewählten Song-Daten weiterverarbeiten
      console.log('Ausgewählter Song:', this.selectedSong)
    }
  }
}
</script>

<style scoped>
.dropdown {
  border: var(--pico-border-width) solid var(--pico-border-color);
  --pico-border-color: var(--pico-form-element-border-color);
}

.dropdown th {
  color: var(--pico-primary-background);
  padding: 0.25rem;
}
.dropdown td {
  margin: 0;
  width: 50%;
  padding: 0.25rem;
  position: relative;
  z-index: 1;
  border: 1px solid var(--pico-form-element-background-color);
  cursor: pointer;
}

.dropdown tr:hover td {
  background-color: var(--pico-primary-background);
  color: var(--pico-background-color);
}
</style>
