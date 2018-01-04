<template>
  <transition name="detail">
    <div class="order-detail">
        <!--<x-header :left-options="{backText: ''}">订单详情</x-header>-->
      <!--vOrderGuid-->
        <div class="pageState">
          <p style="font-size: 0.32rem; margin-bottom: 0.2rem;" v-if="itemList.vOrderState == 1">
            <span>待付款</span>
            <img style="width: 0.75rem;height: 0.75rem;position: absolute;right: 0.7rem;top: 0.2rem" src="../../common/image/tis-icon2.png"/>
          </p>
          <p style="font-size: 0.32rem; margin-bottom: 0.2rem;" v-else-if="itemList.vOrderState == 2">
            <span v-if="itemList.vShopProductType == 2">待消费</span>
            <span v-else>待发货</span>
            <img style="width: 0.75rem;height: 0.75rem;position: absolute;right: 0.7rem;top: 0.2rem" src="../../common/image/tis-icon1.png"/>
          </p>
          <p style="font-size: 0.32rem; margin-bottom: 0.2rem;" v-else-if="itemList.vOrderState == 3">
            <span>待收货</span>
            <img style="width: 0.75rem;height: 0.75rem;position: absolute;right: 0.7rem;top: 0.2rem" src="../../common/image/tis-icon3.png"/>
          </p>
          <p style="font-size: 0.32rem; margin-bottom: 0.2rem;" v-else-if="itemList.vOrderState == 5">待评价</p>
          <p style="font-size: 0.32rem; margin-bottom: 0.2rem;" v-else-if="itemList.vOrderState == 8">以关闭(过期)</p>
          <p style="font-size: 0.32rem; margin-bottom: 0.2rem;" v-else-if="itemList.vOrderState == 9">组团中</p>
          <p style="font-size: 0.24rem" v-if="itemList.vOrderState == 9">该团还差{{itemList.groupSize - itemList.orderSize}}人</p>
        </div>
        <ul class="hl-aress-box" v-if="itemList.vShopProductType==1">
          <li class="hl-aress-boxli"><img class="aress-img" src="../../common/image/address.png" alt=""></li>
          <li class="hl-aress-boxli">
            <p style="color: #333; font-size: 0.28rem">姓名：{{itemList.consignee}} <span style="float: right;">{{itemList.phone}}</span> </p>
            <p style="color: #333; font-size: 0.28rem; margin-top: 0.3rem">收货地址：{{itemList.detailAddress}}</p>
          </li>
        </ul>
        <ul class="hl-aress-box" v-if="itemList.vShopProductType==2">
          <li class="hl-aress-boxli"><img class="aress-img" src="../../common/image/address.png" alt=""></li>
          <li class="hl-aress-boxli">
            <p style="color: #333; font-size: 0.28rem">姓名：{{itemList.contactName}} <span style="float: right;">{{itemList.mobilePhone}}</span> </p>
            <p style="color: #333; font-size: 0.28rem; margin-top: 0.3rem">邮箱或QQ：{{itemList.qq}}</p>
          </li>
        </ul>
        <group>
          <hl-cell :title="itemList.vShopName" :value="isPageState(itemList.vOrderState, itemList.vShopProductType)"></hl-cell>
          <ul class="hl-cell-box">
            <li class="hl-cell-boxli"><img class="li-img" :src="itemList.vShopProductLogo" alt=""></li>
            <li class="hl-cell-boxli">
              <p style="color: #333; font-size: 0.28rem">{{itemList.vShopProductName}}</p>
              <p style="color: #ccc; font-size: 0.24rem; margin-top: 0.2rem">{{itemList.shortIntro}}</p>
            </li>
            <li class="hl-cell-boxli">
              <p style="color: #f96c9e; font-size: 0.28rem; line-height: 0.24rem; margin-top: 0.15rem;">￥{{itemList.price}}</p>
              <p style="color: #ccc; font-size: 0.24rem; margin-top: 0.15rem;">￥{{itemList.marketPrice}}</p>
            </li>
          </ul>
          <cell :title="commedTotal(itemList.quantity)" :value="totalMenoy(itemList.totalMoney)"></cell>
        </group>
        <group v-if="itemList.vShopProductType == 2 && itemList.vOrderState ==2 ">
          <cell :title="consumCode(itemList.verifyCode)"></cell>
        </group>
        <div v-if="itemList.vShopProductType == 2 && itemList.vOrderState ==2 " style="width: 100%; height: 2.1rem; background: #fff;text-align: center; ">
          <img style="width: 2rem; height: 2rem; margin-top: 0.05rem;" :src="qrcodeImg" alt="">
        </div>

        <group>
          <cell :title="orderNoFn(itemList.vOrderNo)"></cell>
          <cell :title="orderTimeFn(itemList.createDate)"></cell>
        </group>
        <div class="etyCell" v-if="itemList.vOrderState == 1">
          <x-button style="border-radius:99px; background: #f96c9e;" @click.native="doPay(itemList.vOrderGuid)"  mini type="primary">付款</x-button>
          <x-button style="border-radius:99px; color: #8e8e8e; border: 1px solid #8e8e8e" plain mini @click.native="canell(itemList.vOrderGuid)">取消订单</x-button>
        </div>
        <div class="etyCell" v-if="itemList.vShopProductType == 1 && itemList.vOrderState == 3">
          <x-button style="border-radius:99px; color: #8e8e8e; border: 1px solid #8e8e8e" plain mini @click.native="confirmReceipt(itemList.vOrderGuid)">确认收货</x-button>
        </div>
    </div>
  </transition>
