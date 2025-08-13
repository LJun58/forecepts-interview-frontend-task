import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons'

import App from './App.vue'
import router from './router'

library.add(faCircleInfo, faCirclePlay)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
