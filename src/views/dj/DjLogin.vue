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
        :placeholder="placeholderText"
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
import { useDjStore } from '@/stores/DjStore'
import { getDjNamesFromApiToStore } from '@/components/GetDjNamesFromApiToStore'

export default {
  data() {
    return {
      placeholderText: 'Trage hier deinen Login-Namen ein',
      eingabeDjName: '',
      isDjNameValid: true
    }
  },
  mounted() {
    // Löschen des activeDJ
    useDjStore().resetActiveDj()
    // Get all registrated Djs to the Store
    getDjNamesFromApiToStore()
  },
  methods: {
    submitForm() {
      const registrierteDjs = useDjStore().regDjs

      // if no user
      if (!registrierteDjs.includes(this.eingabeDjName)) {
        console.log('Registrierte Djs:', registrierteDjs)
        this.isDjNameValid = false
      } else {
        //if user
        localStorage.setItem('activeDj', JSON.stringify(this.eingabeDjName)) // Eingeloggter DJ in localStorage hinterlegen
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

<!-- Casesensitiv???? -->
<!-- invalidDj -> Display:none , sodass nix verrutscht -->
