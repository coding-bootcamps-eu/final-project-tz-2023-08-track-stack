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
            <p>{{ event.description }}</p>
          </div>
          <section class="grid">
            <button id="event-edit" @click="this.$router.push({ path: '/edit-event' })">
              Ändern
            </button>
            <button class="contrast btn-play" id="event-status">Online</button>

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
      // Array zur Speicherung von Veranstaltungsdaten
      events: []
    }
  },
  created() {
    // Beim Erstellen der Komponente werden die Veranstaltungsdaten geladen
    this.fetchEvents()
  },
  methods: {
    // Methode zum Abrufen der Veranstaltungsdaten
    async fetchEvents() {
      // Verwendung des Event Stores zum Abrufen und Filtern von Veranstaltungen
      await useEventStore().fetchAndFilterEvents()
      // Aktualisierung der lokalen Daten mit den abgerufenen Veranstaltungen
      this.events = useEventStore().events
    },
    // Methode zum Löschen einer Veranstaltung
    async deleteEvent(eventId) {
      // Verwendung des Event Stores zum Löschen der Veranstaltung
      await useEventStore().deleteEvent(eventId)
      // Aktualisierung der angezeigten Veranstaltungen nach dem Löschen
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

.transparentBackground {
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
