import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import 'bootstrap/dist/css/bootstrap.css';
// 引入EmelemtPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 登陆页面的粒子效果
// 环境安装: npm install vue-particles --save-dev
// Reference: https://blog.csdn.net/weixin_42201180/article/details/111941697
import VueParticles from 'vue-particles'

// 引入vuex
import Vuex from 'vuex'

// 引入全拼滚动插件
import 'fullpage.js/vendors/scrolloverflow' // Optional. When using scrollOverflow:true
import VueFullPage from 'vue-fullpage.js'


createApp(App).use(router).use(VueFullPage).use(ElementPlus).use(Vuex).use(VueParticles).mount('#app')
