<template>
  <h1>Herzlich Willkommen!</h1>
  <p>Senftraxx ist deine DJ App, die keine Wünsche offen lässt.</p>

  <div class="grid">
    <article>
      <header><h2>Gast</h2></header>
      <p>Du bist Gast? Hier kannst du deinen Namen eintragen und Musiktitel wünschen.</p>
      <footer>
        <router-link to="/guest-start"><button>Start als Gast</button></router-link>
      </footer>
    </article>
    <article>
      <header><h2>DJ</h2></header>
      <p>
        Du bist DJ? Hier kannst du dich als DJ registrieren, Events und Playlists erstellen bzw.
        verwalten.
      </p>
      <footer>
        <router-link to="/login"><button>Start als DJ</button></router-link>
      </footer>
    </article>
  </div>
</template>
