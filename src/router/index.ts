import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../pages/Home.vue'
import Creative from '../pages/Creative.vue'

// 1. 定义路由规则
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView // 访问根路径 / 时，显示 HomeView 组件
  },
  {
    path: '/creative',
    name: 'creative',
    component: Creative // 访问 /creative 时，显示 Creative 组件
  }
]

// 2. 创建路由实例
const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 模式的 history，去掉 URL 中的 #
  routes
})

export default router