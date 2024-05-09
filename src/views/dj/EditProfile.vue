<template>
  <small>
    <active-dj><!--Zeigt aktuellen DJ an--></active-dj> @ EditProfile</small
  >
  <h2>Profil verwalten</h2>
  <p>Ändere hier deine Daten</p>
  <form @submit.prevent="submitForm">
    <div class="grid">
      <label for="Username"
        >Username: <span class="required">*</span
        ><input type="text" name="username" required="required" v-model="username"
      /></label>
      <label for="djname"
        >DJ Name: <span class="required">*</span
        ><input type="text" name="djname" required="required" v-model="djname"
      /></label>
    </div>
    <div class="grid">
      <label for="email">E-Mail-Adresse: <input type="text" name="email" v-model="email" /></label>
      <label for="phone">Handynummer: <input type="text" name="dj-phone" v-model="phone" /></label>
    </div>
    <input
      @click="this.$router.push({ path: '/dj-overview' })"
      type="submit"
      value="Profil speichern"
    />
  </form>
</template>
<script>
import ActiveDj from '@/components/ActiveDj.vue'
import { initDj } from '@/components/InitDj'

export default {
  components: { ActiveDj },
  data() {
    return {}
  },
  mounted() {
    //Pinia bekommt Dj aus LocalStore//Überprüfen ob DJ eingeloggt
    initDj()
  },
  methods: {}
}
</script>
