import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'

// 引入EmelemtPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 登陆页面的粒子效果
// 环境安装: npm install vue-particles --save-dev
// Reference: https://blog.csdn.net/weixin_42201180/article/details/111941697
import VueParticles from 'vue-particles'

createApp(App).use(router).use(ElementPlus).use(VueParticles).mount('#app')