import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

//global style
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

//for better alert animation
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)

const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)

app.use(VueSweetalert2)

app.mount('#app')
