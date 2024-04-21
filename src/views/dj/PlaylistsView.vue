<template>
  <h2>PlaylistsView</h2>
  <h3>Playlisten verwalten</h3>
  <p>Hier verwaltest du deine Playlisten</p>
  <form>
    <ol>
      <li>
        <details>
          <summary>Bootcamp Rock Mix</summary>
          <section>
            <button id="event-edit">Ändern</button>
            <button id="event-duplicate">Duplizieren</button>
            <button id="event-delete">Löschen</button>
          </section>
        </details>
      </li>
      <li>
        <details>
          <summary>Schlagerparty und Ballermann</summary>
          <section>
            <button id="event-edit">Ändern</button>
            <button id="event-duplicate">Duplizieren</button>
            <button id="event-delete">Löschen</button>
          </section>
        </details>
      </li>
      <li>
        <details>
          <summary>Elektro, Minimal und Housemusic</summary>
          <section>
            <button id="event-edit">Ändern</button>
            <button id="event-duplicate">Duplizieren</button>
            <button id="event-delete">Löschen</button>
          </section>
        </details>
      </li>
    </ol>
  </form>
  <router-link to="/dj-overview">Zurück zur Übersicht</router-link>
</template>
