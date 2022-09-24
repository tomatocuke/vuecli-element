<template lang="">
  <div id="header">
    <div id="user">
      <el-dropdown  @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar :size="55" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <span style="display: inline-block; ">
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>
            <div>&nbsp;{{username}}<i class="el-icon-arrow-down el-icon--right"></i></div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
          </span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="changePassword">更改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 修改密码 -->
    <el-dialog :visible.sync="dialogVisible" width="480px" top="130px" >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>修改密码</span>
        </div>
        <el-form label-width="8å0px" >
          <el-form-item label="原密码">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="重复密码">
            <el-input></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </el-dialog>

    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="550px">
      <el-form label-width="100px" >
        <el-form-item label="用户">
          <span>{{username}}</span>
        </el-form-item>
        <el-form-item label="原密码">
          <el-input v-model="dialogData.old" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="dialogData.new" type="password"></el-input>
        </el-form-item>
        <el-form-item label="重复密码">
          <el-input v-model="dialogData.repeat" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import JWT from '@/assets/js/jwt.js'

export default {
  name: 'Header',
  props: {
   
  },
  data() {
    return {
      username: '',
      dialogVisible: false,
      dialogData: {},
    }
  },
  mounted() {
    this.username = sessionStorage.getItem('username')
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        console.log('退出登录')
        JWT.Remove()
        this.$router.push('/')
      }
      if (command === 'changePassword') {
        this.dialogVisible = true
      }
    },
    changePassword() {
      if (this.dialogData.repeat != this.dialogData.new) {
        this.$message.warning('两次输入的密码不一致')
        return
      }

      JWT.Remove()
      this.$router.push('/')
    }
  },

}
</script>

<style lang="css" scoped>
  #header {
    height: 65px;
    /* line-height: 65px; */
    background: #fff;
    text-align: top;
  }
 
  #user {
    width: 180px;
    height: 100%;
    float: right;
    border-left: 1px solid #ebeef5;
    padding: 0 15px;
    /* margin-right: 20px; */
    /* text-align: center; */
    /* vertical-align: top; */
  }

  #user .el-avatar {
   
  }


  .el-dropdown-link {
    cursor: pointer;
    /* color: #409EFF; */
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>