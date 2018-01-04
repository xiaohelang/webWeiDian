<template>
  <transition name="detail">
    <div class="order-detail">
      <!--<x-header :left-options="{backText: ''}">下单详情</x-header>-->
      <ul class="hl-aress-box" @click="toAddress" v-show="!noDelivery">
        <li class="hl-aress-boxli" style="margin-top: 0.4rem;"><img class="aress-img"
                                                                    src="../../common/image/address.png" alt=""></li>
        <li class="hl-aress-boxli">
          <p style="color: #333; font-size: 0.28rem">姓名：{{itemAddress.consignee}} <span style="float: right;">{{itemAddress.phone}}</span></p>
          <p style="color: #333; font-size: 0.28rem; margin-top: 0.2rem; line-height: 0.45rem;">收货地址：{{ itemAddress.province + itemAddress.city + itemAddress.area + itemAddress.detailAddress}}</p>
        </li>
        <li class="hl-aress-boxli" style="margin-top: 0.4rem;"><img class="aress-img" style=" margin-left: 0.2rem; "
                                                                    src="../../common/image/arrow-r.png" alt=""></li>
      </ul>
      <div v-show="noDelivery" style="background: #fff;">
        <x-input title="联系人：" name="username" placeholder="请输入姓名" is-type="china-name" v-model="contactName"></x-input>
        <x-input title="联系电话：" name="mobile" placeholder="请输入手机号码" is-type="china-mobile" keyboard="number" v-model="mobilePhone"></x-input>
        <x-input title="备选联系方式：" name="email" placeholder="请输入邮箱或者QQ" v-model="qq"></x-input>
      </div>
      <group>
        <!--<cell :title="shopName" :value="pagState">-->
        <!--<img slot="child" class="cell-leftIcon" src="../../common/image/sale2.png" alt="">-->
        <!--</cell>-->
        <hl-cell :title="shopName" :value="pagState"></hl-cell>
        <!--<panel :footer="footer" :list="list" :type="type">-->
        <!--</panel>-->
        <ul class="hl-cell-box">
          <li class="hl-cell-boxli"><img class="li-img" :src="vProductDetail.shopProductImages[0]" alt=""></li>
          <li class="hl-cell-boxli">
            <p style="color: #333; font-size: 0.28rem">
              <span class="pro-contend">{{vProductDetail.vShopProductName}}</span>
              <span class="produst-price" style="color: #f96c9e">￥{{localPrice}}元</span>
            </p>
            <p style="color: #ccc; font-size: 0.24rem; margin-top: 0.2rem">
              <span class="pro-contend">{{vProductDetail.subTitle}}</span>
              <del class="produst-price">￥{{vProductDetail.marketPrice}}元</del>
            </p>
          </li>
        </ul>
        <x-number :title="nTitle" :min="1" v-model="orderNunber"></x-number>
      </group>
      <div style="background: #fff; margin-top: 0.1rem;">
        <radio :options="radio" @on-change="change"></radio>
      </div>
      <ul class="pay">
        <li class="payli"><span style="color: #333333;">实付款:</span><span
          style="font-size: 0.4rem; padding-left: 0.2rem; ">{{ localPrice*orderNunber}}</span>元
        </li>
        <li class="payli" :class="{ paymask : !isPay }" @click="allOrder">立即支付</li>
      </ul>
    </div>
  </transition>
</template>

