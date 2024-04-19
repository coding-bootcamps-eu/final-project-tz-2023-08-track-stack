import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

//---Global Functions
app.config.globalProperties.goBack = function () {
  // Verwende $router, um zurückzunavigieren
  this.$router.go(-1)
}

app.use(createPinia())
app.use(router)

app.mount('#app')
