<template>
  <h2>WishSong</h2>
  <h3>Wünsch dir was!</h3>
  <p>Hier kannst du dir einen Song wünschen.</p>
  <form>
    <label for="song-search">Suche nach Titel oder Interpret:</label><br />
    <input type="search" name="song-search" Value="Title" />
    <ol class="song-suggestions">
      <li>Vorschläge</li>
    </ol>
    <input type="text" Value="Artist" /><br />
    <textarea type="text" Value="Message">

Möchtest du jemanden grüßen oder hast eine Bitte?</textarea
    ><br />
    <label for="anonym">Anonym bleiben</label>
    <input type="checkbox" name="anonym" id="" />
  </form>
  <router-link to="/wishlist">Zur Wunschliste</router-link>
</template>
