<template>
  <active-dj v-if="isDjOwner" class="menu">nicht eingeloggt</active-dj>
  <!-- <h1>{{ eventName }}</h1> -->

  <h2>Wunschliste</h2>
  <p>
    Hier findest du die bisher eingegangen Musikwünsche. Stimme gerne für deine Lieblingstitel ab.
    Je mehr Gäste für einen Titel abstimmen desto höher steigt dieser auf.
  </p>
  <div class="grid">
    <router-link v-if="isDjOwner" to="/dj-overview" class="fullwidth">
      <button><i class="si-grid"></i> DJ Übersicht</button>
    </router-link>

    <router-link v-if="!isDjOwner" to="/guest-overview" class="fullwidth">
      <button><i class="si-grid"></i> Gast Übersicht</button>
      <!-- muss dynamisch sein, Gast oder DJ -->
    </router-link>

    <router-link v-if="!isDjOwner" to="/wishsong" class="fullwidth">
      <button class="border"><i class="si-gift"></i> Song wünschen</button>
    </router-link>
  </div>

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
              <button @click="markSongAsPlayed(request)" v-if="isDjOwner" class="contrast outline">
                <i class="si-play"></i> abgespielt
              </button>
              <button v-if="isDjOwner" @click="deleteWishedSong(request)" class="contrast">
                <i class="si-trash"></i> löschen
              </button>

              <button
                v-if="!isDjOwner"
                :class="{ voted: request.userHasVoted, 'not-voted': !request.userHasVoted }"
                @click="toggleVote(request)"
              >
                <i class="si-heart"></i>
                {{ request.userHasVoted ? 'zurücknehmen' : 'abstimmen' }}
              </button>
            </fieldset>
          </body>
          <footer v-if="request.message && isDjOwner">
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
      requests: [],
      playedSongs: [],
      eventId: null,
      votes: JSON.parse(localStorage.getItem('votes')) || {},
      eventDjId: JSON.parse(localStorage.getItem('eventData')).djId || {},
      eventName: JSON.parse(localStorage.getItem('eventData')).title || {},
      eventImage: JSON.parse(localStorage.getItem('eventData')).eventImage || {},
      textElement: null
    }
  },

  components: { ActiveDj },

  created() {
    this.getEventIdFromLocalStorage()

    const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/stream/${this.eventId}`)
    console.log(eventSource)

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
  mounted() {
    // Zugriff auf Header um Eventbild und Überschrift einzufügen
    const header = document.querySelector('header')
    if (header) {
      //Eventbild
      header.style.background = `radial-gradient(circle, rgba(0, 0, 255, 0.5), rgba(255, 255, 255, 0.2)), url(${this.eventImage}) center/cover`
      //EventName
      this.textElement = document.createElement('h1')
      this.textElement.textContent = this.eventName
      header.appendChild(this.textElement)
    }
  },
  beforeUnmount() {
    // Der Header wird wieder zurückgesetzt, EventName/Bild wird resettet
    const header = document.querySelector('header')
    if (header) {
      // Hintergrund des Headers auf den ursprünglichen Zustand zurücksetzen
      header.style.background = `radial-gradient(circle, rgba(0, 0, 255, 0.5), rgba(255, 255, 255, 0.2)), url(/images/header_default.jpg) center/cover`

      // Entferne den eingefügten Text
      // if (this.textElement) {
      header.removeChild(this.textElement)
      //}
    }
  },

  computed: {
    isDjOwner() {
      const djID = localStorage.getItem('activeDjId')

      return this.eventDjId === djID
    },
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
      if (localStorage.getItem('guestData') || localStorage.getItem('activeDjId')) {
        const eventDataFromLocalStorage = localStorage.getItem('eventData')
        if (eventDataFromLocalStorage) {
          const eventData = JSON.parse(eventDataFromLocalStorage)
          this.eventId = eventData.id
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
ol {
  margin: 2rem 0;
}
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
