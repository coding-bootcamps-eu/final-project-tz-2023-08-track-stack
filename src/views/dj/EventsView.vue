<template>
  <small><active-dj>nicht eingeloggt</active-dj> @ EventsView</small>
  <h2>Events verwalten</h2>
  <p>Hier verwaltest du deine Veranstaltungen</p>
  <form @submit.prevent>
    <ol>
      <li v-for="event in events" :key="event.id">
        <details>
          <summary>
            <div class="grid">
              <div
                :style="{
                  background: `radial-gradient(circle, rgba(0, 0, 255, 0.5), rgba(255, 255, 255, 0.2)),
    url('${event.eventImage}') center/cover`
                }"
              ></div>
              <div>
                <h4>{{ event.title }}</h4>
                <p>{{ event.description }}</p>
              </div>
            </div>
          </summary>
          <section class="grid">
            <button class="contrast btn-play" id="event-status">Online</button>
            <button id="event-edit" @click="editEvent(event)">Ändern</button>
            <button class="contrast btn-deny">Offline</button>
            <button id="event-delete" @click="deleteEvent(event.id)">Löschen</button>
          </section>
        </details>
      </li>
    </ol>
  </form>
  <router-link to="/dj-overview"><button>Zurück zur Übersicht</button></router-link>
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
      await eventStore.deleteEvent(eventId)
      this.fetchEvents()
    },
    editEvent(event) {
      const eventStore = useEventStore()
      eventStore.setCurrentEvent(event)
      this.$router.push('/edit-event')
    }
  }
}
</script>

<style scoped>
.grid {
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
</style>
