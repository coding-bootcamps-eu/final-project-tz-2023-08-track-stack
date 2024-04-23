<template>
  <div>
    <form @submit.prevent="generateQR">
      <p>Enter your URL to create the QR code for your event</p>

      <input type="text" placeholder="e.g senftraxx/GuestOverview.com" v-model="qrText" />

      <img :src="src" alt="QR Code" :width="width" />

      <button type="submit">Generate your QR Code</button>
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
      width: '150'
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
form {
  height: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

input::placeholder {
  font-size: 0.8rem;
}
</style>
