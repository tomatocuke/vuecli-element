<template lang="">
<div id="pagination">
  <el-pagination
  background
  :page-sizes="[10, 30, 50]"
  layout="total, sizes, prev, pager, next, jumper"
  @size-change="handlePageSizeChange"
  @current-change="handlePageChange"
  :current-page="page"
  :page-size="limit"
  :total="total">
</el-pagination>
</div>
</template>
<script>

export default {
  name:'Pagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    changeFunc: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      page: 1,
      limit: 10,
    }
  },
  methods: {
    handlePageChange(page) {
      this.changeFunc({page: page, limit: this.limit})
    },
    handlePageSizeChange(limit) {
      this.changeFunc({page: this.page, limit: limit})
    }
  },
  mounted() {

  }
}
</script>
<style lang="css">
  #pagination {
    width: 100%;
    display: inline-block;
    text-align: right;
    padding: 20px 20px 0 0;
  }
</style>