<template lang="">
<div :id="id" :style="{height: height, width: width}"></div>
</template>
<script>

let option = {
  title: {
    left: 15,
    text: '',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    top: 30,
    icon: 'circle',
    data: [],
  },
  grid: {
    top: 100,
    left: '4%',
    right: '4%',
    bottom: '5%',
    containLabel: true
  },
  xAxis: [{
    type: 'category',
    boundaryGap: false,
    data: []
  }],
  yAxis: [{
    type: 'value',
    // name: '(%)',
  }],
  series: [{
    name: '',
    type: 'line',
    symbol: 'circle',
    symbolSize: 8,
    data: []
  }, {
    name: '',
    type: 'line',
    symbol: 'circle',
    symbolSize: 8,
    data: []
  }]
}

export default {
  name: 'EchartsLine',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
    },
    option: Object
  },
  watch: {
    option : {
      handler(newValue) {
        let names = []
        for (let i = 0; i < newValue.series.length; i++) {
          names.push(newValue.series[i].name)
        }
        newValue.legend = {
          top: 30,
          icon: 'circle',
          data: names,
        }
        this.chart.setOption(newValue)
      },
      deep: true
    }
  },
  data() {
    return {
      id: 'id-' + this.$random(10000),
      chart: null,
    }
  },
  mounted() {
    this.chart = this.$echarts.init(document.getElementById(this.id))
    this.chart.setOption(Object.assign({}, option, this.option))
  }
}
</script>
<style lang="css" scoped>

</style>