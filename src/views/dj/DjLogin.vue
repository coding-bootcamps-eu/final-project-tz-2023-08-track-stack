<template>
  <small>DJLogin</small>
  <h2>Login</h2>
  <p>
    Herzlich Willkommen bei TrackStack, zum einloggen gib einfach deinen DJ Namen ein.<br />
    Bist du das erste Mal hier, kannst du dich hier
    <router-link to="/register">registrieren</router-link>:
  </p>
  <form @submit.prevent="submitForm">
    <div class="grid">
      <label class="hidden" for="dj-name">DJ Name</label>
      <input
        type="text"
        name="dj-name"
        placeholder="Trage hier deinen DJ Name ein, ES GEHT GERADE NUR 'maadin'"
        v-model="eingabeDjName"
        @input="this.isDjNameValid = true"
      />
      <div class="noValidDj" v-if="!isDjNameValid && eingabeDjName !== ''">
        Der eingegebene DJ-Name existiert nicht.
      </div>
      <input type="submit" value="einloggen" />
      <router-link to="/register"><button class="secondary">Registrieren</button></router-link>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      eingabeDjName: '',
      isDjNameValid: true
    }
  },
  methods: {
    submitForm() {
      // if no user
      if (this.eingabeDjName != 'maadin') {
        this.isDjNameValid = false
      } else {
        //if user
        localStorage.setItem('loggedDj', this.eingabeDjName) // Benutzer in localStorage speichern
        this.$router.push({ path: '/dj-overview' })
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

<!-- ToDo -->
<!-- Eingabe Login -->
<!-- Login: Überprüfe ob User vorhanden -->
<!-- Login: Kein User -> Nachricht=DU BIST NICHT REGISTRIERT -->
<!-- Login: User -> DjOverview mit Anzeige wer eingeloggt ist -->
<!-- Login: User -> ActiveUser:UserID in Localstorage (UNSICHER aber egal) -->
