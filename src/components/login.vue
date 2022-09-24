<template lang="">
<div>
  <div id="login">
    <img src="../assets/img/logo.png" alt="">
    <p>Demo后台管理系统</p>
    <el-input v-model="form.username" type="text" placeholder="账户" class="mb20"></el-input>
    <el-input v-model="form.password" type="password" placeholder="密码" class="mb20"></el-input>
    <div class="mb20"><el-checkbox v-model="autoLogin">自动登录</el-checkbox></div>
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
      
      // this.$http.post('login', this.form).then(data=>{
      //   location.reload()
      // }).catch(err => {
      //   this.loading = false
      // })
      JWT.Set("xxx")
      location.reload()
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
  #login {
    width: 400px;
    height: 400px;
    margin: 100px auto;
    background-color: #F0F2F6;
    font-size: 24px;
    text-align: center;
    
  }
  #login img {
    width: 200px;
  }
  #login p {
    font-size: 16px;
    color: #898B8D;
  }
  #login div {
    text-align: left;
  }
  #login .el-button {
    width:100%;
  }

  #footer {
    position: absolute;
    bottom: 20px;
  }
</style>