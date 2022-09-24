<template lang="">
<div id="content">
  <div class="left">
    <h4 class="ml20">角色</h4>
    <div v-for="(r, i) in roles" :key="r.id" :class="`role-item cursor ` + (roleActive == i ? 'active' : '') " @click="setActive(i)">
      <span>{{r.name}}</span>
      <i class="el-icon-edit-outline ml10" @click="showDialog(i)"></i>
      <i class="el-icon-delete ml10" @click="deleteRole(i)"></i>
    </div>

    <div class="role-item mt20" ><el-button type="primary" @click="showDialog(roles.length)">创建角色</el-button></div>
  </div>
  <div class="right">
    <h4 class="ml20">配置菜单权限</h4>
    <div class="permission-item" v-for="menu in $menuList" :key="menu.id">
      <span class="mr20 permission-label">{{menu.name}}:</span>
      <span v-if="menu.children.length > 0" class="mr20" v-for="child in menu.children" :key="child.id"><el-checkbox :label="child.id" v-model="checked">{{child.name}}</el-checkbox></span>
      <span v-if="menu.children.length == 0" class="mr20" :key="0-menu.id"><el-checkbox :label="menu.id" v-model="checked">{{menu.name}}</el-checkbox></span>
    </div>
  </div>

  <!-- 编辑角色 -->
  <el-dialog :visible.sync="dialogVisible" width="480px" top="130px" >
    <el-form label-width="50px" :inline="true">
      <el-form-item label="角色">
        <el-input v-model="dialogData.name"></el-input>
      </el-form-item>

      <div style="text-align: center;"><el-button type="primary" @click="saveRole">保存</el-button></div>
    </el-form>
  </el-dialog>


</div>
</template>
<script>
export default {
  name: 'permission',
  data() {
    return {
      roles: [
        {id: 1, name: '运营'},
        {id: 2, name: '产品'},
      ],
      roleActive: 0,
      checked: [],
      dialogVisible: false,
      dialogData: {}
    }
  },
  methods: {
    setActive(i) {
      this.roleActive = i
    },
    showDialog(i) {
      if (i == this.roles.length) {
        this.dialogData = {}
      } else {
        this.dialogData = this.$copy(this.roles[i])
      }
      this.roleActive = i
      this.dialogVisible = true
    },
    saveRole() {
      this.$set(this.roles, this.roleActive, this.dialogData)
      this.dialogData = {}
      this.dialogVisible = false
    },
    deleteRole(i) {
      this.$confirm('删除该角色，角色下对应的所有账户将失去对应的权限，是否删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.roles.splice(i, 1)
        this.$message.success('删除成功!')
        this.setActive(0)
      });
    }
  }
}
</script>
<style lang="css" scoped>
  #content {
    display: flex;
  }
  #content > div {
    border-radius: 8px;
    margin: 20px;
  }
  #content .left {
    width: 160px;
    background-color: #fff;
    margin: 20px 0 20px 20px;
  }
  #content .right {
    flex: 1;
    background-color: #fff;
    margin: 20px 20px 20px 0;
    border-left: 1px solid #ebeef5;
  }
  .role-item {
    text-align: center;
    padding: 10px 0;
  }
  .role-item.active {
    background-color: #E6F6FF;
  }
  .permission-item {
    padding: 18px;
  }
  .permission-label {
    display: inline-block;
    width: 170px;
    text-align: right;
  }
</style>