<template>
  <div id="sidebar">
    <div id="logo" >
      <img src="../assets/img/logo.png" alt="">
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#001628"
      text-color="#fff"
      active-text-color="#409EFF">
      <!-- 菜单来源于App.vue -->
      <template v-for="(item, i) in $menuList">
        <el-submenu v-if="item.children && item.children.length > 0" :key="item.id" :index="item.id.toString()">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item v-for="child, j in item.children" :key="j" :index="child.id.toString()" @click="linkTo(child.path)">
            <i :class="child.icon"></i>
            <span>{{child.name}}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :key="0-i" :index="item.id.toString()" @click="linkTo(item.path)">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>


export default {
  name: 'sidebar',
  props: {
    
  },
  components: {
  },
  data() {
    return {
      
    }
  },
  methods: {
    linkTo(url) {
      this.$router.push(url);
    }
  }
}
</script>

<style lang="css" scoped>
  #sidebar {
    width: 230px;
    background: #001628;
    position: fixed;
    top: 0;
    bottom: 0;
  }

  #logo {
    height: 65px;
    width: 100%;
    line-height: 110px;
    color: aqua;
    text-align: center;
  }
  #logo img {
    width: 160px;
    height: 53px;
  }

  #sidebar .el-menu{
    border-color: #001628;
  }

  #sidebar .el-menu span, #sidebar .el-menu i {
    padding-left: 10px;
    font-size: 16px;
    font-weight: bold;
  }
</style>