<script>
  import { XHeader, Group, Cell, XButton, XNumber, Radio, XInput } from 'vux'
  import HlCell from '../../base/hl-cell/hl-cell'
  import api from '../../fetch/api'
  import { mapGetters } from 'vuex'
  import wx from 'weixin-js-sdk'
  import { isWeiXin } from '../../util/util'
  import { ERR_OK } from '../../common/js/config'

  export default {
    props: {
      pagState: {
        type: String,
        default: '待付款'
      },
      orderTime: {
        type: String,
        default: '455'
      },
      orderNo: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        vSPGuid: '',
        vShopGuid: '',
        shopName: '',
        vProductDetail: {},
        vGroupOrderGuid: '',
        vGroupProductType: 0,
        PreceiverGuid: '',
        itemAddress: {
          consignee: '',
          phone: '',
          province: '',
          city: '',
          area: '',
          detailAddress: ''
        },
        contactName: '',
        mobilePhone: '',
        qq: '',
        address: '广东省广州市天河区石牌桥牛乳房一巷39号',
        nTitle: '购买数量',
        orderNunber: 1,
        radio: [{
          icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504345524128&di=77a828b3600529fa18cb1066432d1121&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fwh%3D900%2C1200%2Fsign%3D971f02288a5494ee877707101dc5cccf%2Fa8014c086e061d956ebab4af7df40ad163d9caad.jpg',
          key: '001',
          value: '微信支付'
        }],
        isNoAddress: false,
        localPrice: 0,
        isPay: true,
        isSingerOrGrounp: '',
        noDelivery: true,
        vGroupProductLogGuid: ''
      }
    },
    mounted () {
      this.vSPGuid = this.$route.query.productId
      if (!this.vSPGuid) {
        this.vSPGuid = this.$getCookie('vShopProductGuid')
      }
      this.signApi()
      this.isSingerOrGrounp = window.localStorage.isSingerOrGrounp
      this.getAllAddressList()
      this.productdetail()
    },
