<template>
  <active-dj v-if="isDjLoggedIn" class="menu">nicht eingeloggt</active-dj>

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
          <button @click="toggleVote(request)">
            {{ request.userHasVoted ? 'Zurücknehmen 👎' : 'Abstimmen 👍' }}
          </button>
        </summary>

        <section v-if="isDjLoggedIn">
          <div role="group">
            <button class="contrast btn-play">abspielen</button>
            <button class="contrast btn-deny">ablehnen</button>
          </div>
          <figure>
            <figcaption>
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
    <div>
      <router-link v-if="!isDjLoggedIn" to="/guest-overview">
        <button>Gast Übersicht</button
        ><!-- muss dynamisch sein, Gast oder DJ -->
      </router-link>
    </div>
    <div>
      <router-link v-if="isDjLoggedIn" to="/dj-overview">
        <button>DJ Übersicht</button
        ><!-- muss dynamisch sein, Gast oder DJ -->
      </router-link>
    </div>
  </div>
</template>

<script>
import ActiveDj from '@/components/ActiveDj.vue'

export default {
  data() {
    return {
      isDjLoggedIn: false,
      requests: [],
      eventId: null,
      votes: JSON.parse(localStorage.getItem('votes')) || {}
    }
  },

  components: { ActiveDj },

  created() {
    this.isDjLoggedInMethode()
    this.getEventIdFromLocalStorage()

    const eventSource = new EventSource('http://localhost:3000/stream/' + this.eventId)

    eventSource.addEventListener('message', (apievent) => {
      // Parsen der empfangenen Daten vom Server
      this.requests = JSON.parse(apievent.data).map((request) => {
        // Initialisiere die Eigenschaft `userHasVoted` für jede Anfrage
        // `userHasVoted` wird auf `true` gesetzt, wenn der Benutzer bereits für diese Anfrage abgestimmt hat
        // Andernfalls wird `userHasVoted` auf `false` gesetzt
        request.userHasVoted = this.votes[request.id] || false
        return request
      })
    })
  },

  computed: {
    sortedRequest() {
      return this.requests.slice().sort((a, b) => b.likes - a.likes)
    }
  },

  methods: {
    isDjLoggedInMethode() {
      const activeDjIdFromLocalStorage = localStorage.getItem('activeDjId')
      if (activeDjIdFromLocalStorage) {
        this.isDjLoggedIn = true
      }
    },

    async toggleVote(request) {
      if (request.userHasVoted) {
        request.likes -= 1
        request.userHasVoted = false
        this.votes[request.id] = false
      } else {
        request.likes += 1
        request.userHasVoted = true
        this.votes[request.id] = true
      }

      localStorage.setItem('votes', JSON.stringify(this.votes))

      await fetch(`http://localhost:3000/requests/${request.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      })
    },

    getEventIdFromLocalStorage() {
      if (localStorage.getItem('guestData')) {
        const eventDataFromLocalStorage = localStorage.getItem('eventData')
        if (eventDataFromLocalStorage) {
          const eventData = JSON.parse(eventDataFromLocalStorage)
          this.eventId = eventData.id
        }
      }

      if (localStorage.getItem('currentEventId')) {
        const eventIdFromLocalStorage = localStorage.getItem('currentEventId')
        if (eventIdFromLocalStorage) {
          this.eventId = eventIdFromLocalStorage
        }
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
