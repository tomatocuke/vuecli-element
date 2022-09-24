import Vue from 'vue'
import * as echarts from "echarts"
import timer from './timer'

// 图表
Vue.prototype.$echarts = echarts
// 时间
Vue.prototype.$timer = timer


// 菜单列表
Vue.prototype.$menuList = []

// 币种
Vue.prototype.$currency = [
  {label: 'BOK', value: 'BOK'},
  {label: 'SOL', value: 'SOL'},
]
// 性别
Vue.prototype.$sex = [
  {label: '男', value: 1},
  {label: '女', value: 2},
]
// 一些选项 （国家、渠道、平台...)
Vue.prototype.$country = [];
Vue.prototype.$channel = [];
Vue.prototype.$platform = [];
Vue.prototype.$version = [];

// 选项转义
Vue.prototype.$getOption = function(option, value) {
  if (Vue.prototype['$' + option] === undefined) {
    return '🙅🙅‍♂️';
  }
  let item = Vue.prototype['$' + option].find(item => item.value === value);
  return item ? item.label : '';
}



// 伪数据
Vue.prototype.$fakeData = {
  id: 10086,
  string: 'Hello World',
  number: 1,
  false: false,
  true: true,
  array: [1, 2, 3],
  object: {
    id: 9527,
    nickname: 'Joker',
    sex: 1,
    age: 28,
    address: "杭州市天目山路305号",
    province: '浙江省',
    city: "杭州市",
    reg_time: '2006-01-02 15:04:05',
  },
  time: '2006-01-02 15:04:05',
  photo: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  video: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
}

// 正则
Vue.prototype.$regexp = {
  phone: /^1[3456789]\d{9}$/,
  email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  password: /^[a-zA-Z0-9]{6,16}$/,
  number: /^[0-9]*$/,
  chinese: /^[\u4e00-\u9fa5]{0,}$/,
  english: /^[a-zA-Z]{0,}$/,
  url: /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/,
  date: /^\d{4}-\d{2}-\d{2}$/,
  time: /^\d{2}:\d{2}:\d{2}$/,
  datetime: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
}

// element 表单校验非空
Vue.prototype.$rule = {
  string: [
    {required: true, message: '请输入', trigger: 'blur'},
  ],
  number: [
    {required: true, message: '请输入', trigger: 'blur'},
    {type: 'number', message: '请输入数字', trigger: 'blur'},
  ]
}

Vue.prototype.$api = {
  login: '/v1/login', // 登录
  config: '/v1/baseconfig', // 选项字典（国家、渠道、版本...)
  'dashboard-index': '', // 数据总览

}