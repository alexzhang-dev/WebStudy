import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入 Element-UI
import ElementUI from 'element-ui'

// 导入 Element-UI相关样式
import 'element-ui/lib/theme-chalk/index.css'

import './plugins/element.js'
// 使用 Element-UI
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
