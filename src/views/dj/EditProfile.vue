<template>
  <small><active-dj>nicht eingeloggt</active-dj> @ EditProfile</small>
  <h2>
    Profil von <strong>{{ dj.username }}</strong> verwalten
  </h2>

  <p>Ändere hier deine Daten</p>
  <form @submit.prevent="submitForm">
    <div class="grid">
      <label for="Username"
        >Username: <span class="required">*</span
        ><input type="text" name="username" required="required" v-model="dj.username"
      /></label>
      <label for="djname"
        >DJ Name: <span class="required">*</span
        ><input type="text" name="djname" required="required" v-model="dj.djname"
      /></label>
    </div>
    <div class="grid">
      <label for="email"
        >E-Mail-Adresse: <input type="text" name="email" v-model="dj.email"
      /></label>
      <label for="phone">Handynummer: <input type="text" name="phone" v-model="dj.phone" /></label>
    </div>
    <input type="submit" value="Profil speichern" />
  </form>
</template>

<script>
import { useDjStore } from '@/stores/DjStore'
import ActiveDj from '@/components/ActiveDj.vue'

export default {
  components: { ActiveDj },

  data() {
    return {
      dj: {}
    }
  },
  async mounted() {
    //lade den ActiveDj in den Store
    await useDjStore().fetchActiveDj()
    this.dj = useDjStore().activeDj
    //setze updateData im Store auf die DefaultWerte des ActiveDj
    useDjStore().updateData = useDjStore().activeDj
  },
  methods: {
    submitForm() {
      useDjStore().updateUserData()
      alert('User erfolgreich aktualisiert')
      this.$router.push({ path: '/dj-overview' })
    }
  }
}
</script>
