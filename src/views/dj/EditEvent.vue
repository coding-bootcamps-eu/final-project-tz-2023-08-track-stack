<template>
  <small><active-dj>nicht eingeloggt</active-dj> @ EditEvent</small>
  <h2>Event bearbeiten</h2>
  <p>Hier erstellst du deine Veranstaltung</p>
  <form @submit.prevent>
    <div class="grid">
      <label for="event-title">Titel: <input type="text" name="event-title" /></label>
      <label for="event-date"
        >Datum:
        <input type="datetime-local" name="event-date" v-model="date" aria-label="Datetime local"
      /></label>
    </div>
    <div class="grid">
      <label for="event-organizer"
        >Veranstalter: <input type="text" name="event-organizer"
      /></label>
      <label for="event-address"
        >Veranstaltungsort: <input type="text" name="event-address"
      /></label>
    </div>
    <label for="event-playlist"
      >Playlist:
      <select name="event-playlist">
        <option>Playlist 1</option>
        <option>Playlist 2</option>
        <option>Playlist 3</option>
      </select></label
    >
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
    <h4>QR Code</h4>
    <QrCodeGenerator2 />
    <input
      @click="this.$router.push({ path: '/events' })"
      type="submit"
      value="Event aktualisieren"
    />
  </form>
</template>
<script>
import QrCodeGenerator2 from '@/components/QrCodeGenerator2.vue'
import ActiveDj from '@/components/ActiveDj.vue'

export default {
  components: { ActiveDj, QrCodeGenerator2: QrCodeGenerator2 }
}
</script>
