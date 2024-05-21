<template>
  <small><active-dj>nicht eingeloggt</active-dj> @ EventsView</small>
  <h2>Events verwalten</h2>
  <p>Hier verwaltest du deine Veranstaltungen</p>
  <form @submit.prevent>
    <ol>
      <li v-for="event in events" :key="event.id">
        <details
          :style="{
            background: `radial-gradient(circle, rgba(0, 0, 255, 0.5), rgba(255, 255, 255, 0.2)),
    url('${event.eventImage}') center/cover`
          }"
        >
          <summary role="search">
            <div class="trasparentBackground">
              <h4>{{ event.title }}</h4>
            </div>
          </summary>
          <div class="trasparentBackground">
            <p>{{ event.description }} <br /><br />playlist:</p>
          </div>
          <section class="grid">
            <button id="event-edit" @click="this.$router.push({ path: '/edit-event' })">
              Ändern
            </button>
            <button id="event-status">Online/Offline</button>
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
      await useEventStore().fetchAndFilterEvents()
      this.events = useEventStore().events
    },
    async deleteEvent(eventId) {
      await useEventStore().deleteEvent(eventId)
      this.fetchEvents()
    }
  }
}
</script>

<style scoped>
details {
  border: black 1px solid;
  padding: 1rem 3rem;
}

.trasparentBackground {
  border-radius: 5px;
  background: #ffffffb5;
}
@media (prefers-color-scheme: dark) {
  .trasparentBackground {
    border-radius: 5px;
    background: #333333b5;
  }
  details {
    border: white 1px solid;
  }
}
</style>
