<template>
  <active-dj v-if="isDjLoggedIn" class="menu">nicht eingeloggt</active-dj>
  <h2>Wunschliste</h2>
  <p>
    Hier findest du die bisher eingegangen Musikwünsche. Stimme gerne für deine Lieblingstitel ab.
    Je mehr Gäste für einen Titel abstimmen desto höher steigt dieser auf.
  </p>
  <div class="grid">
    <router-link v-if="isDjLoggedIn" to="/dj-overview" class="fullwidth">
      <button><i class="si-grid"></i> DJ Übersicht</button>
    </router-link>

    <router-link v-if="!isDjLoggedIn" to="/guest-overview" class="fullwidth">
      <button><i class="si-grid"></i> Gast Übersicht</button>
      <!-- muss dynamisch sein, Gast oder DJ -->
    </router-link>

    <router-link v-if="!isDjLoggedIn" to="/wishsong" class="fullwidth">
      <button class="border"><i class="si-gift"></i> Song wünschen</button>
    </router-link>
  </div>
  <hr />

  <ol>
    <transition-group name="wishList">
      <li v-for="request in sortedRequest" :key="request.id">
        <article>
          <body class="grid">
            <hgroup class="title-artist">
              <h3>{{ request.title }}</h3>
              <p>{{ request.artist }}</p>
            </hgroup>
            <p class="votes">
              <b>{{ request.likes }}</b> {{ votesText(request.likes) }}
            </p>
            <fieldset role="group">
              <button
                @click="markSongAsPlayed(request)"
                v-if="isDjLoggedIn"
                class="contrast outline"
              >
                <i class="si-play"></i> abgespielt
              </button>
              <button v-if="isDjLoggedIn" @click="deleteWishedSong(request)" class="contrast">
                <i class="si-trash"></i> löschen
              </button>

              <button
                v-if="!isDjLoggedIn"
                :class="{ voted: request.userHasVoted, 'not-voted': !request.userHasVoted }"
                @click="toggleVote(request)"
              >
                <i class="si-heart"></i>
                {{ request.userHasVoted ? 'zurücknehmen' : 'abstimmen' }}
              </button>
            </fieldset>
          </body>
          <footer v-if="request.message && isDjLoggedIn">
            <section v-if="request.message">
              <figure>
                <figcaption>
                  <strong
                    >{{ request.who.name }} <span v-if="request.who.name">schrieb:</span></strong
                  >
                </figcaption>
              </figure>
              <blockquote>
                {{ request.message }}
              </blockquote>
            </section>
          </footer>
        </article>
      </li>
    </transition-group>
  </ol>
  <hr />

  <details>
    <summary role="button" class="outline secondary">Bereits abgespielte Songs anzeigen …</summary>
    <ol>
      <li v-for="song in showPlayedSongs" :key="song.id">
        <article>
          <body class="grid">
            <hgroup>
              <h3>{{ song.title }}</h3>
              <p>{{ song.artist }}</p>
            </hgroup>
            <p class="votes">
              <b>{{ song.likes }}</b> {{ votesText(song.likes) }}
            </p>
          </body>
        </article>
      </li>
    </ol>
  </details>
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

    const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/stream/${this.eventId}`)

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
      return this.requests
        .filter((request) => request.open !== false)
        .sort((a, b) => b.likes - a.likes)
    },

    showPlayedSongs() {
      return this.requests.filter((request) => request.open === false)
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

      await fetch(`${import.meta.env.VITE_API_URL}/requests/${request.id}`, {
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
      await fetch(`${import.meta.env.VITE_API_URL}/requests/${request.id}`, {
        method: 'Delete'
      })
      // Entferne den gelöschten Wunsch aus der Liste
      this.requests = this.requests.filter((r) => r.id !== request.id)
    },

    async markSongAsPlayed(request) {
      const oldRequest = { ...request }
      oldRequest.open = false

      const response = await fetch(`${import.meta.env.VITE_API_URL}/requests/${request.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(oldRequest)
      })
      const updatedSong = await response.json()
      // Füge den aktualisierten request zur Liste der gespielten Songs hinzu
      this.playedSongs.push(updatedSong)

      // Entferne den request aus der Liste der Musikwünsche
      this.requests = this.requests.filter((r) => r.id !== request.id)
    },
    votesText(likes) {
      return likes === 1 ? 'Stimme gezählt' : 'Stimmen gezählt'
    }
  }
}
</script>

<style scoped>
article body.grid {
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
}

hgroup {
  margin-bottom: 0;
}

article body.grid > * {
  align-content: center;
  justify-items: stretch;
  margin-bottom: 0;
}

.title-artist h3 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Transiton der Liste */
/* moveAnimation */
.wishList-move {
  transition: transform 0.5s ease-in-out;
}
/* deleteAnimation */
.wishList-enter-active,
.wishList-leave-active {
  transition: all 0.5s;
}

.wishList-enter,
.wishList-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
