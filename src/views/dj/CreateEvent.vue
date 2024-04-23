<template>
  <h2>CreateEvent</h2>
  <h3>Event erstellen</h3>
  <p>Hier erstellst du deine Veranstaltung</p>
  <form>
    <label for="event-title">Titel:</label>
    <input type="text" name="event-title" />
    <label for="event-date">Datum:</label>
    <input type="text" name="event-date" />
    <label for="event-organizer">Veranstalter:</label>
    <input type="text" name="event-organizer" />
    <label for="event-address">Adresse:</label>
    <input type="text" name="event-address" />
    <label for="event-playlist">Playlist:</label>
    <select name="event-playlist">
      <option>Playlist 1</option>
      <option>Playlist 2</option>
      <option>Playlist 3</option>
    </select>
    <label for="event-image">Foto:</label>
    <fieldset id="event-image">
      <input type="radio" id="birthday" name="event-image-radio" value="Geburtstag" />
      <label for="html">Geburtstag</label><br />

      <input type="radio" id="marriage" name="event-image-radio" value="Hochzeit" />
      <label for="marriage">Hochzeit</label><br />

      <input type="radio" id="business" name="event-image-radio" value="business" />
      <label for="business">Firmenfeier</label>
    </fieldset>
    <label for="event-qrcode">Firmenfeier</label>
    <hr />
    <!-- <button name="event-qrcode">QR Code generieren</button> -->
  </form>
  <QrCodeGenerator />

  <router-link to="/events">Event hinzufügen</router-link>
</template>

<script>
import QrCodeGenerator from '@/components/QrCodeGenerator.vue'

export default {
  components: { QrCodeGenerator: QrCodeGenerator }
}
</script>
