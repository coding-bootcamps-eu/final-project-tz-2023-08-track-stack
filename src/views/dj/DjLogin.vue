<template>
  <small>DJLogin</small>
  <h2>Login</h2>
  <p>
    Herzlich Willkommen bei TrackStack, zum einloggen gib einfach deinen DJ Namen ein.<br />
    Bist du das erste Mal hier, kannst du dich hier
    <router-link to="/register">registrieren</router-link>:
  </p>
  <form @submit.prevent>
    <div class="grid">
      <label class="hidden" for="dj-name">DJ Name</label>
      <input type="text" name="dj-name" placeholder="Trage hier deinen DJ Name ein" />
      <input @click="this.$router.push({ path: '/dj-overview' })" type="submit" value="einloggen" />
      <router-link to="/register"><button class="secondary">Registrieren</button></router-link>
    </div>
  </form>
</template>
