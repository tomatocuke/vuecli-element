<template lang="">
  <div  @click="copy" >
    <el-tooltip class="item" :content="content" placement="top">
      <div type="text" class="color-primary cursor overflow-dot" >{{content}}</div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'copy',
  props: {
   content: {
     type: String,
     default: ''
   },
  //  width: {
  //     type: Number,
  //     default: 100,
  //  }
  },
  data() {
    return {
     
    }
  },
  methods: {
    copy() {
      let copyInput = document.createElement('input');//创建input元素
      document.body.appendChild(copyInput);//向页面底部追加输入框
      copyInput.setAttribute('value', this.content);//添加属性，将url赋值给input元素的value属性
      copyInput.select();//选择input元素
      document.execCommand("Copy");//执行复制命令
      this.$message.success("已复制！");//弹出提示信息，不同组件可能存在写法不同
      //复制之后再删除元素，否则无法成功赋值
      copyInput.remove();//删除动态创建的节点
    }
  }
}
</script>

<style lang="css" scoped>
  
</style>