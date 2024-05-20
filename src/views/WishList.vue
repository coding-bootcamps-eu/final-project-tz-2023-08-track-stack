<template>
  <small><active-dj>nicht eingeloggt</active-dj> @ WishList</small>

  <h2>Wunschliste</h2>
  <p>
    Hier findest du die bisher eingegangen Musikwünsche, vote gerne, damit dein favorisierter Titel
    nach oben rutscht.
  </p>

  <ol>
    <li>
      <details name="accordion">
        <summary role="button" class="grid outline contrast">
          <hgroup>
            <h3>The Chain</h3>
            <p>Fleetwood Mac</p>
          </hgroup>
          <p class="votes"><b>4</b> Stimmen gezählt</p>
          <button>Abstimmen 👍</button>
        </summary>
        <section>
          <div role="group">
            <button class="contrast btn-play">abspielen</button>
            <button class="contrast btn-deny">ablehnen</button>
          </div>
          <figure>
            <figcaption><time>23:55 Uhr</time>: <strong>Gregor</strong></figcaption>
            <blockquote>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </blockquote>
          </figure>
          <hr />
          <figure>
            <figcaption><time>22:15 Uhr</time>: <strong>Larissa</strong></figcaption>
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
      <details name="accordion">
        <summary role="button" class="grid outline contrast">
          <hgroup>
            <h3>Perfect</h3>
            <p>Fairground Attraction</p>
          </hgroup>
          <p class="votes"><b>2</b> Stimmen gezählt</p>
          <button>Abstimmen 👍</button>
        </summary>
        <section>
          <div class="grid">
            <button class="btn-play">abgespielt</button>
            <button class="btn-deny">abgelehnt</button>
          </div>
          <figure>
            <figcaption><time>21:12 Uhr</time>: <strong>Lena</strong></figcaption>
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
      <details name="accordion">
        <summary role="button" class="grid outline contrast">
          <hgroup>
            <h3>Die da?!</h3>
            <p>Die Fantastischen Vier</p>
          </hgroup>
          <p class="votes"><b>1</b> Stimme gezählt</p>
          <button>Abstimmen 👍</button>
        </summary>
        <section>
          <div class="grid">
            <button class="btn-play">abgespielt</button>
            <button class="btn-deny">abgelehnt</button>
          </div>
          <figure>
            <figcaption><time>20:41 Uhr</time>: <strong>Jenny</strong></figcaption>
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
      <details name="accordion">
        <summary role="button" class="grid outline contrast">
          <hgroup>
            <h3>Killing in the name</h3>
            <p>Rage Against the Machine</p>
          </hgroup>
          <p class="votes"><b>0</b> Stimmen gezählt</p>
          <button>Abstimmen 👍</button>
        </summary>
        <section>
          <div class="grid">
            <button class="btn-play">abgespielt</button>
            <button class="btn-deny">abgelehnt</button>
          </div>
          <figure>
            <figcaption><time>20:41 Uhr</time>: <strong>Jenny</strong></figcaption>
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
summary.grid {
  background: var(--pico-code-background-color);
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 50% 1fr 1fr 5%;
  }
}
hgroup {
  margin-bottom: 0;
}
summary > * {
  align-content: center;
  justify-items: stretch;
  margin-bottom: 0;
}
details summary[role='button']::after {
  height: 100%;
}
</style>
