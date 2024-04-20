<template>
  <h2>CreatePlaylist</h2>
  <h3>Playlist erstellen</h3>
  <p>Hier erstellst du deine Playlist</p>
  <form>
    <label for="event-title">Titel:</label>
    <input type="text" name="event-title" />
    <label for="event-upload">Upload CSV:</label>
    <input type="file" name="event-upload" />
  </form>
  <router-link to="/events">Playlist hinzufügen</router-link>
</template>
