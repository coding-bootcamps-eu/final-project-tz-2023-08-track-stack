<template>
  <!-- Button der mir QrCode Zeigt -->
  <div @mouseover="isHovered = true" @mouseleave="isHovered = false">
    <form @submit.prevent="showQR">
      <button class="secondary">Show QR-Code</button>
    </form>

    <div v-if="isHovered" class="hover-text">
      <p>{{ this.url }}</p>
    </div>
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
      displayedImage: '', // QR-Code Image
      src: '',
      width: '300',
      url: '', //Event Url
      isHovered: false
    }
  },
  mounted() {
    this.generateQRCodeUrl()
  },
  // Richtiger Testlink: https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:5173/guest-start?eventId=06335b1d-6565-4b28-915b-9149ec5556be
  methods: {
    generateQRCodeUrl() {
      const eventQrCodeImage = (this.src =
        'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' +
        `${import.meta.env.VITE_URL}/guest-start?eventId=${this.eventId}`)

      this.url = `${import.meta.env.VITE_URL}/guest-start?eventId=${this.eventId}`
      this.displayedImage = eventQrCodeImage
    },
    showQR() {
      // alert
      this.$swal
        .fire({
          title: 'QR-Code:',
          // icon: 'warning',
          html: `<img src="${this.displayedImage}" alt="QR CODE" />`,
          showCancelButton: true,
          confirmButtonColor: '#5E26ED',
          cancelButtonColor: '#000',
          confirmButtonText: 'Download Code',
          cancelButtonText: 'Kopiere Link in Zwischenablage'
        })
        .then((result) => {
          //Pressed Download, started den Download des QR Images
          if (result.isConfirmed) {
            this.downloadQR()
          }
          //Pressed OK, kopiert den EventLink ins Clipboard
          if (!result.isConfirmed) {
            navigator.clipboard.writeText(this.url)
          }
        })
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

<style scoped>
.hover-text {
  margin-top: 10px;
  font-size: 14px;
}
</style>
