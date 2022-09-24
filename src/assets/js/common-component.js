import Vue from 'vue'

// 搜索栏
Vue.component('search', () => import('@/components/tool/search'))
// 分页
Vue.component('pagination', () => import('@/components/tool/pagination'))
// 导出
Vue.component('exporter', () => import('@/components/tool/exporter'))
// 可复制内容
Vue.component('copy', () => import('@/components/tool/copy'))