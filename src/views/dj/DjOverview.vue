<template>
  <small>DjOverview</small>
  <h2>Übersicht DJ</h2>
  <p>Hier bist du auf deinem Dashboard</p>
  <div class="grid">
    <router-link to="/create-event"><button>Event erstellen</button></router-link>
    <router-link to="/events"><button class="secondary">Events verwalten</button></router-link>
  </div>
  <hr />
  <div class="grid">
    <router-link to="/create-playlist"><button>Playlist erstellen</button></router-link>
    <router-link to="/playlists"
      ><button class="secondary">Playlists verwalten</button></router-link
    >
  </div>
  <hr />
  <div class="grid">
    <router-link to="/wishlist"><button class="contrast">Zur Wunschliste</button></router-link>
    <router-link to="/profil"><button class="contrast">Profil bearbeiten</button></router-link>
  </div>
</template>
