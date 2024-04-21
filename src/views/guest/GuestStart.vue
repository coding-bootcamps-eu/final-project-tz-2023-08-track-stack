<template>
  <h2>GuestStart</h2>
  <h3>Schön, dass du da bist!</h3>
  <p>
    Herzlich Willkommen bei Senftraxx, die App wo Musikwünsche wahr werden. Gib einfach deinen Namen
    ein und los gehts.
  </p>
  <form>
    <label for="guest-name"></label>
    <input type="text" name="guest-name" placeholder="Dein Name" />
    <!--<button>Ab geht die Post</button>-->
  </form>
  <router-link to="/guest-overview">einloggen</router-link>
</template>
