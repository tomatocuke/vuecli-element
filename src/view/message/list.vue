<template>
<div id="content">
  <el-card class="box-card" >
    <el-form label-width="80px" :inline="true" id="search">
      <el-form-item label="消息标题">
        <el-input placeholder="" v-model="search.title"></el-input>
      </el-form-item>

      <el-form-item label="类型">
        <el-select  placeholder="汇总" clearable v-model="search.msgtype">
          <el-option v-for="item in msgtypes" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="发布时间">
        <el-date-picker
          v-model="dateRange"
          class="mr20"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <!-- <el-button type="primary" @click="setDateRange('本周')" >本周</el-button>
        <el-button type="primary" @click="setDateRange('最近30天')" >最近30天</el-button> -->
      </el-form-item>

      <el-form-item >
        <el-button @click="getTableData" type="primary" >搜索</el-button>
      </el-form-item>

      <el-form-item style="float: right;">
        <el-button type="primary" @click="showCreate()">创建</el-button>
      </el-form-item>
    </el-form>


    <el-table :data="tableData"  border style="width: 100%; "
      v-loading="tableLoading" element-loading-text="Loading" element-loading-spinner="el-icon-loading" 
      @selection-change="handleSelectionChange" @sort-change="handleSortChange">
      <el-table-column type="selection" width="55" fixed />
      <el-table-column label="推送时间" prop="senddt" width="155" sortable="custom"  /> 
      <el-table-column label="类型" prop="msgtype" width="100px" />
      <el-table-column label="链接" prop="link" width="100px" />
      <el-table-column label="标题" prop="title" width="100px" />
      <el-table-column label="内容" prop="body"  />
      <el-table-column label="国家" prop="country"  />
      <!-- <el-table-column width="170px">
        <template slot="header" slot-scope="scope">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-iphone"></use>
          </svg>
          <span> 目标｜成功｜点击</span>
        </template>
        <template slot-scope="scope">
          <span>12232</span> | <span>2324</span> | <span>5921</span>
        </template>
      </el-table-column>
      <el-table-column width="170px">
        <template slot="header" slot-scope="scope">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-android"></use>
          </svg>
          <span> 目标｜成功｜点击</span>
        </template>
        <template slot-scope="scope">
          <span>12232</span> | <span>2324</span> | <span>5921</span>
        </template>
      </el-table-column> -->
      <el-table-column label="版本" prop="version"  />
      <el-table-column label="目标人群" prop="userid"  />
      <el-table-column label="操作人" prop=""  />
      
      <el-table-column label="操作" width="100" fixed="right" >
        <template slot-scope="scope">
          <i class="el-icon-delete danger cursor" style="font-size:20px;padding: 0 5px;"></i>
          <i @click="showDetail(scope.row)" class="el-icon-edit primary cursor" style="font-size:20px;padding: 0 5px;"></i>
        </template>
      </el-table-column>
    </el-table>

    <pagination :changeFunc="getTableData" :params="search" :total="total"></pagination> 

  </el-card>

  <!-- 遮罩 -->
  <el-dialog :visible.sync="dialogVisible" width="600px" top="60px" >
    <el-form label-width="150px" >
      <el-form-item label="消息类型">
        <el-select  placeholder="汇总" clearable v-model="dialogData.msgtype">
          <el-option v-for="item in msgtypes" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="链接至" required >
        <el-input v-model="dialogData.link" placeholder="H5 || App内定义的路由地址 || 视频ID"></el-input>
      </el-form-item>
      <el-form-item label="标题" required>
        <el-input v-model="dialogData.title" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="内容" required>
        <el-input v-model="dialogData.body" type="textarea" :rows="6"></el-input>
      </el-form-item>

      <el-form-item label="国家">
        <el-select placeholder="" v-model="dialogData.country">
          <el-option v-for="item in $country" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="目标平台">
        <el-checkbox-group v-model="dialogData.platform" >
          <el-checkbox-button :label="1"><svg class="icon size30" aria-hidden="true">
              <use xlink:href="#icon-android"></use>
            </svg> </el-checkbox-button>
          <el-checkbox-button :label="2">          <svg class="icon size30" aria-hidden="true">
            <use xlink:href="#icon-iphone"></use>
          </svg> </el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="版本">
        <el-select placeholder="" v-model="dialogData.version">
          <el-option v-for="item in $version" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="目标人群" >
        <el-radio-group v-model="control.a" >
          <el-radio-button :label="1">推送所有人</el-radio-button>
          <el-radio-button :label="2">RegisrationID</el-radio-button>
        </el-radio-group>
        <br/>

        <el-radio-group v-model="control.b" v-show="dialogSetUserShow">
          <el-radio :label="1">手动输入</el-radio>
          <el-radio :label="2">文件上传</el-radio>
        </el-radio-group>
        <!-- 手动输入用户ID -->
        <div v-show="dialogTagsShow">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
      @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            type="number"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else  class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </div>
        <!-- 上传用户ID文件 -->
        <el-upload
          v-show="dialogUploadShow"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :before-upload="beforeUpload"
          :limit="1">
          <el-button size="small" type="primary">点击上传</el-button>
          <span slot="tip" class="el-upload__tip ml20">只能上传csv/excel文件，且不超过5M</span>
        </el-upload>

      </el-form-item>

      <el-form-item label="发送时间">
        <el-radio-group v-model="control.c">
          <el-radio-button :label="1">立即</el-radio-button>
          <el-radio-button :label="2">定时</el-radio-button>
        </el-radio-group>
        <span v-show="dialogTimerShow">
          <el-date-picker v-model="dialogData.senddt" 
            type="datetime" class="ml20" placeholder="选择日期时间">
          </el-date-picker>
        </span>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="confirm" >提交发送</el-button>
        <el-button @click="cancelDialog">取消</el-button>
      </el-form-item>

    </el-form>
  </el-dialog>

