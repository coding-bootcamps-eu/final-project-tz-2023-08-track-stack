<template>
  <div>
    <form @submit.prevent="generateQR">
      <p>Gib die gewünschte URL ein, um den QR Code deiner Veranstaltung zu generieren</p>
      <label for="qr-code">QR Code:</label>
      <input
        class="qr-input"
        name="qr-code"
        type="text"
        placeholder="e.g senftraxx/GuestOverview.com"
        v-model="qrText"
      />

      <img class="qr-img" :src="src" alt="QR Code" :width="width" />

      <button type="submit">Generiere QR Code</button>
    </form>
  </div>
</template>

<script>
import SenfTraxxLogo from '@/images/logo_senftraxx.svg'

export default {
  data() {
    return {
      qrText: '',
      src: SenfTraxxLogo,
      width: '300'
    }
  },

  methods: {
    generateQR() {
      const eventQrCodeImage = (this.src =
        'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + this.qrText)

      this.qrText = ''

      return eventQrCodeImage
    }
  }
}
</script>

<style scoped>
.qr-img {
  padding-block: 1rem;
}
.qr-code::placeholder {
  font-size: 0.8rem;
}
</style>
