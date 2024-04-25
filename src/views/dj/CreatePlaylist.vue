<template>
  <small>CreatePlaylist</small>
  <h2>Playlist erstellen</h2>
  <p>Hier erstellst du deine Playlist</p>
  <form @submit.prevent>
    <label for="event-title">Titel:</label>
    <input type="text" name="event-title" />
    <label for="event-upload">Upload CSV:</label>
    <input type="file" name="event-upload" />
    <input
      @click="this.$router.push({ path: '/events' })"
      type="submit"
      value="Playlist hinzufügen"
    />
  </form>
</template>
