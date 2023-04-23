// 引入 vue
import { createApp } from 'vue'
// 引入 pinia
import { createPinia } from 'pinia'
// 引入饿了么
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

import 'default-passive-events'

const pinia = createPinia()
// 做pinia数据持久化
import piniaPluginPersist from "pinia-plugin-persist"
pinia.use(piniaPluginPersist)

import './assets/common.css'

const app = createApp(App)

// 挂载
app.use(pinia)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
