<template>
  <small>View: GuestStart</small>
  <h3>Schön, dass du da bist!</h3>
  <p>
    Herzlich Willkommen bei Hulaloop, die App wo Musikwünsche wahr werden. Gib einfach deinen Namen
    ein und los gehts.
  </p>
  <form @submit.prevent="submitGuestForm">
    <div class="grid">
      <label class="hidden" for="guest-name">Dein Name:</label>
      <input
        type="text"
        name="guest-name"
        id="guest-name"
        :placeholder="placeholderText"
        v-model="inputGuestName"
      />
      <input type="submit" value="Ab geht die Post" />
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      inputGuestName: '',
      placeholderText: 'Dein Name'
    }
  },

  methods: {
    submitGuestForm() {
      // Überprüfen, ob ein Name eingegeben wurde
      if (this.inputGuestName.trim() !== '') {
        // Vergib eine ID
        const guestId = Date.now()

        // Daten im Local Storage speichern
        const guestData = {
          id: guestId,
          name: this.inputGuestName.trim()
        }
        localStorage.setItem('guestData', JSON.stringify(guestData))

        // Weiter zur Gästeübersicht
        this.$router.push({ path: '/guest-overview' })
      } else {
        alert('Bitte gib deinen Namen ein.')
      }
    }
  }
}
</script>
