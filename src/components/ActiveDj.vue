<template>
  <slot v-if="!activeDjId"></slot>
  <span class="activedj">{{ dj.username }} </span>
</template>

<script>
import { useDjStore } from '@/stores/DjStore'
export default {
  data() {
    return {
      activeDjId: false, // initialisation
      dj: {}
    }
  },
  mounted() {
    this.watchStorage(), this.handleInit()
  },
  methods: {
    //zur Vermeidung des Flackerns, weil Pinia 1sekunde brauch
    watchStorage() {
      const activeDjIdFromLocalStorage = localStorage.getItem('activeDjId')
      if (activeDjIdFromLocalStorage) {
        this.activeDjId = true
      }
    },
    async handleInit() {
      //lade den ActiveDj in den Store

      await useDjStore().fetchActiveDj()
      this.dj = useDjStore().activeDj

      const activeDjIdFromLocalStorage = localStorage.getItem('activeDjId')
      if (!activeDjIdFromLocalStorage) {
        this.dj = {}
      }
    }
  }
}
</script>

<style scoped>
.activedj {
  color: var(--pico-primary-background);
  font-weight: bold;
}
</style>
