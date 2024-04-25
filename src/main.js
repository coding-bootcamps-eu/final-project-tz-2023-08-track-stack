import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './styles/normalize.css'
import './styles/pico.yellow.css'
import './styles/custom-pico.css'

const app = createApp(App)

//---Global Functions
app.config.globalProperties.goBack = function () {
  // Verwende $router, um zurückzunavigieren
  this.$router.go(-1)
}

app.use(createPinia())
app.use(router)

app.mount('#app')
