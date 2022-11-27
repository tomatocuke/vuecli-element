<template lang="">
<div id="dialog">
  <div id="login">
    <p>Demo后台管理系统</p>
    <el-input v-model="form.username" type="text" placeholder="账户" class="mb20"></el-input>
    <el-input v-model="form.password" type="password" placeholder="密码" class="mb20"></el-input>
    <div class="mb20"><el-checkbox v-model="autoLogin">记住密码</el-checkbox></div>
    <el-button type="primary" @click="submit" :loading="loading">登&nbsp;&nbsp;录</el-button>
  </div>

  <div id="footer">

  </div>
</div>
</template>
<script>

import JWT from '@/assets/js/jwt'

export default {
  name: 'login',
  props: {
    afterLogin: Function
  },
  data() {
    return {
      autoLogin: false,
      form: {
        username: '',
        password: '',
      },
      loading: false
    }
  },
  mounted() {
    let form = sessionStorage.getItem("form")
    if (!this.$isEmpty(form)) {
      this.form = JSON.parse(form)
      this.autoLogin = true
    }
  },
  methods: {
    submit() {
      if (this.autoLogin) {
        sessionStorage.setItem('form', JSON.stringify(this.form))
      } else {
        sessionStorage.removeItem('form')
      }
      sessionStorage.setItem('username', this.form.username)

      this.loading = true

      // 模拟登录API
      // this.$http.post('login', this.form).then(data=>{}).catch(err=>{})
      this.$defer(200).then(_=>{
        if (this.form.username == "demo" && this.form.password == "123456") {
          JWT.Set("321eewd322432d") // JWT，本文jwt存储在cookie里。一般JWT放在Header里，以token的形式
          location.reload()
        } else {
          this.$message.error("账号密码错误! (提示：demo,123456)")
          this.loading = false
        }
      })
      
      // this.$http.post('login', this.form).then(data=>{
      //   JWT.Set("d39dswe23sdfhref")
      //   location.reload()
      // }).catch(err => {
      //   this.loading = false
      // })
    },

  }
}
</script>

<style lang="css" scoped>
  #sidebar, #header {
    display: none !important;
  }
  #container {
    margin: 0;
    padding: 0;
  }
  #dialog {
    width: 100%;
    height: 100%;
    position: relative;
    background: linear-gradient(120deg, #E971AE, #3C96E4);
  }
  #login {
    width:330px;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 30px 40px;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%,-50%);
    text-align: center;
    opacity: 0.8;
  }
  #login p {
    font-size: 24px;
    color: #fff;
  }
  #login div {
    text-align: left;
  }
  #footer {
    position: absolute;
    bottom: 20px;
  }
  #login .el-button {
    border: none;
    width:100%;
   
  }
</style>