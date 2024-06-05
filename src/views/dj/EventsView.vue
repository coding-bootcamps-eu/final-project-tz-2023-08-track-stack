<template>
  <active-dj class="menu">nicht eingeloggt</active-dj>
  <h2>Events verwalten</h2>
  <p>Hier verwaltest du deine Veranstaltungen</p>
  <form @submit.prevent>
    <ol>
      <li v-for="event in events" :key="event.id">
        <details name="accordion">
          <summary>
            {{ event.title }}
          </summary>
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
                  <button id="event-edit" type="button" @click="setCurrentEvent(event.id)">
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
        </details>
      </li>
    </ol>
  </form>
  <router-link to="/dj-overview"
    ><button class="contrast"><i class="si-grid"></i> Zurück zur Übersicht</button></router-link
  >
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

    async deleteEvent(eventId) {
      const eventStore = useEventStore()
      if (confirm('Soll das Event wirklich gelöscht werden?')) {
        await eventStore.deleteEvent(eventId)
      }
      this.fetchEvents()
    },

    editEvent(eventId) {
      const eventStore = useEventStore()
      eventStore.setCurrentEventId(eventId)
      this.$router.push('/edit-event')
    },

    // soll Event aktivieren, eventData füllen
    async setCurrentEvent(eventId) {
      const eventStore = useEventStore()
      const event = await eventStore.fetchEvent(eventId)

      localStorage.setItem('eventData', JSON.stringify(event))
      this.$router.push({ path: '/wishlist' })
    }
  }
}
</script>

<style scoped>
.grid.twothree {
  grid-template-columns: 1fr 3fr;
}
details {
  border-radius: 0.25rem;
  border: black 1px solid;
  padding: 1rem;
}

details summary[role='button']::after {
  height: 100%;
}

.eventimage {
  width: 100%;
}
</style>
