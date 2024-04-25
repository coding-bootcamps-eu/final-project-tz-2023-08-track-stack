<template>
  <small>EventsView</small>
  <h2>Events verwalten</h2>
  <p>Hier verwaltest du deine Veranstaltungen</p>
  <form @submit.prevent>
    <ol>
      <li>
        <details>
          <summary>04.05.2024: Abiparty Dortmund</summary>
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
          <summary>24.08.2024: 100 Jahre Nolte Küchen</summary>
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
          <summary>12.09.2024: DJ Battle 2024</summary>
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
    </ol>
  </form>
  <router-link to="/dj-overview"><button>Zurück zur Übersicht</button></router-link>
</template>
