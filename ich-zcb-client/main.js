import App from './App'
import store from './store'
import config from '@/app.config.js'

// 引入 uView UI
// import uView from './uni_modules/vk-uview-ui';
import uView from './uni_modules/vk-uview-ui';
// 引入 vk框架前端
import vk from './uni_modules/vk-unicloud';

//引入全局API
import api from '@/api'
import {pageTo} from '@/utils'

//#ifndef VUE3
import Vue from 'vue'

// 引入 uView UI
Vue.use(uView);
// Vue.use(uView);


//引入全局API
Vue.prototype.api = api
Vue.prototype.pageTo = pageTo

// 引入 vk框架前端
Vue.use(vk);
//引入价格过滤器:Vue.filter定义全局过滤器,第一个参数是过滤器的名称，第二个参数是function，接收的参数是price，默认值是0
//框架中的money属性，将价格转换成分存储的，所以显示时需要转为元
Vue.filter("formatPrice",(price=0) => {
	return '￥' + parseFloat(price /100).toFixed(2)
})

// 初始化 vk框架
Vue.prototype.vk.init({
  Vue,               // Vue实例
  config,	           // 配置
});

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
});

app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'

export function createApp() {
  const app  = createSSRApp(App)
  
  // 引入vuex
  app.use(store)
  
  // 引入 uView UI
  // app.use(uView)
  
  // 引入 vk框架前端
  app.use(vk);
  
  // 初始化 vk框架
  app.config.globalProperties.vk.init({
    Vue: app,          // Vue实例
    config,	           // 配置
  });
  
  return { app }
}
// #endif