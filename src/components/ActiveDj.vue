<!-- Eine Komponente die man sich einfach oben in ne View einfügen kann, um den eingeloggten User im Blick zu behalten -->

<template>
  <span id="activDJ">{{ activeDJ.username }}</span>
</template>

<script>
import { useDjStore } from '@/stores/DjStore'

export default {
  data() {
    const loggedInDj = useDjStore().activeDj

    return {
      activeDJ: loggedInDj
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
