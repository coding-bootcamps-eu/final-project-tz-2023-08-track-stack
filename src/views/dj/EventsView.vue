<template>
  <small><active-dj>nicht eingeloggt</active-dj> @ EventsView</small>
  <h2>Events verwalten</h2>
  <p>Hier verwaltest du deine Veranstaltungen</p>
  <form @submit.prevent>
    <ol>
      <li v-for="event in events" :key="event.id">
        <details>
          <summary>
            {{ event.title }}
          </summary>
          <div class="grid twothree">
            <div
              :style="{
                background: `url('${event.eventImage}') center/cover`
              }"
            ></div>
            <div>
              <p>{{ event.description }}</p>
              <section class="grid">
                <button id="event-edit" @click="editEvent(event.id)">Ändern</button>
                <button id="event-delete" @click="deleteEvent(event.id)">Löschen</button>
              </section>
            </div>
          </div>
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
      if (confirm('Soll das Event wirklich gelöscht werden?')) {
        await eventStore.deleteEvent(eventId)
      }
      this.fetchEvents()
    },
    editEvent(eventId) {
      const eventStore = useEventStore()
      eventStore.setCurrentEventId(eventId)
      this.$router.push('/edit-event')
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
</style>
