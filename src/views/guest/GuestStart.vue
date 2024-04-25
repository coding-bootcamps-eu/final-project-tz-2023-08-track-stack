<template>
  <small>View: GuestStart</small>
  <h3>Schön, dass du da bist!</h3>
  <p>
    Herzlich Willkommen bei Senftraxx, die App wo Musikwünsche wahr werden. Gib einfach deinen Namen
    ein und los gehts.
  </p>
  <form @submit.prevent>
    <div class="grid">
      <label class="hidden" for="guest-name">Dein Name:</label>
      <input type="text" name="guest-name" placeholder="Trage bitte hier deinen Name ein" />
      <input
        @click="this.$router.push({ path: '/guest-overview' })"
        type="submit"
        value="Ab geht die Post"
      />
    </div>
  </form>
</template>
