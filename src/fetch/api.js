import axios from 'axios'
import qs from 'qs'
// import Vue from 'vue'
// import { AlertPlugin } from 'vux'
// import * as _ from '../util/tool'
// Vue.use(AlertPlugin)

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = ''

axios.defaults.baseURL = 'http://vshop-t.wxsapp.com'

// POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    // config.headers['Content-Type'] = 'application/json'`````
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
     // _.toast("错误的传参", 'fail')
  return Promise.reject(error)
})

//  返回状态判断
axios.interceptors.response.use((res) => {
  if (res.data.code !== 0) {
      // _.toast(res.data.msg);
    return Promise.reject(res)
  }
  return res
}, (error) => {
    // _.toast("网络异常", 'fail')
  return Promise.reject(error)
})

export function personAxios (params) {
  axios.post('/user/personal.do', params)
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    })
}

export function fetch (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        console.log('api-res')
        console.log(response.data)
        if (response.data.code === 0) {
          resolve(response.data)
        } else {
          console.log('数据请求返回错误')
        }
        // resolve(response.data)
      }, err => {
        console.log('err错误')
        console.log(err.data.message)
        reject(err)
      })
      .catch((error) => {
        console.log('error错误')
        reject(error)
      })
  })
}

// export function apiPost (url, params, fnRes, fnErr) {
//   axios.post(url, params).then(fnRes).catch(fnErr)
// }

export default {
  testShop () {
    axios.post('vshop/info.do', {
      vShopGuid: '6DF5A619-0D6F-4055-BF7B-3636325E631F'
    }).then(res => {
      console.log('test01')
      console.log(res)
    }).catch(err => {
      console.log('test01err')
      console.log(err)
    })
  },
  Login (url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(response => {
        resolve(response.data)
      }, err => {
        console.log('登录失败')
        reject(err)
      }).catch(error => {
        console.log('登录失败')
        reject(error)
      })
    })
  },
  /**
   * 微店信息 ID: 6DF5A619-0D6F-4055-BF7B-3636325E631F
   * vshop/info.do
   */
  shopInfo (params) {
    return fetch('/vshop/info.do', params)
  },
 /**
  *微店商品列表 vshop/product/page.do
  */
  shopPage (params) {
    return fetch('/vshop/product/page.do', params)
  },
  /**
   *商品详情 vshop/product/info.do
   * "7BD945A1-5832-4A30-B16C-FD47401DE350"
   */
  productInfo (params) {
    return fetch('/vshop/product/info.do', params)
  },
  /**
   *用户登录 - 测试使用 /login.do
   * "7BD945A1-5832-4A30-B16C-FD47401DE350"
   */
  LoginTest (params) {
    return fetch('/login.do', params)
  },
  /**
   *用户信息 /user/personal.do
   * "7BD945A1-5832-4A30-B16C-FD47401DE350"
   */
  Personal (params) {
    return fetch('/user/personal.do', params)
  },
  /**
   *新增收货地址 /user/vreceiver/add.do
   * "7BD945A1-5832-4A30-B16C-FD47401DE350"
   */
  addAddress (params) {
    return fetch('/user/vreceiver/add.do', params)
  },
  /**
   *用户地址列表 /user/vreceiver/all.do
   * "7BD945A1-5832-4A30-B16C-FD47401DE350"
   */
  allAddress (params) {
    return fetch('/user/vreceiver/all.do', params)
  },
  /**
   *修改地址 /user/vreceiver/update.do
   * "7BD945A1-5832-4A30-B16C-FD47401DE350"
   */
  upDateAddress (params) {
    return fetch('/user/vreceiver/update.do', params)
  },
  /**
   *收货地址信息 /user/vreceiver/info.do
   * "7BD945A1-5832-4A30-B16C-FD47401DE350"
   */
  infoAddress (params) {
    return fetch('/user/vreceiver/info.do', params)
  },
  /**
   *删除收货地址 /user/vreceiver/info.delete.do
   * "7BD945A1-5832-4A30-B16C-FD47401DE350"
   */
  deleteAddress (params) {
    return fetch('/user/vreceiver/delete.do', params)
  },
  /**
   *直接购买下单 /user/vorder/add.do
   * "7BD945A1-5832-4A30-B16C-FD47401DE350"
   */
  addProduct (params) {
    return fetch('/user/vorder/add.do', params)
  },
  /**
   *活动下单【拼团、团购】 /user/vgroup/order/add.do
   * "7BD945A1-5832-4A30-B16C-FD47401DE350"
   */
  orderAction (params) {
    return fetch('/user/vgroup/order/add.do', params)
  },
  /**
   *13、加入拼团 /user/vgroup/order/join.do
   * "7BD945A1-5832-4A30-B16C-FD47401DE350"
   */
  pingTuan (params) {
    return fetch('/user/vgroup/order/join.do', params)
  },
  /**
   *微店列表 /vshop/page.do
   * "7BD945A1-5832-4A30-B16C-FD47401DE350"
   */
  shopList (params) {
    return fetch('/vshop/page.do', params)
  },
  /**
   *微店商品活动 /vshop/page.do
   */
  productAction (params) {
    return fetch('/vgroup/product/all.do', params)
  },
  /**
   *公众号自定义分享签名 /weixin/sign.do
   */
  sign (params) {
    return fetch('/weixin/sign.do', params)
  },
  /**
   *支付 /user/wxpay/doPay.do
   */
  doPay (params) {
    return fetch('/user/wxpay/doPay.do', params)
  },
  /**
   *拼团用户列表 /vgroup/order/all.do
   */
  pingAll (params) {
    return fetch('/vgroup/order/all.do', params)
  },
  /**
   *微店分享内容 /wx/share/vshop.do
   */
  shareShop (params) {
    return fetch('/wx/share/vshop.do', params)
  },
  /**
   *微店商品分享内容 /wx/share/vshop/product.do
   */
  shareProduct (params) {
    return fetch('/wx/share/vshop/product.do', params)
  },
  /**
  *微店我订单/user/vorder/page.do
  */
  myOrder (params) {
    return fetch('/user/vorder/page.do', params)
  },
  /**
   * 微店订单详情 /user/vorder/info.do
   */
  orderDetails (params) {
    return fetch('/user/vorder/info.do', params)
  },
  /**
   *我的订单(取消订单) /user/vorder/cancel.do
   */
  cancelOrder (params) {
    return fetch('/user/vorder/cancel.do', params)
  },
  /**
   * 我的订单数量提示图标 /user/vorder/order_count.do
   */
  orderCount (params) {
    return fetch('/user/vorder/order_count.do', params)
  },
  /**
   * 我的订单(实物订单确认收货) /user/vorder/update_complete.do
   */
  confirm (params) {
    return fetch('/user/vorder/update_complete.do', params)
  },
  /**
   *  虚拟服务类，获取二维码信息 /user/vorder/qrcode.do
   */
  qrcode (params) {
    return fetch('/user/vorder/qrcode.do', params)
  },
  /**
   *  用户发起砍价，/user/vgroup/product/log/add.do
   */
  userKan (params) {
    return fetch('/user/vgroup/product/log/add.do', params)
  },
  /**
   *  砍价详情，/user/vgroup/product/log/info.do
   */
  userKanDetail (params) {
    return fetch('/user/vgroup/product/log/info.do', params)
  },
  /**
   *  帮忙砍价，/user/vshop/product/share/log/add.do
   */
  userKanHelp (params) {
    return fetch('/user/vshop/product/share/log/add.do', params)
  },
  /**
   *  砍价列表，/vshop/product/share/log/all.do
   */
  userKanList (params) {
    return fetch('/vshop/product/share/log/all.do', params)
  },
  /**
   *  砍价分享，/user/wx/share/vgroup/product/log.do
   */
  userKanShare (params) {
    return fetch('/user/wx/share/vgroup/product/log.do', params)
  },
  /*
  *  我的拼单
  *  /user/vgroup/order/page.do
  */
  groupList (params) {
    return fetch('/user/vgroup/order/page.do', params)
  },
  /*
  *  拼单详情
  *  /user/vgroup/order/info.do
  */
  pingDetail (params) {
    return fetch('/user/vgroup/order/info.do', params)
  },
  /*
  * 用户发起分享拼单
  * /user/wx/share/vgroup/order.do
  */
  userPinShare (params) {
    return fetch('/user/wx/share/vgroup/order.do', params)
  },
  /*
  *  拼单用户列表
  *  /vgroup/order/member/all.do
  */
  pingUserList (params) {
    return fetch('/vgroup/order/member/all.do', params)
  },
  /*
  * 砍价列表
  * /user/vgroup/product/log/page.do
  */
  bargain (params) {
    return fetch('/user/vgroup/product/log/page.do', params)
  },
  /*
  * 店铺关注
  * /user/vshop/attention/add.do
  */
  myConcern (params) {
    return fetch('/user/vshop/attention/add.do', params)
  },
  /*
  * 店铺关注列表内容
  * /user/vshop/attention/page.do
  */
  concernList (params) {
    return fetch('/user/vshop/attention/page.do', params)
  },
  /*
  * 取消店铺关注
  * /user/vshop/attention/cancel.do
  */
  follwCancel (params) {
    return fetch('/user/vshop/attention/cancel.do', params)
  },
  /*
 * 获取用户的砍价价格
 * /user/vgroup/product/log/price.do
 */
  getKanPrice (params) {
    return fetch('/user/vgroup/product/log/price.do', params)
  },
  /*
* 砍价下单
* /user/vgroup/product/log/price.do
*/
  getKanGrounp (params) {
    return fetch('/user/vgroup/order/deduct/add.do', params)
  },
