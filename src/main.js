import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/common.css' // 公共CSS
import './assets/js/element.js'
import './assets/js/iconfont.js' // 阿里巴巴矢量库
import './assets/js/common-function.js' // 公共方法
import './assets/js/http.js' // http请求
import './assets/js/common-variable.js' // 公共变量 
import './assets/js/common-component.js' // 公共组件



Vue.config.productionTip = false;



new Vue({
  el:"#app",
  router:router, 
  render: h => h(App),
}).$mount('#app')
