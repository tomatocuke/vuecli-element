import Vue from 'vue'

// 判断是否为空，不包含字符串、数字、布尔
Vue.prototype.$isEmpty = isEmpty
// 根据环境打印输出
Vue.prototype.$debug = debug
// 合并对象
Vue.prototype.$merge = merge
// 拷贝对象 
Vue.prototype.$copy = copy
// 延迟执行
Vue.prototype.$defer = defer 
// 随机整数
Vue.prototype.$random = random
// 复制到粘贴板
Vue.prototype.$copyContent = copyContent


//错误捕获
Vue.config.errorHandler = (err, vm, info) => {
  console.error(`组件:${vm.$vnode.tag}发生错误, ${err.message}, ${info}`)
}


// debug模式
const IsDebug = (process.env.NODE_ENV !== 'production')
if (IsDebug) {
  console.log('已开启debug模式')
}
function debug(...msgs) {
  if (IsDebug) {
    console.info(...msgs)
  }
}

function isEmpty(val) {
  if (val === undefined || val === null) {
    return true
  }
  if (val instanceof Array && val.length === 0) {
    return true
  }
  if (isObject(val) && Object.keys(val).length === 0) {
    return true
  }

  return false
}

// 判断是否为对象
function isObject(target) {
  return Object.prototype.toString.call(target) === '[object Object]'
}

// 合并对象
function merge(target, source) {
  if (isEmpty(source)) {
    return target
  }
  if (isEmpty(target)) {
    return source
  }
  return Object.assign(target, source)
}

// 延迟执行 this.$defer(1000).then(()=>{ console.log('defer 1s') })
function defer(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 拷贝对象 （Object.assign()拷贝是浅拷贝）
function copy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

// 随机数，不包含max本身
function random(max) {
  return Math.floor(Math.random() * max)
}

// 拷贝到粘贴板
function copyContent(content) {
	let copyInput = document.createElement('input');//创建input元素
	document.body.appendChild(copyInput);//向页面底部追加输入框
	copyInput.setAttribute('value', content);//添加属性，将url赋值给input元素的value属性
	copyInput.select();//选择input元素
	document.execCommand("Copy");//执行复制命令
	this.$message.success("已复制！");//弹出提示信息，不同组件可能存在写法不同
	//复制之后再删除元素，否则无法成功赋值
	copyInput.remove();//删除动态创建的节点
}

