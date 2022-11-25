<template>
  <div id="exporter">
    <el-col :span="1">&nbsp;</el-col>
    <el-col :span="2">Select&nbsp;{{items.length}}&nbsp;items</el-col>

    <el-col :span="19">&nbsp;</el-col>

    <el-col :span="2">
      <el-button type="primary" size="small" :loading="loading" @click="doExport">
        Export&nbsp;&nbsp;<i class="el-icon-upload2"></i>
      </el-button>
    </el-col>
  </div>
</template>

<script>

export default {
  name: 'exporter',
  props: {
    titles: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    filename: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false,
    }
  },
  methods: {
    doExport() {
      if (this.items.length === 0) {
        this.$message.warning('Please select at least one item.')
        return
      }
      var arr = this.generate()
      console.log(arr)
		  var blob = new Blob(['\uFEFF' + arr.join('')], {
        type: 'text/plain;charset=utf-8',
      });
      var downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = this.filename + new this.$timer().Format("Ymds") + ".csv"; 
      downloadLink.click();
    },
    generate() {
      var arr = [];
      var keys = Object.keys(this.items[0])
      arr.push(this.titles.join("\t,")+"\n");
      for(let i = 0; i < this.items.length; i++){
        var temp = [];
        for(let j = 0; j < keys.length; j++){
          temp.push(this.items[i][keys[j]]);
        }
        arr.push(temp.join("\t,")+"\n");
      }
      return arr
    }
  },
}
</script>

<style lang="css" scoped>

</style>