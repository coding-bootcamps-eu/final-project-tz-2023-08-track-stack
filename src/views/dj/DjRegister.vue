<template>
  <small><active-dj>nicht eingeloggt</active-dj> @ DjRegister</small>
  <h2>Register DJ</h2>
  <p>Hier kannst du dich als DJ registrieren</p>
  <form @submit.prevent="submitForm">
    <div class="grid">
      <label for="username"
        >Username: <span class="required">*</span>
        <span class="error" v-if="!isLoginValid"> Dieser Login existiert bereits. </span>
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
import ActiveDj from '@/components/ActiveDj.vue'

export default {
  components: { ActiveDj },
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
      // Daten sammeln
      const dataToSend = {
        username: this.username,
        djname: this.djname,
        email: this.email,
        phone: this.phone
      }

      // Überprüfen, ob der Benutzername bereits vergeben ist
      await useDjStore().fetchDjs() // Aktualisiere die Liste der registrierten DJs vom Server
      if (useDjStore().djs.some((dj) => dj.username === this.username)) {
        this.isLoginValid = false
        return // Beende die Methode, wenn der Benutzername bereits vergeben ist
      }

      // Senden der Daten an die API
      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
        })

        if (!response.ok) {
          throw new Error('Fehler beim Senden der Daten')
        }

        // Weiterleitung zur Login-Seite
        this.$router.push({ path: '/login' })
      } catch (error) {
        console.error('Fehler:', error)
      }
    }
  }
}
</script>

<style scoped>
.required,
.error {
  color: red;
}

input[required] {
  background-color: #fffbea;
}
</style>
