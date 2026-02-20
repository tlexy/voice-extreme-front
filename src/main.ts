import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'

// 引入Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// 图标
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')