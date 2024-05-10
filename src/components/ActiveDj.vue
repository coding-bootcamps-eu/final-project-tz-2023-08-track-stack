<template>

  <!-- <span id="activDJ">{{ activeDJ.username }}</span> -->

  <span id="activDJ">{{ activeDJ }}</span>
</template>

<script>
import { useDjStore } from '@/stores/DjStore'

export default {
  //computed: {
  //  activeDJ() {
   //   return useDjStore().activeDj.username

  data() {
    // const loggedInDj = useDjStore().activeDj
    const loggedInDj = localStorage.getItem('activeDj')

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
