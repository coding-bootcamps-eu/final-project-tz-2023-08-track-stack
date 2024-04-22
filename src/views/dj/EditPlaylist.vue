<template>
  <h2>EditPlaylist</h2>
  <h3>Playlist ändern</h3>
  <p>Hier änderst du deine Playlist</p>
  <form>
    <label for="event-title">Titel:</label>
    <input type="text" name="event-title" />
    <label for="event-upload">Upload CSV:</label>
    <input type="file" name="event-upload" />
  </form>
  <router-link to="/playlists">Playlist aktualisieren</router-link>
</template>
