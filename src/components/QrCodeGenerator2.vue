<template>
  <div>
    <form @submit.prevent="downloadQR">
      <label for="qr-code">QR Code:</label>

      <img class="qr-img" :src="displayedImage" alt="QR Code" :width="width" />

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
      src: '',
      width: '300'
    }
  },
  computed: {
    displayedImage() {
      // Überprüfe, ob die eventId vorhanden ist
      // Wenn ja, zeige den QR-Code an, ansonsten das Standardbild
      if (this.eventId) {
        return this.generateQRCodeUrl
      } else {
        return '/images/logo_hulaloop.svg'
      }
    },

    generateQRCodeUrl() {
      const eventQrCodeImage = (this.src =
        'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' +
        `localhost:5173/guest-start?eventId=${this.eventId}`)

      return eventQrCodeImage
    }
  },

  methods: {
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
        link.download = 'holahoop_qr_code.png'
        link.href = canvas.toDataURL('image/png')
        link.click()

        this.src = '/images/logo_hulaloop.svg'
      }
      img.src = this.src
    }
  }
}
</script>

<!-- <template>
  <div>
    <form @submit.prevent>
      <p>Gib die gewünschte URL ein, um den QR Code deiner Veranstaltung zu generieren</p>
      <label for="qr-code">QR Code:</label>
      <input
        class="qr-input"
        name="qr-code"
        type="text"
        placeholder="e.g Holaloop/GuestOverview.com"
        v-model="qrText"
      />

      <img class="qr-img" :src="src" alt="QR Code" :width="width" />

      <button type="submit">Generiere QR Code</button>

      <button class="secondary" @click="downloadQR">Download QR Code</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      qrText: '',
      src: '/images/logo_hulaloop.svg',
      width: '300'
    }
  }
}
</script> -->
