<template>
  <span id="activDJ">{{ activeDJ }}</span>
</template>

<script>
import { useDjStore } from '@/stores/DjStore'

export default {
  computed: {
    activeDJ() {
      return useDjStore().activeDj.username
    }
  }
}
</script>
<style scoped>
#activDJ {
  color: var(--pico-primary-background);
  font-weight: bold;
}
</style>
