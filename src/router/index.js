//路由定义
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routerArr = []
let routeMap = {}
const contexts = require.context('../view', true, /\.vue$/)
contexts.keys().forEach(value => {
  const path = value.substr(value.indexOf('/'), value.lastIndexOf('.') - 1)
  const componentLocation = value.substr(value.indexOf('.') + 1, value.lastIndexOf('.') - 1)
  const componentName = componentLocation.substr(componentLocation.lastIndexOf('/') + 1)
  routerArr.push({
    path: path,
    name: componentName,
    component: () => import(/* webpackChunkName: "alarm" */ `../view${componentLocation}`)
  })
  routeMap[path] = true
})


// 用来判断路由是否存在
Vue.prototype.$routes = routeMap

export default new Router({
  mode: 'hash',
  routes: routerArr
})