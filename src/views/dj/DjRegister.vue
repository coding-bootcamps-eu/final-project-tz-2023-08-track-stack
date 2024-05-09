<template>
  <small>
    <active-dj><!--Zeigt aktuellen DJ an--></active-dj> @ DjRegister</small
  >
  <h2>Register DJ</h2>
  <p>Hier kannst du dich als DJ registrieren</p>
  <form @submit.prevent="submitForm">
    <div class="grid">
      <label for="username"
        >Username: <span class="required">*</span>
        <span class="noValidDj" v-if="!isLoginValid"> Dieser Login existiert bereits. </span>
        <input
          type="text"
          name="username"
          required="required"
          v-model="username"
          @input="this.isLoginValid = true"
      /></label>
      <label for="djname"
        >Dj-Name: <span class="required">*</span
        ><input type="text" name="djname" required="required" v-model="djname"
      /></label>
    </div>
    <div class="grid">
      <label for="email"
        >E-Mail-Adresse: <span class="required">*</span>
        <input type="email" name="email" autofill="email" required="required" v-model="email"
      /></label>

      <label for="phone"
        >Handynummer: <input type="tel" name="phone" autofill="phone" v-model="phone"
      /></label>
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
      username: '',
      djname: '',
      email: '',
      phone: ''
    }
  },
  computed: {
    isFormValid() {
      return (
        this.username.trim() !== '' && // Login darf nicht leer sein oder nur Leerzeichen enthalten
        this.username.trim() == this.username && // Login darf keine Leerzeichen am Anfang oder Ende haben
        this.email !== '' // Email darf nicht leer sein

        // Hier kannst du weitere Validierungen hinzufügen
      )
    }
  },
  methods: {
    async submitForm() {
      // Daten sammeln, username is REQUIRED!!!
      const dataToSend = {
        username: this.username,
        djname: this.djname,
        email: this.email,
        phone: this.phone
      }
      if (this.username == '') {
        this.isLoginValid = false
      }

      //APi fragen ob LoginName schon vergeben
      //Hol die neusten LoginNamen
      await getDjNamesFromApiToStore()
      //Wenn JA => Nachricht: Username schon vergeben
      if (useDjStore().regDjs.includes(this.username)) {
        this.isLoginValid = false
      }

      //Wenn NEIN => Neuen Dj an API senden
      if (!useDjStore().regDjs.includes(this.username)) {
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
