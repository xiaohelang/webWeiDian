
export function setTitle (t) {
  document.title = t
  var i = document.createElement('iframe')
  i.src = '//m.baidu.com/favicon.ico'
  i.style.display = 'none'
  i.onload = function () {
    setTimeout(function () {
      i.remove()
    }, 9)
  }
  document.body.appendChild(i)
}

export function getallDate (endStr, nowStr) {
  let endString = endStr.replace(/-/g, '/')
  let endDate = new Date(endString)
  // 将字符串转化为时间
//  开始时间
  let nowString = nowStr.replace(/-/g, '/')
  var nowDate = new Date(nowString)
  var num = (endDate - nowDate)
    // (1000*3600*24);//求出两个时间的时间差，这个是天数
  // var days = parseInt(Math.ceil(num));//转化为整天（小于零的话剧不用转了）

  // var date3 = date2.getTime()-date1.getTime()  //时间差的毫秒数
//  计算出相差天数
  var days = Math.floor(num / (24 * 3600 * 1000))

//  计算出小时数

  var leave1 = num % (24 * 3600 * 1000)    //  计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000))
//  计算相差分钟数
  var leave2 = leave1 % (3600 * 1000)        //  计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000))
//  计算相差秒数
  var leave3 = leave2 % (60 * 1000)      //  计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000)
  // alert('剩余 ' + days + '天 ' + hours + ': ' + minutes + ': ' + seconds)
  console.log(`days:${days}`)
  return '剩余' + days + '天' + hours + ':' + minutes + ':' + seconds
}

// 计算99: 59 : 59
export function getCountDown (beginDate, endDate, cbFn) {
  let beginStr = beginDate.replace(/-/g, '/')
  let endStr = endDate.replace(/-/g, '/')
  let beginTime = new Date(beginStr)
  let endTime = new Date(endStr)
  let nowTime = new Date()
  let cbDate1 = nowTime.getTime() - beginTime.getTime()
  let cbDate2 = nowTime.getTime() - endTime.getTime()
  cbFn && cbFn(cbDate1, cbDate2)
}

export function getTimer (endStr, fnData) {
  let endStr2 = endStr.replace(/-/g, '/')
  // var EndTime = new Date('2018/09/20 00:00:00')
  let EndTime = new Date(endStr2)
  var NowTime = new Date()
  var t = EndTime.getTime() - NowTime.getTime()
  var d = 0
  var h = 0
  var m = 0
  var s = 0
  if (t >= 0) {
    d = Math.floor(t / 1000 / 60 / 60 / 24)
    h = Math.floor(t / 1000 / 60 / 60 % 24)
    m = Math.floor(t / 1000 / 60 % 60)
    s = Math.floor(t / 1000 % 60)
  }
  return '剩余' + d + '天' + h + '时' + m + '分' + s + '秒'
  // var data = '剩余' + d + '天' + h + '时' + m + '分' + s + '秒'
  // fnData && fnData(data)
}

export function interTime (endStr) {
  var timer = null
  clearInterval(timer)
  timer = setInterval(getTimer(endStr), 500)
}

/*  -----------------------做上拉加载----------------------------  */
/*  获取滚动条当前的位置      */
export function getScrollTop () {
  let scrollTop = 0
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop
  } else if (document.body) {
    scrollTop = document.body.scrollTop
  }
  return scrollTop
}
/*  获取当前可视范围的高度 */
export function getClientHeight () {
  let clientHeight = 0
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
  } else {
    clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
  }
  return clientHeight
}
/* 获取文档完整的高度 */
export function getScrollHeight () {
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
}
export function Scroll () {
  document.addEventListener('scroll', () => {
    if (this.getScrollTop() + this.getClientHeight() === this.getScrollHeight()) {
      /*  ajax数据请求 */
    }
  })
}
/* 获取url带过来的参数 */
export function getQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}
/*
* @getNowFormatDate() => 获取系统当前时间
*/
export function getNowFormatDate () {
  let date = new Date()
  let seperator1 = '-'
  let seperator2 = ':'
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  if ((month >= 1 && month <= 9)) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds()
  return currentdate
}

/* 判断是否为微信浏览器 */
export function isWeiXin (fnTrue, fnFalse) {
  let ua = window.navigator.userAgent.toLowerCase()
  let ts = /micromessenger/i
//        if (ua.test(/MicroMessenger/i) === 'micromessenger') {
  if (ts.test(ua)) {
    fnTrue && fnTrue()
  } else {
    fnFalse && fnFalse()
  }
}
