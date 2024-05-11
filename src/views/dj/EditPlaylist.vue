<template>
  <small><active-dj>nicht eingeloggt</active-dj> @ EditPlaylist</small>
  <h2>Playlist ändern</h2>
  <p>Hier änderst du deine Playlist</p>
  <form @submit.prevent>
    <label for="event-title">Titel:</label>
    <input type="text" name="event-title" />
    <label for="event-upload">Upload CSV:</label>
    <input type="file" name="event-upload" />
    <input
      @click="this.$router.push({ path: '/playlists' })"
      type="submit"
      value="Playlist aktualisieren"
    />
  </form>
</template>

<script>
import ActiveDj from '@/components/ActiveDj.vue'

export default {
  components: { ActiveDj }
}
</script>
