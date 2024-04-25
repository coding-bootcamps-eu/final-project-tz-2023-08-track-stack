<template>
  <h2>DjOverview</h2>
  <h3>Übersicht DJ</h3>
  <p>Hier bist du auf deinem Dashboard</p>
  <router-link to="/create-event">Event erstellen</router-link>
  <router-link to="/events">Events verwalten</router-link>
  <hr />
  <router-link to="/create-playlist">Playlist erstellen</router-link>
  <router-link to="/playlists">Playlists verwalten</router-link>
  <hr />
  <router-link to="/wishlist">Zur Wunschliste</router-link>
  <hr />
  <router-link to="/profil">Profil bearbeiten</router-link>
</template>

<script>
import { AppData } from '@/stores/AppData'

const appData = AppData()

// fetch API data
appData.getApiData()
</script>
