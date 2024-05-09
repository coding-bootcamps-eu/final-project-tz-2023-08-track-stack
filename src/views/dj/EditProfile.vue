<template>
  <small>
    <active-dj><!--Zeigt aktuellen DJ an--></active-dj> @ EditProfile</small
  >
  <h2>Profil verwalten</h2>

  <div v-if="djs.length === 0">Loading...</div>
  <div v-else>
    <div v-for="dj in djs" :key="dj.id">
      <div>Username: {{ dj.username }}</div>
      <div>DJ Name: {{ dj.djname }}</div>
      <div>E-Mail: {{ dj.email }}</div>
      <div>Phone: {{ dj.phone }}</div>
      <div>ID: {{ dj.id }}</div>
      <hr />
    </div>
  </div>
  <p>Ändere hier deine Daten</p>
  <form @submit.prevent="submitForm">
    <div class="grid">
      <label for="Username"
        >Username: <span class="required">*</span
        ><input type="text" name="username" required="required"
      /></label>
      <label for="djname"
        >DJ Name: <span class="required">*</span
        ><input type="text" name="djname" required="required"
      /></label>
    </div>
    <div class="grid">
      <label for="email">E-Mail-Adresse: <input type="text" name="email" /></label>
      <label for="phone">Handynummer: <input type="text" name="phone" /></label>
    </div>
    <input
      @click="this.$router.push({ path: '/dj-overview' })"
      type="submit"
      value="Profil speichern"
    />
  </form>
</template>

<script>
import { useDjStoreLars } from '@/stores/DjStoreLars'
import ActiveDj from '@/components/ActiveDj.vue'
import { initDj } from '@/components/InitDj'

export default {
  components: { ActiveDj },

  data() {
    return {
      djs: []
    }
  },
  async mounted() {
    await useDjStoreLars().fetchDjs() // Fetch DJs data from API when component is mounted
    this.djs = useDjStoreLars().djs
    initDj()
  }
}
</script>