</template>

<script>
  import { XHeader, Group, Cell, XButton } from 'vux'
  import api from '../../fetch/api'
  import HlCell from '../../base/hl-cell/hl-cell'
  import wx from 'weixin-js-sdk'
  import { isWeiXin } from '../../util/util'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    props: {
      pagState: {
        type: String,
        default: '待付款'
      },
      shopName: {
        type: String,
        default: '3'
      },
      name: {
        type: String,
        default: ''
      },
      address: {
        type: String,
        default: '广东省广州市天河区棠下街道荷光路文星酒店'
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
        detaileContan: '',
        orderGuid: '',
        orderType: 9,
        qrcodeImg: '',
        expiresIn: 0,
        timer: null,
        itemList: {},
        vShopProductType: 0,
        vShopProductGuid: ''
      }
    },
    created () {
//      let orderGuid = localStorage.vorderGuid
    },
    activated () {
      this.signApi()
      this.getOrder()
      this.getQrcode()
    },
    mounted () {
      this.signApi()
//      this.getQrcode()
//      let that = this
    },
    methods: {
      //  获取下单详情页
      getOrder () {
//        let cToken = this.$getCookie('token')
        api.orderDetails({
//          token: cToken,
          vOrderGuid: this.$route.query.vOrderGuid
        }).then(res => {
          console.log('获取订单详情')
          console.log(res)
          if (res.code === 0) {
            this.itemList = res.data
            this.vShopProductGuid = res.data.vShopProductGuid
            this.signApiShare()
          }
        }, err => {
          this.$msgbox('提示', err.data.message)
        })
      },
      doPay (orderGuid) {
        let that = this
        isWeiXin(function () {
          that.toPay(orderGuid)
        }, function () {
          let options2 = {
            'orderType': that.orderType,
            'payway': 2,
            'orderGuid': orderGuid
          }
          let jsonStr = JSON.stringify(options2)
          that.anzhuoPay(jsonStr)
        })
      },
      anzhuoPay (jsonStr) {
//        let that = this
        this.$msgbox('提示', '请到微信端支付')
//        window.opPanel.doPay(jsonStr)
      },
      orderTimeFn (timeFn) {
        return '交易时间：' + timeFn
      },
      orderNoFn (orderNo) {
        return '订单编码：' + orderNo
      },
      commedTotal (total) {
        return '共' + total + '件商品'
      },
      totalMenoy (fellMenoy) {
        return '实付￥' + fellMenoy
      },
      consumCode (feelNum) {
        return '消费码:' + feelNum
      },
      isPageState (orderStatus, itemCode) {
        if (orderStatus === 1) {
          return '待付款'
        } else if (orderStatus === 2) {
          if (itemCode === 2) {
            return '待消费'
          } else {
            return '待发货'
          }
        } else if (orderStatus === 3) {
          return '待收货'
        } else if (orderStatus === 5) {
          return '已完成'
        } else if (orderStatus === 6) {
          return '退款中'
        } else if (orderStatus === 7) {
          return '已退款'
        } else if (orderStatus === 8) {
          return '已关闭(过期)'
        } else if (orderStatus === 9) {
          return '组团中'
        }
      },
      canell (orderGuid) {
//        let cToken = this.$getCookie('token')
        let than = this
        this.$confirm('提示', '是否确定取消该订单?', function () {
          than.getCancelOder(orderGuid)
        })
      },
      getCancelOder (orderGuid) {
//        let cToken = this.$getCookie('token')
        api.cancelOrder({
//          token: cToken,
          vOrderGuid: orderGuid
        }).then(res => {
          let that = this
          if (res.code === 0) {
            this.$msgbox('提示', '取消成功', function () {
              that.getOrder()
//              that.$router.push('/myorder')
            })
          } else {
            alert('取消失败')
          }
        }, err => {
          this.$msgbox('提示', err.data.message)
        })
      },
//      确认收货
      confirmReceipt (orderGuid) {
        let than = this
//        let cToken = this.$getCookie('token')
        this.$confirm('提示', '是否确认收货?', function () {
          than.getConfirmReceipt(orderGuid)
//          than.getConfirmReceipt(orderGuid, cToken)
          console.log(orderGuid)
        })
      },
      /* 获取虚拟二维码 */
      getQrcode () {
//        let cToken = this.$getCookie('token')
//        let vOrderGuid = localStorage.vOrderGuid
        api.qrcode({
//          token: cToken,
          vOrderGuid: this.$route.query.vOrderGuid
        }).then(res => {
          if (res.code === 0) {
            this.qrcodeImg = res.data.qrcodeUrl
            this.expiresIn = res.data.expiresIn
            this.settime(res.data.expiresIn)
          }
        }, err => {
//          this.$msgbox('提示', err.data.message)res.data.expiresIn
          console.log(err.data.message)
        })
      },
      settime (time) {
        let than = this
        time--
        if (time <= 0) {
          than.getQrcode()
        } else {
          clearTimeout(than.timer)
          than.timer = setTimeout(function () {
            than.settime(time)
//            console.log(time)
          }, 1000)
        }
      },
      intervalQrcode (fnc) {
//        let vOrderGuid = localStorage.vOrderGuid
//        let cToken = this.$getCookie('token')
        api.qrcode({
//          token: cToken,
          vOrderGuid: this.$route.query.vOrderGuid
        }).then(res => {
          if (res.code === 0) {
            this.qrcodeImg = res.data.qrcodeUrl
            this.expiresIn = res.data.expiresIn
            fnc && fnc(this.expiresIn)
          }
        }, err => {
          this.$msgbox('提示', err.data.message)
        })
      },
      getConfirmReceipt (orderGuid) {
        api.confirm({
//          token: cToken,
          vOrderGuid: orderGuid
        }).then(res => {
          let that = this
          if (res.code === 0) {
            this.$msgbox('提示', '确认收货成功', function () {
//              that.$router.push('/myorder')
              that.getOrder()
            })
          } else {
            console.log('取消失败')
          }
        }, err => {
          this.$msgbox('提示', err.data.message)
        })
      },
      toPay (orderGuid) {
//        alert(orderGuid)
//        let token = this.$getCookie('token')
        api.doPay({
//          token: token,
          orderGuid: orderGuid,
          orderType: this.orderType
        }).then(res => {
          console.log('调起支付成功')
          console.log(res)
          let options = res.data
          this.wxPay(options)
        }, err => {
          console.log('调起支付错误')
          this.$msgbox('提示', err.data.message)
          console.log(err)
        })
      },
      wxPay (option) {
        let than = this
        wx.chooseWXPay({
//          'appId': option.appid,
          'paySign': option.sign,
          'timestamp': option.timestamp,
          'nonceStr': option.noncestr,
          'package': option.packageValue,
          'signType': option.signType,
          'success': function (res) {
            console.log('支付成功88')
            console.log(res)
//            alert('支付成功')
            if (res.errMsg === 'chooseWXPay:ok') {
//              alert('支付成功')
              than.getOrder()
            } else if (res.errMsg === 'chooseWXPay:cancel') {
              alert('支付取消')
            } else if (res.errMsg === 'chooseWXPay:fail') {
              alert('支付失败')
            }
          }
        })
      },
      //      签名
      signApi () {
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
//          wx.ready(function (res) {
//            wx.onMenuShareTimeline(options)
//            wx.onMenuShareAppMessage(options)
//          })
        }, err => {
          console.log('签名err')
          console.log(err)
        })
      },
      signApiShare () {
        let urlRe = encodeURIComponent(window.location.href)
        let that = this
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
        }, err => {
          console.log('签名err')
          console.log(err)
        })
      },
      setShareProduct (optionFn) {
//        let vSPGuid = this.$getCookie('vShopProductGuid')
//        let vSPGuid = this.$route.query.productId
        api.shareProduct({
          vShopProductGuid: this.vShopProductGuid
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
      ...mapMutations({
        setvOrderGuid: 'SET_VORDERGUID'
      })
    },
    computed: {
      ...mapGetters(['vOrderGuid'])
    },
    components: {
      XHeader,
      Group,
      Cell,
      XButton,
      HlCell
    },
    watch: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  vux-label
  .detail-enter-active
    transition: all 0.3s
  .detail-enter, .detail-leave-to
    transform: translate3d(100%, 0, 0)
  .order-detail
    font-size: 0.28rem
    position: absolute
    left: 0
    top: 0
    width: 7.5rem
    min-height: 13.3rem
    z-index: 102
    background: #f4f4f4
    overflow: auto
    .weui-cells
      margin-top: 0.1rem
    .vux-header
      background: #ffffff
      border-bottom: 0.03rem solid #f4f4f4
      .vux-header-title
        color: #333
    .pageState
      box-sizing: border-box
      padding: 0.4rem 0 0.2rem 0.7rem
      height: auto
      background: #f96c9e
      color: #ffffff
      width: 100%
    .hl-aress-box
      display: flex
      flex-direction: row
      justify-content: space-around
      width: 100%
      /*height: 1.68rem*/
      background: #fff
      border-top: 1px solid #f4f4f4
      padding: 0.18rem 0.2rem
      box-sizing: border-box
      .hl-aress-boxli
        min-height: 1rem
        width: 0.4rem
        .aress-img
          width: 0.4rem
          height: 0.52rem
          margin-top: 0.18rem
      .hl-aress-boxli:nth-child(2)
        width: 6rem
    .weui-cell
      color: #333
      font-size: 0.28rem
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
        width: 3.5rem
      .hl-cell-boxli:nth-child(3)
        width: 1.5rem
    .etyCell
      display: flex
      margin-top: 0.2rem
      flex-direction: row-reverse
      background: #fff
      border-top: 1px solid #eeeeee
      width: 100%
      padding: 2px
      box-sizing: border-box
      height: 0.8rem
      /*position: absolute*/
      /*bottom: 0*/
      .weui-btn
        width: 25%
        height: 0.54rem
        line-height: 0.54rem
        margin-right: 10px
        margin-left: 10px
        margin-top: 0.1rem
  .weui-dialog__hd
    padding: 0em 1.6em 0.1em !important
    color: #333 !important
</style>
