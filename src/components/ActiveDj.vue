<template>
  <span>
    <div v-if="!isDjLoggedIn">
      <small class="no-active-dj"><slot></slot></small>
    </div>
    <details v-else class="dropdown">
      <summary><span>DJ:</span> {{ dj.username }}</summary>
      <ul>
        <li>
          <router-link to="/edit-profile"><i class="si-edit"></i> Profil ändern</router-link>
        </li>
        <li>
          <router-link to="/login"
            ><a @click="logout()"><i class="si-logout"></i> abmelden</a></router-link
          >
        </li>
      </ul>
    </details>
  </span>
</template>

<script>
import { useDjStore } from '@/stores/DjStore'
export default {
  data() {
    return {
      isDjLoggedIn: false, // initialisation
      dj: {}
    }
  },
  mounted() {
    this.isDjLoggedInMethode(), this.handleInit()
  },
  methods: {
    logout() {
      // remove activeDjId from localstorage
      localStorage.removeItem('activeDjId')
      localStorage.removeItem('eventData')
      useDjStore().activeDjId = null
    },
    //zur Vermeidung des Flackerns, weil Pinia 1sekunde brauch
    isDjLoggedInMethode() {
      const activeDjIdFromLocalStorage = localStorage.getItem('activeDjId')
      if (activeDjIdFromLocalStorage) {
        this.isDjLoggedIn = true
      }
    },
    async handleInit() {
      //lade den ActiveDj aus dem Store
      await useDjStore().fetchActiveDj()
      this.dj = useDjStore().activeDj

      //Bei Logout(localStorage ==leer), kein dj anzeigen
      const activeDjIdFromLocalStorage = localStorage.getItem('activeDjId')
      if (!activeDjIdFromLocalStorage) {
        this.dj = {}
      }
    }
  }
}
</script>

<style scoped>
details.dropdown summary {
  font-weight: bold;
  padding: 0.5rem 1rem;
  height: inherit;
  margin: 0;
}
details.dropdown summary span {
  color: var(--pico-color);
}
</style>
