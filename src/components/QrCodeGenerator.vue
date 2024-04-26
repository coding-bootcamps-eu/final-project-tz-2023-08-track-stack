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

      <button class="secondary" @click="downloadQR">Download QR Code</button>
    </form>
  </div>
</template>

<script>
import SenfTraxxLogo from '/images/logo_senftraxx.svg'

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
    },

    // !!! Neues Thema !!! Wenn ihr euch über Canvas informieren wollt: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial

    downloadQR() {
      // Create a temporary canvas element
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      // Set canvas dimensions
      canvas.width = 150
      canvas.height = 150

      // Load the image onto the canvas
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = () => {
        context.drawImage(img, 0, 0, 150, 150)

        // Trigger the download
        const link = document.createElement('a')
        link.download = 'senftraxx_qr_code.png'
        link.href = canvas.toDataURL('image/png')
        link.click()

        this.src = SenfTraxxLogo
      }
      img.src = this.src
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
