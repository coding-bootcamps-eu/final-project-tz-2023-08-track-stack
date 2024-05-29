<template>
  <h1>Herzlich Willkommen!</h1>
  <p>Hulaloop ist deine DJ App, die keine Wünsche offen lässt.</p>

  <div class="grid">
    <article>
      <header><h2>Gast</h2></header>
      <p>Du bist Gast? Hier kannst du deinen Namen eintragen und Musiktitel wünschen.</p>
      <footer>
        <div>
          <label for="eventSelect">Wähle ein Event:</label>
          <select id="eventSelect" v-model="selectedEventId">
            <option v-for="event in events" :key="event.id" :value="event.id">
              {{ event.title }}
            </option>
          </select>
          <p v-if="selectedEventId">Event ID: {{ selectedEventId }}</p>
        </div>
        <router-link :to="`/guest-start?eventId=${selectedEventId}`">
          <button>Start als Gast <i class="si-chevron-right"></i></button
        ></router-link>
      </footer>
    </article>
    <article>
      <header><h2>DJ</h2></header>
      <p>
        Du bist DJ? Hier kannst du dich als DJ registrieren, Events und Playlists erstellen bzw.
        verwalten.
      </p>
      <footer>
        <router-link to="/login"
          ><button>Start als DJ <i class="si-chevron-right"></i></button
        ></router-link>
      </footer>
    </article>
  </div>
</template>

<script>
import { useEventStore } from '@/stores/EventStore'

export default {
  data() {
    return {
      events: [], // Event aus denen der Guest aussuchen kann
      selectedEventId: null
    }
  },
  async created() {
    // Beim Erstellen der Komponente werden die Veranstaltungsdaten geladen
    this.events = await useEventStore().fetchAllEvents()
  }
}
</script>
