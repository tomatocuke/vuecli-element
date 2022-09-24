<template lang="">
<div>
  <el-card class="box-card">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column label="图片">
        <template slot-scope="scope">
          <el-image 
            style="width: 50px; height: 50px"
            :src="scope.row.photo" 
            :preview-src-list="[scope.row.photo]">
          </el-image>
        </template>
      </el-table-column>

      <el-table-column label="视频" >
        <template slot-scope="scope">
          <img  :src="scope.row.photo" @click="showMovieDialog(scope.row)" style="width: 50px; height: 50px" class="cursor" />
        </template>
      </el-table-column>
      
      <el-table-column label="标题" prop="string"></el-table-column>
      <el-table-column label="任务描述" prop="string"></el-table-column>
      <el-table-column label="A" prop="string"></el-table-column>
      <el-table-column label="B" prop="string"></el-table-column>
      <el-table-column label="C" prop="string"></el-table-column>
      <el-table-column label="D" prop="string"></el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showEditDialog(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-dialog title="编辑任务" :visible.sync="dialogVisible" width="36%">
    <el-form label-width="160px" >
      <el-form-item label="图片">
        <el-input v-model="dialogData.string"></el-input>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="dialogData.string"></el-input>
      </el-form-item>
      <el-form-item label="任务描述">
        <el-input v-model="dialogData.string"></el-input>
      </el-form-item>

      <!-- <el-form-item label="任务状态">
        <el-select placeholder="" v-model="dialogData.string">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item> -->
   
      <el-form-item>
        <el-button type="primary" >立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>


  <!-- 视频播放 -->
  <el-dialog :visible.sync="dialogMovieVisible" width="70%" top="60px" >
    <video controls style="width:100%; height:100%">
      <source :src="dialogMovieData.video" type="video/mp4">
    </video>
  </el-dialog>
</div>
</template>
<script>
export default {
  name: 'taskList',
  props: {
    
  },
  data() {
    return {
      tableData: [],
      dialogData: {},
      dialogVisible: false,

      dialogMovieVisible: false,
      dialogMovieData: {},
    }
  },
  mounted() {
    this.tableData = [this.$fakeData]
  },
  methods: {
    showEditDialog(row) {
      this.dialogData = row
      this.dialogVisible = true
    },
    showMovieDialog(row) {
      this.dialogMovieData = row 
      this.dialogMovieVisible = true
    },
  }
}
</script>
<style lang="css" scoped>
  

</style>