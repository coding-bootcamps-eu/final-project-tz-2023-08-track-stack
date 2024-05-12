<template>
  <small><active-dj>nicht eingeloggt</active-dj> @ WishList</small>

  <h2>Wunschliste</h2>
  <p>Hier siehst du was der gewünscht wird.</p>

  <ol>
    <li>
      <details>
        <summary class="grid">
          <span class="suggestions-artist">Fleetwood Mac</span>
          <span class="suggestions-title">The Chain</span>
          <button class="outline">👍</button>
        </summary>
        <section>
          <div role="group">
            <button class="btn-play">abgespielt</button>
            <button class="btn-deny">abgelehnt</button>
          </div>
          <figure>
            <figcaption><time>23:55 Uhr</time>: <cite>Gregor</cite></figcaption>
            <blockquote>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </blockquote>
          </figure>
        </section>
      </details>
    </li>
    <li>
      <details>
        <summary class="grid">
          <span class="suggestions-artist">Fairground Attraction</span>
          <span class="suggestions-title">Perfect</span>
          <button class="outline">👍</button>
        </summary>
        <section>
          <div class="grid">
            <button class="btn-play">abgespielt</button>
            <button class="btn-deny">abgelehnt</button>
          </div>
          <figure>
            <figcaption><time>21:12 Uhr</time>: <cite>Lena</cite></figcaption>
            <blockquote>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </blockquote>
          </figure>
        </section>
      </details>
    </li>
    <li>
      <details>
        <summary class="grid">
          <span class="suggestions-artist">Die Fantastischen Vier</span>
          <span class="suggestions-title">Die Da!?!</span>
          <button class="outline">👍</button>
        </summary>
        <section>
          <div class="grid">
            <button class="btn-play">abgespielt</button>
            <button class="btn-deny">abgelehnt</button>
          </div>
          <figure>
            <figcaption><time>20:41 Uhr</time>: <cite>Jenny</cite></figcaption>
            <blockquote>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </blockquote>
          </figure>
        </section>
      </details>
    </li>
  </ol>
  <div class="grid">
    <router-link to="/guest-overview">
      <button>Gast Übersicht</button
      ><!-- muss dynamisch sein, Gast oder DJ -->
    </router-link>
    <router-link to="/dj-overview">
      <button>DJ Übersicht</button
      ><!-- muss dynamisch sein, Gast oder DJ -->
    </router-link>
  </div>
</template>

<script>
import ActiveDj from '@/components/ActiveDj.vue'

export default {
  components: { ActiveDj }
}
</script>

<style scoped>
li {
  align-content: center;
}
li details {
  background: var(--pico-form-element-background-color);
  align-content: center;
  padding: 1rem;
}
</style>
