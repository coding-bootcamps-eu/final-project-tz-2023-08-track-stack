<template>
  <small><active-dj>nicht eingeloggt</active-dj> @ EventsView</small>
  <h2>Events verwalten</h2>
  <p>Hier verwaltest du deine Veranstaltungen</p>
  <form @submit.prevent>
    <ol>
      <li v-for="event in events" :key="events.id">
        <details>
          <summary role="button" class="outline contrast">{{ event.title }}</summary>
          <section class="grid">
            <input
              id="event-edit"
              @click="this.$router.push({ path: '/edit-event' })"
              type="submit"
              value="Ändern"
            />

            <button id="event-status">Online/Offline</button>
            <button id="event-delete">Löschen</button>
          </section>
        </details>
      </li>
      <!-- <li>
        <details>
          <summary role="button" class="outline contrast">
            24.08.2024: 100 Jahre Nolte Küchen
          </summary>
          <section class="grid">
            <input
              id="event-edit"
              @click="this.$router.push({ path: '/edit-event' })"
              type="submit"
              value="Ändern"
            />
            <button id="event-status">Online/Offline</button>
            <button id="event-delete">Löschen</button>
          </section>
        </details>
      </li>
      <li>
        <details>
          <summary role="button" class="outline contrast">12.09.2024: DJ Battle 2024</summary>
          <section class="grid">
            <input
              id="event-edit"
              @click="this.$router.push({ path: '/edit-event' })"
              type="submit"
              value="Ändern"
            />
            <button id="event-status">Online/Offline</button>
            <button id="event-delete">Löschen</button>
          </section>
        </details>
      </li> -->
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
      //nur Events vom eingeloggten (activeDj) Dj anzeigen
      const localStorageDjId = localStorage.getItem('activeDjId')
      if (!localStorageDjId) {
        // Wenn activeDjId nicht im localStorage vorhanden ist
        return
      }

      await useEventStore().fetchEvents()

      // Die Events anhand der localStorageDjId filtern
      this.events = useEventStore().events.filter((event) => event.djId === localStorageDjId)
    }
  }
}
</script>
