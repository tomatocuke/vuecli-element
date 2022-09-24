<!--用户数据-->
<template>
  <div id="content">
    <el-card class="box-card">
      <!-- 搜索组件 -->
      <search 
      :searchData="search" :searchFunc="getTableData" :searchReset="searchReset"
      :show="['platform', 'version', 'country', 'channel', 'daterange', 'invitecode', 'userid', 'username', 'phone', 'button']"></search>
  
      <el-table :data="tableData" border style="width: 100%" ref="table"
        v-loading="tableLoading" element-loading-text="Loading" element-loading-spinner="el-icon-loading" 
        @selection-change="handleSelectionChange" @sort-change="handleSortChange">
        <el-table-column type="selection" width="45" fixed />
        <el-table-column label="序号" width="70px" fixed >
          <template slot-scope="scope">
            <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column> 
  
        <el-table-column 
          v-for="(item, i) in items"
          :label="item.label"
          :min-width="item.width" 
          :sortable="item.sortable ? 'custom': false"
          :key="i"
        >
          <template slot-scope="scope" >
            <!-- 可复制 -->
            <div v-if="['id'].includes(item.prop)" >
              <copy :content="scope.row[item.prop]"></copy>
            </div>
            <!-- 转义 -->
            <div v-else-if="['country', 'sex'].includes(item.prop)">
              {{$getOption(item.prop, scope.row[item.prop])}}
            </div>
  
            <div v-else>{{scope.row[item.prop]}}</div>
          </template>
        </el-table-column> 
  
      </el-table>
  
      <pagination :total="total" :changeFunc="getTableData"></pagination>
  
    </el-card>
  
    <exporter :items="tableSelected" :filename="`用户数据`"> </exporter>
  
  </div>
</template>

<script>

export default {
  name: 'table',
  components: {  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 搜索项
      search: {},
      total: 0,
      tableLoading: false,
      tableData: [],
      tableSelected: [],
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    // 重置搜索项
    searchReset() {
      this.search = {}
      this.$refs.table.clearSort()
    },
    // 表格数据
    async getTableData() {
      this.tableLoading = true
      await this.$http.get('/v1/user/list', this.search).then(data => {
        this.tableData = data.list
        this.total = data.total
      })
      this.tableLoading = false
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      let titles = ['序号']
      this.tableSelected = selection.map((item, i) => {
        let row = [i+1]
        this.items.forEach(it => {
          if (i == 0) {
            titles.push(it.label)
          }
          row.push(item[it.prop])
        })
        return row
      })
      this.tableSelected.unshift(titles)
      this.$debug(this.tableSelected)
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
    }
  }
}
</script>

<style lang="css" scoped>



</style>