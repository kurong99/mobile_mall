import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/common.css'
import '@/untils/UIComponents'
//  解决浏览器警告 添加事件管理者’passive’ 优化页面性能
import 'default-passive-events'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
