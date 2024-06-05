<template>
  <active-dj class="menu">nicht eingeloggt</active-dj>
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
    <div class="grid">
      <input type="submit" value="Profil speichern" />
      <div>
        <router-link to="/dj-overview"
          ><button class="contrast">
            <i class="si-grid"></i> Zurück zur Übersicht
          </button></router-link
        >
      </div>
    </div>
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
      //('User erfolgreich aktualisiert')
      //alert('Profil erfolgreich aktualisiert')
      this.$swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Profil erfolgreich aktualisiert!',
        showConfirmButton: false,
        timer: 1500
      })
      this.$router.push({ path: '/dj-overview' })
    }
  }
}
</script>
