<template>
<div id="app">

  <!-- 登录 -->
  <login v-show="!isLogin"></login>

  <!-- 侧边栏 -->
  <sidebar v-if="isLogin && isReady"></sidebar>

  <!-- 主体内容 -->
  <div id="container" v-if="isLogin && isReady" >
    <my-header :isMenuOpen="false"></my-header>
    <router-view></router-view>
  </div>


</div>
</template>

<script>
import Vue from 'vue'
import Login from './components/login.vue'
import Sidebar from './components/sidebar.vue'
import MyHeader from './components/header.vue'

import JWT from '@/assets/js/jwt'

export default {
  name: 'app',
  components: {Login, Sidebar, MyHeader},
  data() {
    return {
      isLogin: false,
      isReady: false, // 使用v-if，在加载组件之前不渲染
    }
  },
  watch:{
    // 监听路由，每次路由变化时，判断是否还处于登录状态
    $route(to, from){
      this.isLogin = JWT.IsLogin()
      this.routeChange(to)
    }
  },
  created() {
    // 判断是否登录，以决定是显示登录页面还是进入主页面
    this.isLogin = JWT.IsLogin()
    this.$debug('是否登录：', this.isLogin)
    // 如果登录，则获取一必要预加载数据
    if (this.isLogin) {
      setTimeout( _=> {
        this.routeChange(this.$route)
      }, 10);
      let p1 = this.getBaseConfig()
      let p2 = this.getMenu()
      Promise.all([p1, p2]).then( _=> {
        this.$debug('初始化完成')
        this.isReady = true
      })
    }
  },
  methods: {
    // 判断路由是否存在，如果不存在，跳转到主页
    routeChange(to) {
      if (!this.$routes[to.path]) {
        this.$router.push('/dashboard/index')
      }
    },
    // 获取基础配置(比较全局的，例如一些后端配置的选项)
    getBaseConfig() {
      // return this.$http.get().then(data => {})
      // 模拟API请求
      return new Promise(resolve => {
        resolve(_=>{
          this.$set(Vue.prototype, '$platform', 'Andriod')
          this.$set(Vue.prototype, '$platform', 'iOS')
        })
      })
    },
    // 获取菜单
    getMenu() {
      // return this.$http.get('/v1/menu/list').then(data => {})
      // 模拟API请求
      return new Promise(resolve => {
        resolve(this.$set(Vue.prototype, '$menuList', [
          {id: 1, name: '数据总览', path: '/dashboard/index', children: []},
          {id: 2, name: '用户管理', children: [
            {id: 3, name: '用户数据', path: '/user/index'}
          ]},
          {id: 100, name: 'App发布管理', children: [
            {id: 101, name: '版本升级', path: '/version/list'},
          ]},
          {id: 110, name: '任务管理', children: [
            {id: 111, name: '任务列表', path: '/task/list'},
          ]},
          {id: 130, name: '消息管理', children: [
            {id: 131, name: '推送历史', path: '/message/list'},
          ]},
          {id: 150, name: '角色权限', children: [
            {id: 151, name: '权限管理', path: '/admin/permission'},
          ]}
        ]))
      })
    }
  },
}

</script>

<style lang="css">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
  }

  #container {
    margin-left: 230px;
    padding-bottom: 20px;
    position: relative;
  }

</style>
