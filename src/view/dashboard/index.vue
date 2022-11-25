<template lang="">
<el-card id="content" class="box-card">
  <!-- 卡片 -->
  <template v-for="(item, i) in cards">
    <el-card :key="i" :class="`card ` + (item.click ? 'can-click' : '') + ' ' + (currentCardIndex == i ? 'on-click' : '')"
      @click.native="choseCard(i)" > 
      <div class="title">{{item.title}}</div>
      <div class="number">{{item.number}}</div>
      <div style="font-size:14px;">
        <span style="color:#8C8C8C;">昨日同期</span>
        <span v-if="item.compare" style="padding-left: 20px; padding-right: 3px;">{{item.compare}}%</span>
        <svg v-if="item.compare" :class="`icon ` + (item.compare > 0 ? 'arrow-up' : 'arrow-down') " aria-hidden="true">
          <use xlink:href="#icon-arrow"></use>
        </svg>
      </div>
    </el-card>
  </template>
  <!-- 分割线 -->
  <el-divider></el-divider>
  <!-- 图表 -->
  <chart :option="chartOption"></chart>

</el-card>
</template>

<script>
import chart from '@/components/chart/line.vue'

export default {
  name: 'DashboardIndex',
  components: {chart},
  data() {
    return {
      cards: [
        {title: '', number: 0, compare: 0, click: false},
        {title: '', number: 0, compare: 0, click: false},
        {title: '', number: 0, compare: 0, click: false},
        {title: '', number: 0, compare: 0, click: false},
        {title: '', number: 0, compare: 0, click: false},
     
      ],
      search: {},
      currentCardIndex: -1,
      chartOption: {
        title: {
          text: '',
        }
      },
    }
  },
  mounted() {
    this.getCardsData()
    
  },
  methods: {
    choseCard(i) {
      let card = this.cards[i]
      if (!card.click) {
        return 
      }
      if (this.currentCardIndex == i) {
        return
      }
      this.currentCardIndex = i
      this.chartOption.title.text = card.title
      this.chartOption.xAxis =  [{
        type: 'category',
        boundaryGap: false,
        data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
      }],
      this.chartOption.series =  [{
        name: '今天',
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        data: this.testRandomArray(12)
      }, {
        name: '昨天',
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        data: this.testRandomArray(12)
      }]
    },
    getCardsData() {
      // 模拟API
      this.$defer(100).then(_=>{
        this.cards = [
          {title: 'A指标', number: this.$random(1000), compare: -12.3, click: true},
          {title: 'B指标', number: this.$random(1000), compare: 13.4, click: true},
          {title: 'C指标', number: this.$random(1000), compare: -34.2, click: true},
          {title: 'D指标', number: this.$random(1000), compare: 12.3, click: true},
          {title: 'E指标', number: this.$random(1000), compare: 12.3, click: true},
        ]
        this.choseCard(0)
      })
    },

    testRandomArray(n) {
      let array = []
      let rand =  this.$random(1000)
      for (let i = 0; i < n; i++) {
        array.push(this.$random(rand) + 100)
      }
      return array;
    }
  },


}
</script>
<style lang="css" scoped>
  .card {
    width: 200px;
    display: inline-block;
    background-color: #F5F7FA;
  }
  /* 可以被点击的卡片 */
  .can-click {
    cursor: pointer;
    box-shadow: 0 2px 12px 0 rgba(64,158,255, 0.4);
  }
  .can-click:hover {
    transform:translateZ(0) scale(1.02);
    cursor: pointer;
  }
  .on-click {
    border: 1px solid #409EFF;
  }
  .card .title {

  }
  .card .number {
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0;
  }
</style>