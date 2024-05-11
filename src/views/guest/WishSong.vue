<template>
  <small><active-dj>nicht eingeloggt</active-dj> @ WishSong</small>

  <h2>Wünsch dir was!</h2>
  <p>Hier kannst du dir einen Song wünschen.</p>
  <form @submit.prevent>
    <label class="hidden" for="song-search">Suche nach Titel oder Interpret:</label><br />
    <input type="search" name="song-search" placeholder="Gib hier deinen Wunschtitel ein …" />
    <ol class="song-suggestions">
      <li>
        <span class="suggestions-artist">Fleetwood Mac</span>
        <span class="divider"> - </span>
        <span class="suggestions-title">The Chain</span>
        <hr />
      </li>
      <li>
        <span class="suggestions-artist">Fairground Attraction</span>
        <span class="suggestions-divider"> - </span>
        <span class="suggestions-title">Perfect</span>
        <hr />
      </li>
      <li>
        <span class="suggestions-artist">Die Fantastischen Vier</span>
        <span class="suggestions-divider"> - </span>
        <span class="suggestions-title">Die Da!?!</span>
      </li>
    </ol>
    <textarea type="text" placeholder="Möchtest du jemanden grüßen oder hast eine Bitte?"></textarea
    ><br />
    <label for="anonym"
      ><input type="checkbox" name="anonym" id="anonym" />Ich möchte anonym bleiben</label
    >
    <hr />
    <div class="grid">
      <input
        @click="this.$router.push({ path: '/wishlist' })"
        type="submit"
        value="Wunsch abschicken"
      />
      <router-link to="/guest-overview"
        ><button class="secondary">Zurück zur Übersicht</button></router-link
      >
    </div>
  </form>
</template>

<script>
import ActiveDj from '@/components/ActiveDj.vue'

export default {
  components: { ActiveDj }
}
</script>
<style scoped>
.song-suggestions {
  color: var(--pico-form-element-placeholder-color);
  background: var(--pico-form-element-background-color);
  border: 1px solid var(--pico-range-active-border-color);
  border-radius: var(--pico-border-radius);
  padding: calc(var(--pico-form-element-spacing-vertical) * 1.5) 0;
  padding-inline-start: var(--pico-form-element-spacing-horizontal);
  list-style: none;
}
</style>
