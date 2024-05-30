<template>
  <h2>
    Name von <strong>{{ guestData.name }}</strong> ändern
  </h2>

  <p>Ändere hier deinen Namen</p>
  <form @submit.prevent="submitForm">
    <label for="username">
      Gastname: <span class="required">*</span>
      <input type="text" name="username" required="required" v-model="guestData.name" />
    </label>
    <div class="grid">
      <input type="submit" value="Name speichern" />
      <div>
        <router-link to="/guest-overview">
          <button class="contrast"><i class="si-grid"></i> Zurück zur Übersicht</button>
        </router-link>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      guestData: { id: null, name: '' } // Initialisiere mit leeren Werten
    }
  },
  mounted() {
    // Lade die gespeicherten Gastdaten aus dem Local Storage
    const guestDataInLocalStorage = localStorage.getItem('guestData')
    if (guestDataInLocalStorage) {
      this.guestData = JSON.parse(guestDataInLocalStorage)
    }
  },
  methods: {
    submitForm() {
      // Aktualisiere die Daten im Local Storage
      localStorage.setItem('guestData', JSON.stringify(this.guestData))
      alert('Name erfolgreich aktualisiert')
      this.$router.push({ path: '/guest-overview' })
    }
  }
}
</script>
