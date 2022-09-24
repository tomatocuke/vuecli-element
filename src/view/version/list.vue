<template lang="">
<div id="content">
  <el-card class="box-card">
    <div slot="header" class="clearfix" >
      <el-row>
        <el-col :span="20">
          <el-tabs @tab-click="handleTabClick" v-model="tab" >
            <el-tab-pane name="android" ><label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;安卓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></el-tab-pane>
            <el-tab-pane name="ios"><label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iOS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></el-tab-pane>
          </el-tabs>     
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="2">
          <el-button type="primary" @click="create">创建升级版本</el-button>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
      </el-row>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <!-- <el-table-column label="任务图标">
        <template slot-scope="scope">
        </template>
      </el-table-column> -->
      <el-table-column label="序号" prop="title"></el-table-column>
      <el-table-column label="升级至/版本号" prop="title"></el-table-column>
      <el-table-column label="升级类型" prop="title"></el-table-column>
      <el-table-column label="升级渠道" prop="title"></el-table-column>
      <el-table-column label="描述" prop="title"></el-table-column>
      <el-table-column label="下载地址" prop="title"></el-table-column>
      <el-table-column label="操作者" prop="title"></el-table-column>
      <el-table-column label="更新时间" prop="title"></el-table-column>
      <el-table-column label="设备数" prop="title"></el-table-column>
      <el-table-column label="升级成功信息" prop="title"></el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-dialog :visible.sync="dialogVisible" width="600px" top="30px" >

    <el-form label-width="150px" >
      <h3>升级管理</h3>

      <el-form-item label="国家">
        <el-select placeholder="" v-model="dialogData.title">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="平台">
        <el-radio-group v-model="dialogData.channel" disabled>
          <el-radio label="android">安卓</el-radio>
          <el-radio label="ios">iOS</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="渠道">
        <el-checkbox :indeterminate="array.length > 0 && array.length < 3" v-model="isCheckAll"  @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="array" @change="handleCheckedChannel">
          <el-checkbox :label="1">渠道1</el-checkbox>
          <el-checkbox :label="2">渠道2</el-checkbox>
          <el-checkbox :label="3">渠道3</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <h3>升级信息</h3>

      <el-form-item label="升级至" required >
        <el-input v-model="dialogData.a" placeholder="此次发行的最新版本"></el-input>
      </el-form-item>
      <el-form-item label="升级链接" required>
        <el-input v-model="dialogData.b" placeholder="升级包下载的链接地址"></el-input>
      </el-form-item>
      <el-form-item label="标题" required>
        <el-input v-model="dialogData.c" placeholder="升级标题"></el-input>
      </el-form-item>
      <el-form-item label="描述" required>
        <el-input v-model="dialogData.d" type="textarea" :rows="4"></el-input>
      </el-form-item>

      <el-form-item label="升级方式" required>
        <el-radio-group v-model="dialogData.f">
          <el-radio :label="1">强升</el-radio>
          <el-radio :label="2">非强升提示升级</el-radio>
          <el-radio :label="3">非强升不提示升级</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="备注信息(可选)">
        <el-input v-model="dialogData.e" type="textarea" :rows="2"></el-input>
      </el-form-item>
   
      <el-form-item>
        <el-button type="primary" >提交升级</el-button>
        <el-button >取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>
<script>
export default {
  name: 'versionList',
  props: {
    
  },
  data() {
    return {
      tab: 'android',
      tableData: [{
        title: 'aaa',
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      }],
      array: [],
      isCheckAll: false,
      dialogData: {},
      dialogVisible: false
    }
  },
  methods: {
    create() {
      this.dialogData = {}
      this.dialogData.channel = this.tab
      this.dialogVisible = true
    },
    edit(row) {
      this.dialogData = row
      this.dialogVisible = true
    },
    handleTabClick(tab, event) {
      console.log(tab, event);
    },
    handleCheckedChannel(val) {
      this.isCheckAll = val.length === 3;
    },
    handleCheckAllChange(val) {
      this.isCheckAll = val
      this.array = val ? [1, 2, 3] : [];
      // this.$set(this.$fakeData, 'array', val ? [1, 2] : []);
      console.log(val)
    }
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
  }
}
</script>
<style lang="css" scoped>
  
</style>