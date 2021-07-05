import { createApp } from 'vue'
import VueMarkdownIt from 'vue3-markdown-it'

import App from './App.vue'
import router from './router'
import store from './store'

import 'jquery'
import 'bootstrap'

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

createApp(App).use(router).use(store).use(VueMarkdownIt).mount('#app')
