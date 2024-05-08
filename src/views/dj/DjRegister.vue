<template>
  <small>DJ_Register</small>
  <h2>Register DJ</h2>
  <p>Hier kannst du dich als DJ registrieren</p>
  <form @submit.prevent="submitForm">
    <div class="grid">
      <label for="login">Login: <span class="required">*</span></label>
      <span class="noValidDj" v-if="!isLoginValid"> Dieser Login existiert bereits. </span>
      <input
        type="text"
        name="login"
        required="required"
        v-model="login"
        @input="this.isLoginValid = true"
      />
    </div>
    <div class="grid">
      <label for="dj-name">Vorname:</label>
      <input type="text" name="dj-name" v-model="djName" />
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
      isLoginValid: true,
      login: '',
      djName: '',
      vorname: '',
      nachname: '',
      email: '',
      phone: ''
    }
  },
  computed: {
    isFormValid() {
      return (
        this.login.trim() !== '' && // Login darf nicht leer sein oder nur Leerzeichen enthalten
        this.login.trim() == this.login && // Login darf keine Leerzeichen am Anfang oder Ende haben
        this.email !== '' // Email darf nicht leer sein

        // Hier kannst du weitere Validierungen hinzufügen
      )
    }
  },
  methods: {
    async submitForm() {
      // Daten sammeln, username is REQUIRED!!!
      const dataToSend = {
        username: this.login,
        djName: this.djName,
        vorname: this.vorname,
        nachname: this.nachname,
        email: this.email,
        phone: this.phone
      }
      if (this.login == '') {
        this.isLoginValid = false
      }

      //APi fragen ob LoginName schon vergeben
      //Hol die neusten LoginNamen
      await getDjNamesFromApiToStore()
      //Wenn JA => Nachricht: Username schon vergeben
      if (useDjStore().regDjs.includes(this.login)) {
        this.isLoginValid = false
      }

      //Wenn NEIN => Neuen Dj an API senden
      if (!useDjStore().regDjs.includes(this.login)) {
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
