<template>
  <h2>ChangeProfile</h2>
  <h3>Profil verwalten</h3>
  <p>Ändere deine Daten</p>
  <form>
    <label for="dj-name">DJ Name:</label>
    <input type="text" name="dj-name" value="dj-name" />
    <label for="dj-firstname">Vorname:</label>
    <input type="text" name="dj-vorname" value="dj-vorname" />
    <label for="dj-lastname">Nachname:</label>
    <input type="text" name="dj-nachname" value="dj-nachname" />
    <label for="dj-email">E-Mail-Adresse:</label>
    <input type="text" name="dj-email" value="dj-email" />
    <label for="dj-phone">Handynummer:</label>
    <input type="text" name="dj-phone" value="dj-phone" />
    <input type="submit" value="Profil speichern" />
  </form>
  <!--<button>EditProfil</button>-->
  <router-link to="/dj-overview">Edit Profile</router-link>
</template>
