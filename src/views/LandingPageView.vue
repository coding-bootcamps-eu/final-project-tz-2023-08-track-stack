<template>
  <head>
    <title>LandingPage</title>
  </head>
  <body>
    <!-- Einführung-->
    <section>
      <p>{{ greeting }}</p>
    </section>
    <!-- Weiter für DJ-->
    <button>DJ</button>
    <!-- Weiter für User-->
    <section>
      <input type="text" />
      <button>User</button>
    </section>
  </body>
</template>

<script>
export default {
  data() {
    return {
      greeting: 'Greetings',
      projectName: 'TrackStack'
    }
  }
}
</script>

<style></style>
