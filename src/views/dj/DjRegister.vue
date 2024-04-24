<template>
  <h2>DJ_Register</h2>
  <h3>Register DJ</h3>
  <p>Hier kannst du dich als DJ registrieren</p>
  <form @submit.prevent>
    <label for="dj-name">DJ Name:</label>
    <input type="text" name="dj-name" /><br />
    <label for="dj-firstname">Vorname:</label>
    <input type="text" name="dj-vorname" /><br />
    <label for="dj-lastname">Nachname:</label>
    <input type="text" name="dj-nachname" /><br />
    <label for="dj-email">E-Mail-Adresse:</label>
    <input type="text" name="dj-email" /><br />
    <label for="dj-phone">Handynummer:</label>
    <input type="text" name="dj-phone" /><br />
    <input
      @click="this.$router.push({ path: '/dj-overview' })"
      type="submit"
      value="Registrierung abschließen"
    />
  </form>
</template>
