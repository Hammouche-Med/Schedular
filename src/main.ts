import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import 'bootstrap/dist/css/bootstrap.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)

app.mount('#app')
