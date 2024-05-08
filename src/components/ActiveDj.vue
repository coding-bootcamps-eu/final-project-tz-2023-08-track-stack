<!-- Eine Komponente die man sich einfach oben in ne View einfügen kann, um den eingeloggten User im Blick zu behalten -->

<template>
  <span id="activDJ">{{ activeDJ.login }}</span>
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
  color: rgb(25, 255, 36);
  font-size: 2rem;
}
</style>
