<template>
  <small>ChangeProfile</small>
  <h2>Profil verwalten</h2>
  <p>Ändere hier deine Daten</p>
  <form @submit.prevent>
    <label for="dj-name">DJ Name: <input type="text" name="dj-name" value="DJ Jazzy" /></label>
    <div class="grid">
      <label for="dj-firstname"
        >Vorname: <input type="text" name="dj-vorname" value="Justin"
      /></label>
      <label for="dj-lastname"
        >Nachname: <input type="text" name="dj-nachname" value="Jazz"
      /></label>
    </div>
    <div class="grid">
      <label for="dj-email"
        >E-Mail-Adresse: <input type="text" name="dj-email" value="justin@jazzy.de"
      /></label>
      <label for="dj-phone"
        >Handynummer: <input type="text" name="dj-phone" value="0123 456789"
      /></label>
    </div>
    <input
      @click="this.$router.push({ path: '/dj-overview' })"
      type="submit"
      value="Profil speichern"
    />
  </form>
</template>
