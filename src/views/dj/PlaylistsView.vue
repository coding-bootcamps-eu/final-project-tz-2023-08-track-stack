<template>
  <small>PlaylistsView</small>
  <h2>Playlisten verwalten</h2>
  <p>Hier verwaltest du deine Playlisten</p>
  <form @submit.prevent>
    <ol>
      <li>
        <details>
          <summary role="button" class="outline contrast">Bootcamp Rock Mix</summary>
          <section class="grid">
            <input
              id="event-edit"
              @click="this.$router.push({ path: '/edit-playlist' })"
              type="submit"
              value="Ändern"
            />
            <button id="event-duplicate">Duplizieren</button>
            <button id="event-delete">Löschen</button>
          </section>
        </details>
      </li>
      <li>
        <details>
          <summary role="button" class="outline contrast">Schlagerparty und Ballermann</summary>
          <section class="grid">
            <input
              id="event-edit"
              @click="this.$router.push({ path: '/edit-playlist' })"
              type="submit"
              value="Ändern"
            />
            <button id="event-duplicate">Duplizieren</button>
            <button id="event-delete">Löschen</button>
          </section>
        </details>
      </li>
      <li>
        <details>
          <summary role="button" class="outline contrast">Elektro, Minimal und Housemusic</summary>
          <section class="grid">
            <input
              id="event-edit"
              @click="this.$router.push({ path: '/edit-playlist' })"
              type="submit"
              value="Ändern"
            />
            <button id="event-duplicate">Duplizieren</button>
            <button id="event-delete">Löschen</button>
          </section>
        </details>
      </li>
    </ol>
  </form>
  <router-link to="/dj-overview"><button>Zurück zur Übersicht</button></router-link>
</template>