/*    beforeRouteEnter (to, from, next) {
      if (to.path === '/porderdetail') {
        next(vm => {
          vm.getAllAddressList()
          vm.getPrice()
          vm.orderNunber = 1
        })
      }
    },  */
    activated () {
      this.vSPGuid = this.$route.query.productId
      if (!this.vSPGuid) {
        this.vSPGuid = this.$getCookie('vShopProductGuid')
      }
      this.signApi()
      this.isSingerOrGrounp = window.localStorage.isSingerOrGrounp
      this.getAllAddressList()
//      this.getPrice()
      this.productdetail()
      this.orderNunber = 1
    },
    methods: {
      change (key, value) {
        console.log('change:', key, value)
      },
      /* 定时接触按钮点击支付 */
      payTimeout () {
        this.isPay = false
        let timer = null
        let that = this
        clearTimeout(timer)
        timer = setTimeout(() => {
          that.isPay = true
        }, 2000)
      },
      /* 获取砍价后的价格 */
      getKanPrice () {
        let isSingerOrGrounp = window.localStorage.isSingerOrGrounp
        if (isSingerOrGrounp !== 'kan') {
          return
        }
        if (this.$route.query.vGroupProductLogGuid) {
          this.vGroupProductLogGuid = this.$route.query.vGroupProductLogGuid
        } else {
          return
        }
        let cToken = this.$getCookie('token')
//        let vGroupProductGuid = window.localStorage.vGroupProductGuid
        api.getKanPrice({
          token: cToken,
          vGroupProductLogGuid: this.vGroupProductLogGuid
//          vGroupProductGuid: vGroupProductGuid
        }).then(res => {
          console.log('获取砍价后的价格res')
          console.log(res)
          if (res.code === 0) {
            this.localPrice = parseFloat((res.data.price).toFixed(2))
          }
        }, err => {
          console.log('获取砍价价格失败err')
          console.log(err)
        })
      },
      /* 获取商品详情 */
      productdetail () {
//        let vSPGuid = this.$getCookie('vShopProductGuid')
        api.productInfo({
          vShopProductGuid: this.vSPGuid
        }).then(res => {
          console.log('获取商品详情res')
          console.log(res)
          if (res.code === 0) {
            this.vShopGuid = res.data.vShopGuid
            this.vProductDetail = res.data
            this.localPrice = res.data.price
            this.vGroupProductType = res.data.vGroupProductType
            this.noDelivery = res.data.noDelivery
            console.log('noDelivery')
            console.log(this.noDelivery)
            if (this.isSingerOrGrounp === 'kan' || this.isSingerOrGrounp === 'grounp' || this.isSingerOrGrounp === 'join') {
              this.getKanPrice()
              this.productActionRequest()
            }
            api.shopInfo({vShopGuid: this.vShopGuid}).then(res => {
              console.log('头部请求数据-2')
              console.log(res)
              if (res.code === 0) {
                this.shopName = res.data.shopName
              } else {
              }
            }, err => {
              console.log(err)
            })
          }
        }, err => {
//          this.$msgbox('商品详情异常', `code:${err.data.message}`)
          console.log(err)
        })
      },
      /* 微店商品活动 */
      productActionRequest () {
        api.productAction({
          vShopProductGuid: this.vSPGuid
        }).then(res => {
          console.log('店铺活动商品支付页面')
          console.log(res)
          if (res.code === 0) {
            if (res.data.recordList.length > 0) {
              if (res.data.recordList[0].vGroupProductType === 1) {
//                this.groupPrice = res.data.recordList[0].groupPrice
                this.localPrice = parseFloat((res.data.recordList[0].groupPrice).toFixed(2))
                console.log('拼团支付页面')
//                this.vGroupProductGuid = res.data.recordList[0].vGroupProductGuid
              } else if (res.data.recordList[0].vGroupProductType === 2) {
                this.localPrice = parseFloat((res.data.recordList[0].groupPrice).toFixed(2))
                this.getKanPrice()
                console.log('砍价支付页面')
              } else {
                this.$msgbox('提示', '没有此活动类型商品')
              }
            } else {
              console.log('单独购买')
            }
          } else {
            this.$msgbox('提示', `code:${res.message}`)
          }
        }, err => {
          console.log('店铺活动商品数据错误')
          console.log(err)
        })
      },
      /* 安卓支付 */
      anzhuoPay (jsonStr) {
//        let that = this
        this.$msgbox('提示', '请到微信端支付')
//        window.opPanel.doPay(jsonStr)
      },
      allOrder () {
        let that = this
        isWeiXin(function () {
          that.order()
        }, function () {
          that.anzhuoPay()
        })
      },
      order () {
//        console.log('不能重复下单!')
        if (this.isPay === false) {
          console.log('不能重复下单!')
          return
        }
        this.payTimeout()
//        this.isPay = false
        this.isSingerOrGrounp = window.localStorage.isSingerOrGrounp
        if (this.isSingerOrGrounp === 'singer') {
          console.log('单独购买')
          console.log(this.isSingerOrGrounp)
          this.getOrder()
        } else if (this.isSingerOrGrounp === 'grounp') {
          console.log('拼团购买')
          console.log(this.isSingerOrGrounp)
          this.getPingGrounp()
        } else if (this.isSingerOrGrounp === 'kan') {
          console.log('砍价购买')
          console.log(this.isSingerOrGrounp)
          this.getKanGrounp()
        } else if (this.isSingerOrGrounp === 'join') {
          console.log('加入拼团')
          console.log(this.isSingerOrGrounp)
          this.getJoinGrounp()
        }
      },
      getPrice () {
        this.localPrice = window.localStorage.price
      },
      /* 跳到地址 */
      toAddress () {
        if (this.isNoAddress === true) {
          localStorage.isEdit = false
//          this.$router.push('/addaddress')
          this.$router.push({path: '/addaddress', query: {productId: this.vSPGuid}})
        } else {
//          this.$router.push('/addresslist')
          this.$router.push({path: '/addresslist', query: {productId: this.vSPGuid}})
        }
      },
      /* 直接购买下单 */
      getOrder () {
//        let cToken = this.$getCookie('token')
        /* this.PreceiverGuid */
        api.addProduct({
//          token: cToken,
          vShopProductGuid: this.vSPGuid,
          quantity: this.orderNunber,
          vReceiverGuid: this.PreceiverGuid,
          contactName: this.contactName,
          mobilePhone: this.mobilePhone,
          qq: this.qq
        }).then(res => {
          console.log('下单成功')
          if (res.code === ERR_OK) {
            /* 解开禁止点击 */
            this.isPay = true
            let orderGuid = res.data.orderGuid
            let orderType = res.data.orderType
//            let aToken = this.$getCookie('token')
//            this.doPay(orderGuid, orderType, aToken)
            this.doPay(orderGuid, orderType)
          }
        }, err => {
          console.log('下单错误')
          console.log(err)
          this.$msgbox('提示', err.data.message)
        })
      },
      /* 活动拼团下单 */
      getPingGrounp () {
//        let cToken = this.$getCookie('token')
        let vGroupProductGuid = window.localStorage.vGroupProductGuid
        console.log(`vGroupProductGuid: ${vGroupProductGuid}`)
        api.orderAction({
//          token: cToken,
          vGroupProductGuid: vGroupProductGuid,
          quantity: this.orderNunber,
          vReceiverGuid: this.PreceiverGuid,
          contactName: this.contactName,
          mobilePhone: this.mobilePhone,
          qq: this.qq
        }).then(res => {
          console.log('拼团下单正确')
          console.log(res)
          /* 解开禁止点击 */
          this.isPay = true
          let orderGuid = res.data.orderGuid
          let orderType = res.data.orderType
          if (res.data.vGroupOrderGuid) {
            this.vGroupOrderGuid = res.data.vGroupOrderGuid
          }
//          let aToken = this.$getCookie('token')
//          this.doPay(orderGuid, orderType, aToken)
          this.doPay(orderGuid, orderType)
        }, err => {
          console.log('拼团或砍价下单错误')
          console.log(err)
          this.$msgbox('提示', err.data.message)
        })
      },

      /* 活动砍价下单 */
      getKanGrounp () {
//        let cToken = this.$getCookie('token')
        let vGroupProductGuid = window.localStorage.vGroupProductGuid
        if (this.$route.query.vGroupProductLogGuid) {
          this.vGroupProductLogGuid = this.$route.query.vGroupProductLogGuid
        } else {
          return
        }
        console.log(`vGroupProductGuid: ${vGroupProductGuid}`)
        api.getKanGrounp({
//          token: cToken,
          vGroupProductLogGuid: this.vGroupProductLogGuid,
          quantity: this.orderNunber,
          vReceiverGuid: this.PreceiverGuid,
          contactName: this.contactName,
          mobilePhone: this.mobilePhone,
          qq: this.qq
        }).then(res => {
          console.log('拼团下单正确')
          console.log(res)
          /* 解开禁止点击 */
          this.isPay = true
          let orderGuid = res.data.orderGuid
          let orderType = res.data.orderType
          if (res.data.vGroupOrderGuid) {
            this.vGroupOrderGuid = res.data.vGroupOrderGuid
          }
//          let aToken = this.$getCookie('token')
//          this.doPay(orderGuid, orderType, aToken)
          this.doPay(orderGuid, orderType)
        }, err => {
          console.log('拼团下单错误')
          console.log(err)
          this.$msgbox('提示', err.data.message)
        })
      },

      /* 加入拼团 */
      getJoinGrounp () {
//        let cToken = this.$getCookie('token')
        let vGOId = window.localStorage.vGroupOrderGuid
        this.vGroupOrderGuid = vGOId
        api.pingTuan({
//          token: cToken,
          vGroupOrderGuid: vGOId,
          quantity: this.orderNunber,
          vReceiverGuid: this.PreceiverGuid,
          contactName: this.contactName,
          mobilePhone: this.mobilePhone,
          qq: this.qq
        }).then(res => {
          console.log('加入拼团成功')
          console.log(res)
          if (res.code === ERR_OK) {
            /* 解开禁止点击 */
            this.isPay = true
            let orderGuid = res.data.orderGuid
            let orderType = res.data.orderType
//            let aToken = this.$getCookie('token')
//            this.doPay(orderGuid, orderType, aToken)
            this.doPay(orderGuid, orderType)
          } else {
            this.$msgbox('提示', '加入拼团错误')
          }
        }, err => {
          console.log('加入拼团失败')
          console.log(err)
          this.$msgbox('提示', err.data.message)
        })
      },
      /* 付款 */
      doPay (orderGuid, orderType) {
        api.doPay({
//          token: aToken,
          orderGuid: orderGuid,
          orderType: orderType
        }).then(res => {
          console.log('调起支付成功')
          console.log(res)
          let options = res.data
          this.wxPay(options)
        }, err => {
          console.log('调起支付错误')
          console.log(err)
          this.$msgbox('提示', err.data.message)
        })
      },
      wxPay (option) {
        let that = this
        wx.chooseWXPay({
          'appId': option.appid,
          'paySign': option.sign,
          'timestamp': option.timestamp,
          'nonceStr': option.noncestr,
          'package': option.packageValue,
          'signType': option.signType,
          'success': function (res) {
            console.log('支付成功88')
            console.log(res)
            if (res.errMsg === 'chooseWXPay:ok') {
//              alert('支付成功')
              if (that.vGroupProductType === 1 && that.isSingerOrGrounp === 'grounp') {
                that.$router.push({path: '/pinzhushare', query: {vGroupOrderGuid: that.vGroupOrderGuid}})
              } else if (that.vGroupProductType === 1 && that.isSingerOrGrounp === 'join') {
                that.$router.push({path: '/groupdetail', query: {vGroupOrderGuid: that.vGroupOrderGuid}})
              } else {
                that.toSuccess()
              }
            } else if (res.errMsg === 'chooseWXPay:cancel') {
//              alert('支付取消11')
              that.toNavigater('待付款', 1)
            } else if (res.errMsg === 'chooseWXPay:fail') {
              alert('支付失败')
            }
          }
        })
      },
      /* 跳转到待付款 */
      toNavigater (title, index) {
        localStorage.stateTitel = title
        localStorage.stateIndex = index
        this.$router.push('/myorder')
      },
      toSuccess () {
        let noDelivery = localStorage.noDelivery
        let isPing = localStorage.isPing
        console.log(noDelivery)
        console.log(typeof noDelivery)
        console.log(isPing)
        if (isPing === 'true') {
          this.toNavigater('待拼团', 2)
        } else if (isPing === 'false' && noDelivery === 'false') {
          this.toNavigater('待发货', 3)
        } else if (isPing === 'false' && noDelivery === 'true') {
          this.toNavigater('待收货', 4)
        }
      },
      /* 分享商品 */
      setShareProduct (optionFn) {
//        let vSPGuid = this.$getCookie('vShopProductGuid')
//        let vSPGuid = this.$route.query.productId
        api.shareProduct({
          vShopProductGuid: this.vSPGuid
        }).then(res => {
          console.log('分享成功2')
          console.log(res)
          if (res.code === 0) {
            optionFn && optionFn(res.data)
          }
        }, err => {
          console.log('分享错误2')
          console.log(err)
        })
      },
      /* 跳转到待拼单 */
      /* 跳转到待发货 */
      /* 跳转到待收货 */
      //      签名
      signApi () {
        let that = this
        let urlRe = encodeURIComponent(window.location.href)
        api.sign({
          url: urlRe
        }).then(res => {
          console.log('签名res')
          console.log(res)
          let config = res.data
          wx.config({
            debug: false,
            appId: config.appId,                // 必填，公众号的唯一标识
            timestamp: config.timestamp,        // 必填，生成签名的时间戳
            nonceStr: config.nonceStr,          // 必填，生成签名的随机串
            signature: config.signature,        // 必填，签名，见附录1
            jsApiList: config.jsApiList                // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
//          let options = {
//            title: '',
//            desc: '',
//            link: '',
//            imgUrl: '',
//            success: function () {
//            },
//            cancel: function () {
//            }
//          }
//          let that = this
          wx.ready(function () {
            that.setShareProduct(function (res) {
              let options = {
                title: res.shareTitle,
                desc: res.shareContent,
                link: res.shareUrl,
                imgUrl: res.shareLogo,
                success: function () {
                  console.log('ok')
                },
                cancel: function () {
                  console.log('not_ok')
                }
              }
              wx.onMenuShareTimeline(options)
              wx.onMenuShareAppMessage(options)
            })
          })
//          wx.ready(function (res) {
//            wx.onMenuShareTimeline(options)
//            wx.onMenuShareAppMessage(options)
//          })
        }, err => {
          console.log('签名err')
          console.log(err)
        })
      },
      getAllAddressList () {
//        let cToken = this.$getCookie('token')
//        {token: cToken}
        console.log(`isFrom:${window.localStorage.isFrom}`)
        if (window.localStorage.isFrom === 'goods') {
          api.allAddress().then(res => {
            if (res.code === ERR_OK) {
              console.log('获取地址列表成功2')
              console.log(res.data.recordList)
              let recordList = res.data.recordList
              if (recordList.length === ERR_OK) {
                this.itemAddress = {
                  consignee: '',
                  phone: '',
                  province: '',
                  city: '',
                  area: '',
                  detailAddress: ''
                }
                this.isNoAddress = true
              } else {
                this.isNoAddress = false
                for (let i = 0; i < recordList.length; i++) {
                  let item = recordList[i]
                  if (item.isDefault === true) {
                    this.PreceiverGuid = item.vReceiverGuid
                    this.getInfoAddress(this.PreceiverGuid)
                  }
                }
              }
            }
          }, err => {
            console.log('获取地址列表失败')
            console.log(err)
          })
        } else if (window.localStorage.isFrom === 'lists') {
//          this.itemAddress = this.vItemAddress
          this.PreceiverGuid = this.vItemAddress.vReceiverGuid
          this.getInfoAddress(this.vItemAddress.vReceiverGuid)
        }
      },
      getInfoAddress (PreceiverGuid) {
//        let cToken2 = this.$getCookie('token')
        api.infoAddress({
//          token: cToken2,
          vReceiverGuid: PreceiverGuid
        }).then(res => {
          if (res.code === ERR_OK) {
            this.itemAddress = {
              consignee: '',
              phone: '',
              province: '',
              city: '',
              area: '',
              detailAddress: ''
            }
            this.itemAddress = res.data
          }
        }, err => {
          console.log('获取收货地址失败')
          console.log(err)
          this.$msgbox('提示', err.data.message)
        })
      }
    },
    computed: {
      ...mapGetters([
        'vShopProductGuid',
        'vShopDetail',
        'vItemAddress'
      ])
    },
    components: {
      XHeader,
      Group,
      Cell,
      XButton,
      HlCell,
      XNumber,
      Radio,
      XInput
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
/*  .detail-enter-active
    transition: all 0.3s
  .detail-enter, .detail-leave-to
    transform: translate3d(100%, 0, 0)*/
  .order-detail
    font-size: 0.28rem
    position: absolute
    left: 0
    top: 0
    width: 7.5rem
    min-height: 100%
    z-index: 102
    background: #f4f4f4
    .vux-header
      background: #ffffff
      border-bottom: 0.03rem solid #f4f4f4
      .vux-header-title
        color: #333

    .pageState
      box-sizing: border-box
      padding-left: 0.7rem
      padding-top: 0.4rem
      background: #f96c9e
      color: #ffffff
      height: 1.48rem
      width: 100%
    .hl-aress-box
      display: flex
      flex-direction: row
      justify-content: space-around
      width: 100%
      height: 1.68rem
      background: #fff
      border-top: 1px solid #f4f4f4
      padding: 0.18rem 0.24rem
      box-sizing: border-box
      .hl-aress-boxli
        height: 0.32rem
        width: 0.4rem
        .aress-img
          width: 0.32rem
          height: 0.4rem
      .hl-aress-boxli:nth-child(2)
        width: 5rem
    .weui-cell
      color: #333
    .weui-cell__ft
      color: #f96c9e
    .cell-leftIcon
      top: 8px
      position: absolute
      width: 0.5rem
      left: 15px
    .hl-cell-box
      display: flex
      flex-direction: row
      justify-content: space-between
      width: 100%
      height: 2.04rem
      background: #f4f4f4
      border-top: 1px solid #f4f4f4
      padding: 0.18rem 0.24rem
      box-sizing: border-box
      .hl-cell-boxli
        height: 1.68rem
        width: 1.68rem
        .li-img
          width: 1.68rem
          height: 1.68rem
      .hl-cell-boxli:nth-child(2)
        width: 5rem
        & p
            height: auto
            overflow: hidden
            clear: both
        .pro-contend
          float: left
          width: 3.4rem
          overflow: hidden
          text-overflow: ellipsis
          display: -webkit-box
          -webkit-line-clamp: 2
          -webkit-box-orient: vertical
        .produst-price
          float: right
    .pay
      position: fixed
      z-index: 20000
      left: 0
      bottom: 0
      display: flex
      flex-direction: row
      background: #ffffff
      width: 100%
      height: 0.96rem
      .payli
        line-height: 0.96rem
        width: 70%
        height: 0.96rem
        font-size: 0.28rem
        padding-right: 0.3rem
        text-align: right
      .payli:nth-child(2)
        width: 30%
        position:relative
        color: #fff
        text-align: center
        line-height: 0.96rem
        background: #f96c9e
      /*  background: rgba(249, 108, 158, 1)*/
      .paymask
        opacity: 0.5
</style>
