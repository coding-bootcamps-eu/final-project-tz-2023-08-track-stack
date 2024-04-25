<template>
  <small>DJ_Register</small>
  <h2>Register DJ</h2>
  <p>Hier kannst du dich als DJ registrieren</p>
  <form @submit.prevent>
    <div class="grid">
      <label for="dj-name">DJ Name:</label>
      <input type="text" name="dj-name" />
    </div>
    <div class="grid">
      <label for="dj-firstname">Vorname:</label>
      <input type="text" name="dj-vorname" />
    </div>
    <div class="grid">
      <label for="dj-lastname">Nachname:</label>
      <input type="text" name="dj-nachname" />
    </div>
    <div class="grid">
      <label for="dj-email">E-Mail-Adresse:</label>
      <input type="text" name="dj-email" />
    </div>
    <div class="grid">
      <label for="dj-phone">Handynummer:</label>
      <input type="text" name="dj-phone" />
    </div>

    <input
      @click="this.$router.push({ path: '/dj-overview' })"
      type="submit"
      value="Registrierung abschließen"
    />
  </form>
</template>
