<template>
  <head>
    <title>TestPage</title>
  </head>
  <body>
    <!-- Einführung-->
    <section>
      <p>{{ greeting }}</p>
    </section>
    <!-- Weiter für DJ-->
    <button>Ich bin DJ</button>
    <!-- Weiter für User-->
    <section>
      <button>QR-Link</button>
      <div><input type="text" value="Event-Name" /> <button>GO User</button></div>
    </section>
  </body>
</template>

<script>
export default {
  data() {
    return {
      greeting: 'Greetings'
    }
  }
}
</script>

<style scoped>
* {
  /* margin: 0; */
}

p {
  margin: 0;
}

body {
  margin: 0;
  height: 90vh;
  margin: 0;
  /* background: lightcoral; */
}
</style>
