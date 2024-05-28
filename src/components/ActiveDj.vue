<template>
  <span>
    <div v-if="!isDjLoggedIn">
      <small class="no-active-dj"><slot></slot></small>
    </div>
    <details v-else class="dropdown">
      <summary class="summary activedj">{{ dj.username }}:</summary>
      <ul dir="rtl">
        <li><a href="#">Profile</a></li>
        <li><a href="#">Logout</a></li>
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
.activedj.activedj {
  color: var(--pico-primary-background);
  font-weight: bold;
}
.summary.summary {
  background-color: black;

  padding-left: 1rem;
  padding-right: 0.5rem;
  padding-top: 0.2rem;
  padding-bottom: 1.6rem;

  height: 1.5rem;
  width: fit-content;
}
</style>
