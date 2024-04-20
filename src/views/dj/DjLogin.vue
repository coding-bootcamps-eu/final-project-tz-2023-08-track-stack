<template>
  <h2>DJLogin</h2>
  <h3>Login</h3>
  <p>
    Herzlich Willkommen bei TrackStack, zum Einloggen gib einfach deinen DJ Namen ein. Bist du das
    erste Mal hier, kannst du dich hier <a href="">registrieren</a>:
  </p>
  <form>
    <label for="dj-name">DJ Name</label>
    <input type="text" name="dj-name" placeholder="Trage hier deinen DJ Name ein" />
    <router-link to="/overview">Einloggen</router-link>
    <router-link to="/register">Registrieren</router-link>
  </form>
</template>
<!-- Link auf andere Seite ist kein Button ;-) -->
