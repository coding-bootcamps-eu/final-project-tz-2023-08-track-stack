<template>
  <h2>GuestOverview</h2>
  <h3>Hallo NAME,</h3>
  <p>hier bist du auf deinem Dashboard</p>
  <form>
    <button>Song wünschen</button>
    <button>Zur Wunschliste</button>
  </form>

  <router-link to="/wishsong"><button>Song wünschen</button></router-link>
  <router-link to="/wishlist"><button>Zur Wunschliste</button></router-link>
</template>
