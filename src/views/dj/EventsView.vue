<template>
  <active-dj class="menu">nicht eingeloggt</active-dj>
  <h2>Events verwalten</h2>
  <p>Hier verwaltest du deine Veranstaltungen</p>

  <div class="marginBot grid">
    <router-link to="/create-event" class="fullwidth"
      ><button><i class="si-plus"></i> Event erstellen</button></router-link
    >
    <router-link to="/dj-overview" class="fullwidth"
      ><button class="contrast"><i class="si-grid"></i> Zurück zur Übersicht</button></router-link
    >
  </div>
  <form @submit.prevent>
    <ol>
      <li v-for="event in events" :key="event.id">
        <details name="accordion">
          <summary>
            {{ event.title }}
          </summary>
          <section class="detail-wrapper">
            <p>{{ event.description }}</p>
            <div class="grid">
              <div
                class="eventimage"
                :style="{
                  background: `radial-gradient(circle, rgba(0, 0, 255, 0.5), rgba(255, 255, 255, 0.2)),
    url('${event.eventImage}') center/cover`
                }"
              ></div>

              <div>
                <section class="grid">
                  <div class="fullwidth">
                    <button
                      id="event-edit"
                      class="contrast"
                      type="button"
                      @click="activateCurrentEvent(event.id)"
                    >
                      <i class="si-check"></i> Aktivieren
                    </button>
                    <button id="event-edit" type="button" @click="editEvent(event.id)">
                      <i class="si-edit"></i> Ändern
                    </button>
                    <button id="event-delete" type="button" @click="deleteEvent(event.id)">
                      <i class="si-trash"></i> Löschen
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </details>
      </li>
    </ol>
  </form>
</template>

<script>
import ActiveDj from '@/components/ActiveDj.vue'
import { useEventStore } from '@/stores/EventStore'

export default {
  components: { ActiveDj },
  data() {
    return {
      events: []
    }
  },
  created() {
    this.fetchEvents()
  },
  methods: {
    async fetchEvents() {
      const eventStore = useEventStore()
      await eventStore.fetchAndFilterEvents()
      this.events = eventStore.events
    },

    deleteEvent(eventId) {
      const eventStore = useEventStore()

      this.$swal
        .fire({
          title: 'Möchtest du das Event wirklich löschen?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#5E26ED',
          cancelButtonColor: '#000',
          confirmButtonText: 'Ja, löschen!',
          cancelButtonText: 'abbrechen'
        })
        .then((result) => {
          if (result.isConfirmed) {
            eventStore.deleteEvent(eventId).then(() => {
              // Entferne eventData mit der gleichen ID aus dem local Storage
              let eventData = JSON.parse(localStorage.getItem('eventData'))
              if (eventData && eventData.id === eventId) {
                localStorage.removeItem('eventData')
              }
              this.$swal.fire({
                title: 'Gelöscht!',
                text: 'Das Event wurde erfolgreich gelöscht.',
                icon: 'success'
              })
              this.fetchEvents()
            })
          }
        })
    },

    editEvent(eventId) {
      const eventStore = useEventStore()
      eventStore.setCurrentEventId(eventId)
      this.$router.push('/edit-event')
    },

    // soll Event aktivieren, eventData füllen
    async activateCurrentEvent(eventId) {
      const eventStore = useEventStore()
      const currentDjEvents = useEventStore().events

      // Setze alle Events auf inactive
      await Promise.all(
        currentDjEvents.map((event) => {
          if (event.active) {
            event.active = false
            return fetch(`${import.meta.env.VITE_API_URL}/events/${event.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(event)
            })
          }
        })
      )

      // Aktivieren des ausgewählten Events
      const event = await eventStore.fetchEvent(eventId)

      event.active = true

      const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${event.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      })
      const updatedEvent = await response.json()
      console.log(updatedEvent)

      // Aktualisiere localStorage
      localStorage.setItem('eventData', JSON.stringify(event))
      this.$router.push({ path: '/wishlist' })
    }

    // async setCurrentEvent(eventId) {
    //   const eventStore = useEventStore()
    //   const event = await eventStore.fetchEvent(eventId)

    //   localStorage.setItem('eventData', JSON.stringify(event))
    //   this.$router.push({ path: '/wishlist' })
    // }
  }
}
</script>

<style scoped>
.grid.twothree {
  grid-template-columns: 1fr 3fr;
}

details summary[role='button']::after {
  height: 100%;
}

.eventimage {
  width: 100%;
}
</style>
