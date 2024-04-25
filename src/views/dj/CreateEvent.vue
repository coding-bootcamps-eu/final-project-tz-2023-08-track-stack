<template>
  <small>CreateEvent</small>
  <h2>Event erstellen</h2>
  <p>Hier erstellst du deine Veranstaltung</p>
  <form @submit.prevent>
    <div class="grid">
      <label for="event-title">Titel: <input type="text" name="event-title" /></label>
      <label for="event-date">Datum: <input type="text" name="event-date" /></label>
    </div>

    <div class="grid">
      <label for="event-organizer">Veranstalter:<input type="text" name="event-organizer" /></label>
      <label for="event-address">Adresse:<input type="text" name="event-address" /></label>
    </div>
    <hr />
    <h4>Playlist</h4>
    <label for="event-playlist">Playlist auswählen:</label>
    <select name="event-playlist">
      <option>Playlist 1</option>
      <option>Playlist 2</option>
      <option>Playlist 3</option>
    </select>
    <hr />
    <h4>Veranstaltungsfoto</h4>
    <label for="event-image">Foto auswählen:</label>
    <fieldset id="event-image">
      <div class="grid">
        <label for="birthday"
          ><input
            type="radio"
            id="birthday"
            name="event-image-radio"
            value="Geburtstag"
          />Geburtstag
        </label>

        <label for="marriage"
          ><input
            type="radio"
            id="marriage"
            name="event-image-radio"
            value="Hochzeit"
          />Hochzeit</label
        >

        <label for="business"
          ><input
            type="radio"
            id="business"
            name="event-image-radio"
            value="business"
          />Firmenfeier</label
        >

        <label for="business"
          ><input
            type="radio"
            id="business"
            name="event-image-radio"
            value="business"
          />Firmenfeier</label
        >
      </div>
    </fieldset>
    <hr />
    <!-- <button name="event-qrcode">QR Code generieren</button> -->
    <h4>QR Code</h4>
    <QrCodeGenerator />
    <hr />
    <input @click="this.$router.push({ path: '/events' })" type="submit" value="Event hinzufügen" />
  </form>
</template>

<script>
import QrCodeGenerator from '@/components/QrCodeGenerator.vue'

export default {
  components: { QrCodeGenerator: QrCodeGenerator }
}
</script>

<style scoped></style>
