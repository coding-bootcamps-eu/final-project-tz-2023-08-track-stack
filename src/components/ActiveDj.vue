<template>
  <span class="activedj">
    {{ activeDjId }}
  </span>
</template>

<script>
export default {
  data() {
    return {
      activeDjId: '' // initialisation
    }
  },
  mounted() {
    this.loadActiveDjIdFromLocalStorage()
  },
  methods: {
    loadActiveDjIdFromLocalStorage() {
      const activeDjIdFromLocalStorage = localStorage.getItem('activeDjId')
      if (activeDjIdFromLocalStorage) {
        this.activeDjId = activeDjIdFromLocalStorage
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
