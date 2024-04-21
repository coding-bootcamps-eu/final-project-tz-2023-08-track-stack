<template>
  <h2>EventsView</h2>
  <h3>Events verwalten</h3>
  <p>Hier verwaltest du deine Veranstaltungen</p>
  <form>
    <ol>
      <li>
        <details>
          <summary>04.05.2024: Abiparty Dortmund</summary>
          <section>
            <button id="event-edit">Ändern</button>
            <button id="event-status">Online/Offline</button>
            <button id="event-delete">Löschen</button>
          </section>
        </details>
      </li>
      <li>
        <details>
          <summary>24.08.2024: 100 Jahre Nolte Küchen</summary>
          <section>
            <button id="event-edit">Ändern</button>
            <button id="event-status">Online/Offline</button>
            <button id="event-delete">Löschen</button>
          </section>
        </details>
      </li>
      <li>
        <details>
          <summary>12.09.2024: DJ Battle 2024</summary>
          <section>
            <button id="event-edit">Ändern</button>
            <button id="event-status">Online/Offline</button>
            <button id="event-delete">Löschen</button>
          </section>
        </details>
      </li>
    </ol>
  </form>
  <router-link to="/dj-overview">Zurück zur Übersicht</router-link>
</template>
