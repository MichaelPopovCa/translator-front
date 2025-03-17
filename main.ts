import {App, createApp} from 'vue'
import Root from './App.vue'
import store from "./store";
import { library, IconPack } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app: App<Element> = createApp(Root)

library.add(
    fas as IconPack
)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(store)
app.mount('#app')
