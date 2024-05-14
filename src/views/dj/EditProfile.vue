<template>
  <small><active-dj>nicht eingeloggt</active-dj> @ EditProfile</small>
  <h2>Profil verwalten</h2>

  <div v-if="dj === null">Loading...</div>
  <div v-else>
    <div class="profilCard">
      <div style="margin-bottom: 8px">
        <span class="profilText">Username:</span> {{ dj.username }}
      </div>
      <div style="margin-bottom: 8px"><span class="profilText">DJ Name:</span> {{ dj.djname }}</div>
      <div style="margin-bottom: 8px"><span class="profilText">E-Mail:</span> {{ dj.email }}</div>
      <div style="margin-bottom: 8px"><span class="profilText">Phone:</span> {{ dj.phone }}</div>
      <div><span class="profilText">ID:</span> {{ dj.id }}</div>
    </div>
  </div>

  <p>Ändere hier deine Daten</p>
  <form @submit.prevent="submitForm">
    <div class="grid">
      <label for="Username"
        >Username: <span class="required">*</span
        ><input type="text" name="username" required="required" @input="updateUserName"
      /></label>
      <label for="djname"
        >DJ Name: <span class="required">*</span
        ><input type="text" name="djname" required="required" @input="updateDJName"
      /></label>
    </div>
    <div class="grid">
      <label for="email"
        >E-Mail-Adresse: <input type="text" name="email" @input="updateEmail"
      /></label>
      <label for="phone"
        >Handynummer: <input type="text" name="phone" @input="updatePhone"
      /></label>
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
    updateUserName(event) {
      useDjStore().updateData.username = event.target.value
      console.log(useDjStore().updateData)
    },
    updateDJName(event) {
      useDjStore().updateData.djname = event.target.value
      console.log(useDjStore().updateData)
    },
    updateEmail(event) {
      useDjStore().updateData.email = event.target.value
      console.log(useDjStore().updateData)
    },
    updatePhone(event) {
      useDjStore().updateData.phone = event.target.value
      console.log(useDjStore().updateData)
    },
    submitForm() {
      useDjStore().updateUserData()
      // @click="this.$router.push({ path: '/dj-overview' })"
    }
  }
}
</script>

<style>
.profilCard {
  border: 2px solid;
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 1rem;
}
.profilText {
  font-weight: bold;
}
</style>
