<template>
  <div>
    <p>Daten zum testen</p>
    <p v-for="data in store.apiData.playlists" :key="data" :data="data">{{ data }}</p>
  </div>
  <div>
    <p>Logged in Dj</p>
    <p v-for="data in store.djLoggedIn" :key="data">{{ data }}</p>

    <form @submit.prevent="handeleSubmit()">
      <p>Du hast {{ store.totalPlaylists }} Playlists</p>
      <input type="text" v-model="newSongArtist" placeholder="Artist" />
      <input type="text" v-model="newSongTitle" placeholder="Song Title" />
      <button>add</button>
    </form>

    <p>{{ this.store.apiData.djs.find((dj) => dj.djNickname === this.nickname) }}</p>
    <input type="text" v-model="nickname" placeholder="your nickname" />
    <button @click="djLogin">login</button>
  </div>

  <small>DjOverview</small>
  <h2>Übersicht DJ</h2>
  <p>Hier bist du auf deinem Dashboard</p>
  <div class="grid">
    <router-link to="/create-event"><button>Event erstellen</button></router-link>
    <router-link to="/events"><button>Events verwalten</button></router-link>
  </div>
  <hr />
  <div class="grid">
    <router-link to="/create-playlist"><button>Playlist erstellen</button></router-link>
    <router-link to="/playlists"><button>Playlists verwalten</button></router-link>
  </div>
  <hr />
  <div class="grid">
    <router-link to="/profil"><button>Profil bearbeiten</button></router-link>
    <router-link to="/wishlist"><button class="contrast">Zur Wunschliste</button></router-link>
  </div>
</template>

<script>
import { AppData } from '@/stores/AppData.js'

export default {
  data() {
    return {
      store: AppData(),
      nickname: '',
      newSongArtist: '',
      newSongTitle: ''
    }
  },

  created() {
    this.store.getApiData()
  },

  // to check if the dj exists when loggin in. you can also transfer to an other view instead of an alert.
  computed: {
    djLogin() {
      if (this.store.apiData.djs.find((dj) => dj.djNickname === this.nickname)) {
        alert('Welcome ' + this.nickname + ',  you are logged in!')
      } else {
        alert('Username not found. Please register.')
      }
      this.nickname = ''
    }
  },

  methods: {
    handeleSubmit() {
      if (this.newSongArtist.length && this.newSongTitle.length > 0) {
        this.store.addSong({
          artist: this.newSongArtist,
          title: this.newSongTitle
        })
        this.newSongArtist = ''
        this.newSongTitle = ''
      }
    }
  }
}
</script>
