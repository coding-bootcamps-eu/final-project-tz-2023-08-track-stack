<template>
  <small>View: WishSong</small>
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

    <div v-if="suggestions.length > 0" class="dropdown">
      <p v-for="(song, index) in suggestions" :key="index" @click="selectSong(song)">
        {{ song.title }} - {{ song.artist }}
      </p>
    </div>

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
export default {
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
          `http://localhost:3000/playlists/df2689c4-a6e8-4c91-8d5a-ac422aa04404`
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
