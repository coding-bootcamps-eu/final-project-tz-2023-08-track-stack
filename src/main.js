import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './styles/normalize.css'
import './styles/pico.yellow.css'
import './styles/custom-pico.css'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App)

app.use(VueSweetalert2)

app.use(createPinia())
app.use(router)

app.mount('#app')

//---Global Functions
app.config.globalProperties.goBack = function () {
  // Verwende $router, um zurückzunavigieren
  this.$router.go(-1)
}
