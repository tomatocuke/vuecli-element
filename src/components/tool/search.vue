<template lang="">
<div id="search">
  <!-- <el-col :span="22" > -->
    <el-form label-width="65px" :inline="true">

      <el-form-item label="性别" v-if="show.includes('sex')">
        <el-select placeholder="全部" clearable v-model="searchData.sex">
          <el-option v-for="(item, i) in $sex" :key="i" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="ID" v-if="show.includes('id')">
        <el-input placeholder="" v-model="searchData.id"></el-input>
      </el-form-item>

      <el-form-item label="手机号" v-if="show.includes('phone')">
        <el-input placeholder="" v-model="searchData.phone"></el-input>
      </el-form-item>

      <el-form-item label="昵称" v-if="show.includes('nickname')">
        <el-input placeholder="" v-model="searchData.nickname" ></el-input>
      </el-form-item>

      <el-form-item v-if="show.includes('daterange')">
        <el-date-picker
          v-model="dateRange"
          value-format="yyyy-MM-dd"
          class="mr20"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" @click="setDateRange(-7)" >最近7日</el-button>
        <el-button type="primary" @click="setDateRange(-30)" >最近30日</el-button>
      </el-form-item>

      <el-form-item class="ml20">
        <el-button @click="reset" >重置</el-button>
        <el-button @click="searchFunc" type="primary" >搜索</el-button>
      </el-form-item>
    </el-form>
  <!-- </el-col> -->

  <!-- <el-col :span="2" v-if="show.includes('button')"> -->

  <!-- </el-col> -->

  <br>
</div>
</template>
<script>
export default {
  name: 'search',
  props: {
    show: Array,
    searchData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    searchReset: Function,
    searchFunc: Function
  },
  data() {
    return {
      dateRange: []
    }
  },
  watch: {
    dateRange(val) {
      this.searchData.start_time = val[0]
      this.searchData.end_time = val[1]
    }
  },
  mounted() {

  },
  methods: {
    reset() {
      this.dateRange = []
      this.searchReset()
    },
    setDateRange(addDay) {
      this.dateRange = [new this.$timer().AddDay(addDay).GetDate(), new this.$timer().GetDate()]
    },
  }
}
</script>
<style lang="css" scoped>

</style>