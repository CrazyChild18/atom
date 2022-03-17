import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import 'bootstrap/dist/css/bootstrap.css';
// 引入EmelemtPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from './http'
// 登陆页面的粒子效果
// 环境安装: npm install vue-particles --save-dev
// Reference: https://blog.csdn.net/weixin_42201180/article/details/111941697
import VueParticles from 'vue-particles'
// register the vue-toasted plugin on vue
import VueToasted  from 'vue-toasted'
// 引入vuex
import Vuex from 'vuex'

// 引入全拼滚动插件
import 'fullpage.js/vendors/scrolloverflow' // Optional. When using scrollOverflow:true
import VueFullPage from 'vue-fullpage.js'


createApp(App).use(router).use(VueFullPage).use(ElementPlus).use(Vuex).use(VueParticles).mount('#app')
Vue.prototype.$axios = axios

Vue.use(VueToasted, {
  // 主题样式 primary/outline/bubble
  theme: 'bubble',
  // 显示在页面哪个位置
  position: 'top-center',
  // 显示多久时间（毫秒）
  duration: 3000,
  // 支持哪个图标集合
  iconPack : 'material', // set your iconPack, defaults to material. material|fontawesome|custom-class
  // 可以执行哪些动作
  action: {
    text: 'Cancel',
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    }
  },
});