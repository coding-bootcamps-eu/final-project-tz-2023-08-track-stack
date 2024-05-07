<template>
  <small>DJ_Register</small>
  <h2>Register DJ</h2>
  <p>Hier kannst du dich als DJ registrieren</p>
  <form @submit.prevent="submitForm">
    <div class="grid">
      <label for="dj-name">DJ Name: <span class="required">*</span></label>
      <span class="noValidDj" v-if="!isDjNameValid"> DJ-Name existiert bereits. </span>
      <input
        type="text"
        name="dj-name"
        required="required"
        v-model="djName"
        @input="this.isDjNameValid = true"
      />
    </div>
    <div class="grid">
      <label for="firstname">Vorname:</label>
      <input type="text" name="firstname" v-model="vorname" />
    </div>
    <div class="grid">
      <label for="lastname">Nachname:</label>
      <input type="text" name="lastname" v-model="nachname" />
    </div>
    <div class="grid">
      <label for="email">E-Mail-Adresse: <span class="required">*</span></label>
      <input type="email" name="email" required="required" v-model="email" />
    </div>
    <div class="grid">
      <label for="phone">Handynummer:</label>
      <input type="tel" name="phone" v-model="phone" />
    </div>

    <input type="submit" value="Registrierung abschließen" :disabled="!isFormValid" />
  </form>
  <sup><span class="required">*</span> Bitte fülle sämtliche Pflichtfelder aus.</sup>
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
  computed: {
    isFormValid() {
      return this.djName !== '' && this.email !== '' // Hier kannst du weitere Validierungen hinzufügen
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
            this.$router.push({ path: '/dj-overview' })
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
.required,
.noValidDj {
  color: red;
}

input[required] {
  background-color: #fffbea;
}
</style>