</div>
</template>
<script>

export default {
  name: 'MessageHistory',
  components: {},
  data() {
    return {
      dateRange: [],
      msgtypes: [
        {label: 'activity', value: 'activity'},
        {label: 'video', value: 'video'},
      ],
      control: {},
      search: {
        cde:2,
      },
      tableLoading: false,
      tableData: [],
      total: 0,
      dialogVisible: false,
      dialogData: {
        platform: [],
      },
  
      // dialogFileList: [],
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: ''
    }
  },
  computed: {
    dialogSetUserShow() {
      return this.control.a === 2
    },
    dialogTagsShow() {
      return this.control.a == 2 && this.control.b === 1
    },
    dialogUploadShow() {
      return this.control.a == 2 && this.control.b === 2
    },
    dialogTimerShow() {
      return this.control.c === 2
    },
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    // 表格数据
    async getTableData() {
      if (this.dateRange.length > 0) {
        this.search.start_time = this.dateRange[0]
        this.search.end_time = this.dateRange[1]
      }

      this.tableLoading = true
      // await this.$http.get('/v1/pushmessage/pushmessage_list', this.search).then(data => {
      //   this.tableData = data.list 
      //   this.total = data.total
      // })
      console.log(this.tableData)
      this.tableLoading = false
    },
    confirm() {
      var that = this
      this.$confirm('确认提交发送吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        console.log(this.dialogData)
        that.$http.put('/v1/pushmessage/add_one_push', that.dialogData).then(_ => {
          that.$message.success('创建成功')
          that.getTableData()
        })
      })
    },
    cancelDialog() {
      this.dialogVisible = false
      this.dialogData = {}
    },
    showCreate() {
      this.dialogData = {platform: []}
      this.dialogVisible = true
    },
    showDetail(row) {
      this.dialogData = row
      this.dialogVisible = true
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.tableSelected = selection.map((item, i) => [
        i+1, item.number, item.string
      ])
    },
    handleSortChange($event) {
      switch ($event.order) {
        case 'ascending':
          this.search.order_by = $event.prop
          this.search.order_sort = 1
          break;
        case 'descending':
          this.search.order_by = $event.prop
          this.search.order_sort = -1
          break;
        default:
          delete this.search.order_by
          delete this.search.order_sort
          break;
      }
      this.getTableData()
    },
    beforeUpload(file) {
      console.log(file)
      const isType = file.type.indexOf('csv') > 0 || file.type.indexOf('excel') > 0;
      const isSize = file.size / 1024 / 1024 < 5;

      if (!isType) {
        this.$message.error('上传文件只能是csv或excel!');
      }
      if (!isSize) {
        this.$message.error('上传文件大小不能超过 5MB!');
      }
      return isType && isSize;    
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  },
}
</script>
<style lang="css">
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>