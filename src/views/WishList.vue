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
          <div>
            <button v-if="isDjLoggedIn" class="contrast btn-play">
              <i class="si-play"></i> abgespielt
            </button>
          </div>
          <div>
            <button
              v-if="isDjLoggedIn"
              @click="deleteWishedSong(request)"
              class="contrast btn-deny"
            >
              <i class="si-trash"></i> löschen
            </button>
          </div>
          <button :class="{ voted: request.userHasVoted }" @click="toggleVote(request)">
            {{ request.userHasVoted ? 'zurücknehmen' : 'abstimmen' }}
          </button>
        </summary>
        <div v-if="request.message">
          <section v-if="request.message">
            <figure>
              <figcaption>
                <strong>{{ request.who.name }}</strong>
              </figcaption>
            </figure>
            <blockquote>
              {{ request.message }}
            </blockquote>
            <hr />
          </section>
        </div>
      </details>
    </li>
  </ol>
  <div class="grid">
    <div>
      <router-link to="/wishsong">
        <button><i class="si-grid"></i> Song wünschen</button>
      </router-link>
    </div>
    <div>
      <router-link v-if="!isDjLoggedIn" to="/guest-overview">
        <button><i class="si-grid"></i> Gast Übersicht</button>
        <!-- muss dynamisch sein, Gast oder DJ -->
      </router-link>
    </div>
    <div>
      <router-link v-if="isDjLoggedIn" to="/dj-overview">
        <button><i class="si-grid"></i> DJ Übersicht</button>
        <!-- muss dynamisch sein, Gast oder DJ -->
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
    },

    async deleteWishedSong(request) {
      await fetch(`http://localhost:3000/requests/${request.id}`, {
        method: 'Delete'
      })
      // // Idee ist, dass der Gast informiert wird, dass sein Wuncsh abgelehnt wurde.
      // const guest = localStorage.getItem('guestData')

      // if ((request.who.id = guest.id)) {
      //   alert('Leider wurde dein Musikwunsch abgelehnt. Wir bitten um dein Verständnis.')
      // }
    }
  }
}
</script>

<style scoped>
summary.grid {
  background: var(--pico-code-background-color);
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
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
button.voted {
  background-color: var(--pico-primary-hover-background);
}
details[open] > summary {
  /* PROBLEM */
  margin-bottom: 0;
}
</style>
