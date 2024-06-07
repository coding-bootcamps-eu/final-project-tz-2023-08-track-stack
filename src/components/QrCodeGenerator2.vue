<template>
  <div>
    <form @submit.prevent="downloadQR">
      <img class="qr-img" :src="displayedImage" alt="QR Code" :width="width" />
      <p>{{ this.url }}</p>

      <button class="secondary">Download QR Code</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    eventId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      displayedImage: '',
      src: '',
      width: '300',
      url: ''
    }
  },
  mounted() {
    this.generateQRCodeUrl()
  },

  methods: {
    generateQRCodeUrl() {
      const eventQrCodeImage = (this.src =
        'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' +
        `localhost:5173/guest-start?eventId=${this.eventId}`)

      this.url = `http://localhost:5173/guest-start?eventId=${this.eventId}`
      this.displayedImage = eventQrCodeImage
    },

    downloadQR() {
      // Erstelle ein temporäres canvas element
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      // Setze canvas dimensionen
      canvas.width = 150
      canvas.height = 150

      // Lade das Bild ins canvas
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = () => {
        context.drawImage(img, 0, 0, 150, 150)

        // Trigger den download
        const link = document.createElement('a')
        link.download = 'holaloop_qr_code.png'
        link.href = canvas.toDataURL('image/png')
        link.click()

        this.src = '/images/logo_hulaloop.svg'
      }
      img.src = this.src
    }
  }
}
</script>
