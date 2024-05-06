<template>
  <small>DJ_Register</small>
  <h2>Register DJ</h2>
  <p>Hier kannst du dich als DJ registrieren</p>
  <form @submit.prevent="submitForm">
    <div class="grid">
      <label for="dj-name">DJ Name:</label>
      <span class="noValidDj" v-if="!isDjNameValid"> DJ-Name existiert bereits. </span>
      <input type="text" v-model="djName" @input="this.isDjNameValid = true" />
    </div>
    <div class="grid">
      <label for="dj-firstname">Vorname:</label>
      <input type="text" v-model="vorname" />
    </div>
    <div class="grid">
      <label for="dj-lastname">Nachname:</label>
      <input type="text" v-model="nachname" />
    </div>
    <div class="grid">
      <label for="dj-email">E-Mail-Adresse:</label>
      <input type="text" v-model="email" />
    </div>
    <div class="grid">
      <label for="dj-phone">Handynummer:</label>
      <input type="text" v-model="phone" />
    </div>

    <input type="submit" value="Registrierung abschließen" />
  </form>
</template>

<script>
import { useDjStore } from '@/stores/DjStore'
import { getDjNamesFromApiToStore } from '@/components/GetDjNamesFromApiToStore'

export default {
  data() {
    return {
      isDjNameValid: true,
      djName: '',
      vorname: '',
      nachname: '',
      email: '',
      phone: ''
    }
  },
  methods: {
    async submitForm() {
      // Daten sammeln, username is REQUIRED!!!
      const dataToSend = {
        username: this.djName,
        vorname: this.vorname,
        nachname: this.nachname,
        email: this.email,
        phone: this.phone
      }
      if (this.djName == '') {
        this.isDjNameValid = false
      }
      //APi fragen ob username schon vergeben
      await getDjNamesFromApiToStore()

      //Wenn JA => Nachricht: Username schon vergeben
      if (useDjStore().regDjs.includes(this.djName)) {
        this.isDjNameValid = false
      }

      //Wenn NEIN => Neuen Dj an API senden
      if (!useDjStore().regDjs.includes(this.djName)) {
        fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Fehler beim Senden der Daten')
            }
            // Weiterleitung zum Login
            this.$router.push({ path: '/login' })
          })
          .catch((error) => {
            console.error('Fehler:', error)
          })
      }
    }
  }
}
</script>

<style scoped>
.noValidDj {
  color: red;
}
</style>