/*  *----------------------------------------------------------------------

 * 用户登录 /user/personal.do
 */
/*  Login (params) {
    return fetch('/users/api/userLogin', params)
  }, */

    /**
     * 用户注册
     */
  Regist (params) {
    return fetch('/users/api/userRegist', params)
  },

    /**
     * 发送注册验证码
     */
  RegistVerifiCode (tellphone) {
    return fetch('/users/api/registVerifiCode', {tellphone: tellphone})
  },

    /**
     * 获取约跑步列表
     */
  SportsList () {
    return fetch('/api/sportList')
  },

    /**
     * 获取约出行列表
     */
  TravelsList () {
    return fetch('/api/travelList')
  },

    /**
     * 获取约跑步详情
     */
  SportsDetail (id) {
    return fetch('/api/sportDetail', {sportId: id})
  },

    /**
     * 获取约出行详情
     */
  TravelsDetail (id) {
    return fetch('/api/travelDetail', {travelId: id})
  },

    /**
     * 获取出行活动点击次数
     */
  travelClicks (id) {
    return fetch('/api/travelClickNum', {travelId: id})
  },

    /**
     * 获取用户信息
     */
  UserInfo (id) {
    return fetch('/users/api/userInfo', {userId: id})
  },

    /**
     * 获取用户发布约行个数
     */
  getPubTotravelNum (id) {
    return fetch('/users/api/getPubTotravelNum', {userId: id})
  },

     /**
      * 获取用户自己发布的约行
      */
  getMyTravel (id) {
    return fetch('/users/api/myTravel', {userId: id})
  },

    /**
     * 发布约行活动
     */
  PostTravel (params) {
    return fetch()
  },

    /**
     * 获取全国JSON数据
     */
  getAddressJson () {
    return fetch('/api/address')
  }
}
