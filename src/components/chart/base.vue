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
    data: ['CMCC', 'CTCC', 'CUCC'],
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
    data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
  }],
  yAxis: [{
    type: 'value',
    // name: '(%)',
  }],
  series: [{
    name: 'CMCC',
    type: 'line',
    symbol: 'circle',
    symbolSize: 8,
    data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
  }, {
    name: 'CTCC',
    type: 'line',
    symbol: 'circle',
    symbolSize: 8,
    data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
  }, {
    name: 'CUCC',
    type: 'line',
    symbol: 'circle',
    symbolSize: 8,
    data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
  }]
}

export default {
  name: 'EchartsBase',
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