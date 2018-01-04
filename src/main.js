import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import '../src/assets/rem'
import store from './store'
import { AlertPlugin, ToastPlugin, ConfirmPlugin } from 'vux'
import vuetitle from 'vue-wechat-title'
import VueLazyload from 'vue-lazyload'
// import vconsole from 'vconsole'
import './common/stylus/index.styl'

Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(vuetitle)
// Vue.use(vconsole)
// Vue.use(WechatPlugin)

Vue.use(VueLazyload, {
  loading: require('./common/image/default.jpg')
})

Vue.prototype.$msgbox = function (title, msg, onHideCb) {
  this.$vux.alert.show({
    title: title,
    content: msg,
    onShow () {
      console.log('Plugin: I\'m showing')
    },
    onHide () {
      onHideCb && onHideCb()
    }
  })
}

// window.prototype.opPanel.paySuccess = function (arg) {
//   alert('999999')
//   Vue.$msgbox('提示', 'cancelOrder')
  // if (arg === '1') {
  //   Vue.$emit('cancelOrder')
  // } else if (arg === '0') {
  //   Vue.$msgbox('提示', '支付失败')
  // }
// }

Vue.prototype.$eval = function (str) {
  document.eval('(' + str + ')')
}

Vue.prototype.$msgboxhide = function () {
  this.$vux.alert.hide()
}

Vue.prototype.$confirm = function (title, msg, onConfirm) {
  // let _this = this
  this.$vux.confirm.show({
    title: title,
    content: msg,
    onCancel () {
      console.log('prompt cancel')
    },
    onConfirm () {
      onConfirm && onConfirm()
    }
  })
}

Vue.prototype.$getCookie = function (cname) {
  let name = cname + '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim()
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
  }
  return ''
}

Vue.prototype.setTitle = function (t) {
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

Vue.config.productionTip = false

/* eslint-disable no-new */
fastclick.attach(document.body)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
