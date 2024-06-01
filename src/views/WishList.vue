<template>
  <active-dj v-if="isDjLoggedIn" class="menu">nicht eingeloggt</active-dj>
  <div>
    <router-link v-if="isDjLoggedIn" to="/dj-overview">
      <button><i class="si-grid"></i> DJ Übersicht</button>
    </router-link>
  </div>
  <h2>Wunschliste</h2>
  <p>
    Hier findest du die bisher eingegangen Musikwünsche, vote gerne, damit dein favorisierter Titel
    nach oben rutscht.
  </p>

  <ol>
    <transition-group name="wishList">
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
              <button
                @click="markSongAsPlayed(request)"
                v-if="isDjLoggedIn"
                class="contrast btn-play"
              >
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
            <button
              v-if="isDjLoggedIn"
              :class="{ voted: request.userHasVoted, 'not-voted': !request.userHasVoted }"
              @click="toggleVote(request)"
            >
              <i class="si-heart"></i>
              {{ request.userHasVoted ? '-' : '+' }}
            </button>
          </summary>
          <div v-if="request.message && isDjLoggedIn">
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
    </transition-group>
  </ol>
  <h2>Played Songs</h2>
  <ol>
    <li v-for="request in requests" :key="request.id">
      <details name="accordion">
        <summary role="button" class="grid outline contrast">
          <hgroup>
            <h3>{{ request.title }}</h3>
            <p>{{ request.artist }}</p>
          </hgroup>
          <p class="votes">
            <b>{{ request.likes }}</b> Stimmen gezählt
          </p>
        </summary>
        <div v-if="request.message && isDjLoggedIn">
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
      <router-link v-if="!isDjLoggedIn" to="/wishsong">
        <button><i class="si-grid"></i> Song wünschen</button>
      </router-link>
    </div>
    <div>
      <router-link v-if="!isDjLoggedIn" to="/guest-overview">
        <button><i class="si-grid"></i> Gast Übersicht</button>
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
      playedSongs: [],
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
      const newrequest = { ...request } //abkoppeln!
      this.votes[request.id] = true

      if (request.userHasVoted) {
        newrequest.likes -= 1
        newrequest.userHasVoted = false
        this.votes[request.id] = false
      } else {
        newrequest.likes += 1
        newrequest.userHasVoted = true
        this.votes[request.id] = true
      }

      localStorage.setItem('votes', JSON.stringify(this.votes))

      await fetch(`http://localhost:3000/requests/${request.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newrequest)
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
    },

    async markSongAsPlayed(request) {
      const playedRequest = { ...request }
      playedRequest.open = false

      const response = await fetch(`http://localhost:3000/requests/${request.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(playedRequest)
      })

      const updatedSong = await response.json()
      console.log(updatedSong)
      console.log(this.requests)
      return updatedSong
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

details[open] > summary {
  /* PROBLEM */
  margin-bottom: 0;
}

/* Transiton der Liste */
/* moveAnimation */
.wishList-move {
  transition: transform 1.5s ease-in-out;
}
/* deleteAnimation */
.wishList-enter-active,
.wishList-leave-active {
  transition: all 1.5s;
}

.wishList-enter,
.wishList-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
