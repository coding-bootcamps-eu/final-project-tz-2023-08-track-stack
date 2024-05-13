<template>
  <small><active-dj>nicht eingeloggt</active-dj> @ DjOverview</small>
  <div>
    <h2>Playlist ändern</h2>
    <p>Hier änderst du deine Playlist</p>
    <form @submit.prevent="updatePlaylist">
      <label for="event-title">Titel:</label>
      <input type="text" name="event-title" v-model="playlist.title" />
      <label for="event-upload">Upload CSV:</label>
      <input type="file" name="event-upload" />
      <input type="submit" value="Playlist aktualisieren" />
    </form>
  </div>
</template>

<script>
//import { usePlaylistStore } from '@/stores/PlaylistStore'
import ActiveDj from '@/components/ActiveDj.vue'

export default {
  components: { ActiveDj },
  data() {
    return {
      playlistId: null,
      playlist: {}
    }
  }
}
</script>
