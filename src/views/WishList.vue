<template>
  <small><active-dj>nicht eingeloggt</active-dj> @ WishList</small>

  <h2>Wunschliste</h2>
  <p>
    Hier findest du die bisher eingegangen Musikwünsche, vote gerne, damit dein favorisierter Titel
    nach oben rutscht.
  </p>

  <ol>
    <li v-for="request in sortedRequest" :key="request.id">
      <details name="accordion">
        <summary role="button" class="grid outline contrast">
          <hgroup>
            <h3>{{ request.title }}</h3>
            <p>{{ request.artist }}</p>
          </hgroup>
          <p class="votes">
            <b>{{ request.likes }}</b> Stimmen gezählt
          </p>
          <button @click="updateLikes(request)">Abstimmen 👍</button>
        </summary>
        <section>
          <div role="group">
            <button class="contrast btn-play">abspielen</button>
            <button class="contrast btn-deny">ablehnen</button>
          </div>
          <figure>
            <figcaption>
              <!-- <time>23:55 Uhr</time>:  -->
              <strong>{{ request.who.name }}</strong>
            </figcaption>
            <blockquote>
              {{ request.message }}
            </blockquote>
          </figure>
          <hr />
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
  data() {
    return {
      // Die Requests für ein bestimmtes Event
      requests: [],
      eventId: null
    }
  },

  components: { ActiveDj },

  created() {
    this.getEventIdFromlocalStorage()

    // Event Source for streaming
    const eventSource = new EventSource('http://localhost:3000/stream/' + this.eventId)

    eventSource.addEventListener('message', (apievent) => {
      this.requests = JSON.parse(apievent.data)
    })
  },
  computed: {
    sortedRequest() {
      const sortedLikes = this.requests.slice()

      // Feature, Timeout nach Klick + Vue Animationen
      return sortedLikes.sort((a, b) => {
        return b.likes - a.likes
      })
    }
  },
  methods: {
    async updateLikes(request) {
      // nur einmal pro gast
      request.likes = request.likes + 1

      await fetch(`http://localhost:3000/requests/${request.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      })
    },

    getEventIdFromlocalStorage() {
      //EventId aus dem local Storage holen
      const eventDataFromLocalStorage = localStorage.getItem('eventData')
      if (eventDataFromLocalStorage) {
        const eventData = JSON.parse(eventDataFromLocalStorage)
        this.eventId = eventData.id
      }
    }
  }
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
