<template>
  <slot v-if="!dj.id"></slot>
  <span class="activedj">{{ dj.username }} </span>
</template>

<script>
import { useDjStore } from '@/stores/DjStore'
export default {
  data() {
    return {
      activeDjId: '', // initialisation
      dj: {}
    }
  },
  mounted() {
    this.handleInit()
  },
  methods: {
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
