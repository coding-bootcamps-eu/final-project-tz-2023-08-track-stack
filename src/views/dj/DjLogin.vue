<template>
  <!-- <active-dj class="menu">nicht eingeloggt</active-dj> -->
  <h2>Login</h2>
  <p>
    Herzlich Willkommen bei Hulaloop, zum einloggen gib einfach deinen DJ-Namen ein.<br />
    Bist du das erste Mal hier? Dann kannst du dich einfach hier
    <router-link to="/register">registrieren</router-link>:
  </p>
  <form @submit.prevent="submitForm">
    <div class="grid">
      <fieldset role="group" class="mandatory-wrap">
        <label class="hidden" for="username">DJ Name</label>
        <input
          type="text"
          name="username"
          required="required"
          :placeholder="placeholderText"
          v-model="eingabeDjName"
          @input="this.isDjNameValid = true"
        />
        <input type="submit" value="Einloggen" />
        <div class="error" v-if="!isDjNameValid && eingabeDjName !== ''">
          Der eingegebene DJ-Name existiert leider nicht.
        </div>
      </fieldset>

      <div>
        <router-link to="/register"
          ><button class="secondary"><i class="si-user"></i> Registrieren</button></router-link
        >
      </div>
    </div>
  </form>
</template>

<script>
import { useDjStore } from '@/stores/DjStore'

export default {
  data() {
    return {
      placeholderText: 'Trage hier deinen Login-Namen ein',
      eingabeDjName: '',
      isDjNameValid: true
    }
  },
  async created() {
    localStorage.removeItem('eventData')
    // Lade die Liste der registrierten DJs
    await useDjStore().fetchDjs()
  },
  methods: {
    async submitForm() {
      const registrierteDjs = useDjStore().djs

      // Überprüfung, ob die Eingabe nicht leer ist
      if (!this.eingabeDjName.trim()) {
        this.isDjNameValid = false
        return
      }

      // Überprüfung, ob der eingegebene DJ in der Liste der registrierten DJs vorhanden ist
      const foundDj = registrierteDjs.find(
        (dj) => dj.username.toLowerCase() === this.eingabeDjName.toLowerCase()
      )

      if (!foundDj) {
        this.isDjNameValid = false
      } else {
        const Toast = this.$swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = this.$swal.stopTimer
            toast.onmouseleave = this.$swal.resumeTimer
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Du hast dich erfolgreich eingeloggt!'
        })

        // Wenn der DJ registriert ist, die ID im localStorage speichern weiterleiten
        localStorage.setItem('activeDjId', foundDj.id)
        useDjStore().activeDjId = foundDj.id
        this.$router.push({ path: '/dj-overview' })
      }
    }
  }
}
</script>

<style scoped>
mandatory-wrap {
  position: relative;
}
.error {
  position: absolute;
  top: 3.5rem;
  z-index: 2;
  width: 100%;
  color: red;
  margin: 0;
  padding: 0.25rem 0rem;
  font-size: 0.75rem;
  display: block;
}
</style>
