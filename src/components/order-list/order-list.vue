<template>
  <div class="order-list">
    <div v-if="itemList.length > 0">
      <!--我是订单列表{{itemList}}-->
      <div class="robbox" v-for="(order, index) in itemList" :key="index">
        <hl-cell :title="order.vShopName" :value="isPagState(order.vOrderState, order.vShopProductType)"></hl-cell>
        <ul class="hl-cell-box" @click="toDetail(order.vGroupOrderGuid, order.vOrderGuid, order.vOrderType, order.vOrderState)">
          <li class="hl-cell-boxli"><img class="li-img" v-lazy="order.vShopProductLogo" alt=""></li>
          <li class="hl-cell-boxli">
            <p style="color: #333; font-size: 0.28rem">{{order.vShopProductName}}</p>
            <p style="color: #ccc; font-size: 0.24rem; margin-top: 0.2rem">{{order.shortIntro}}</p>
          </li>
          <li class="hl-cell-boxli">
            <p style="color: #f96c9e; font-size: 0.24rem; line-height: 0.24rem; margin-top: 0.15rem;">￥{{order.price}}元</p>
            <p style="color: #ccc; font-size: 0.24rem; margin-top: 0.15rem;">￥{{order.marketPrice}}元</p>
          </li>
        </ul>
        <cell :title="isQuantity(order.quantity)" :value="isTotalMoney(order.totalMoney)"></cell>
        <div class="etyCell" v-if="order.vOrderState == 1">
          <x-button style="border-radius:99px; background: #f96c9e;" @click.native="doPay(order.vOrderGuid)" mini type="primary">付款</x-button>
          <x-button style="border-radius:99px; color: #8e8e8e; border: 1px solid #8e8e8e" plain mini @click.native="cancelOder(order.vOrderGuid)">取消订单</x-button>
        </div>
        <div class="etyCell" v-else-if="order.vOrderState == 2 || order.vOrderState == 3">
          <x-button style="border-radius:99px; color: #8e8e8e; border: 1px solid #8e8e8e" plain mini @click.native="toDetail(order.vGroupOrderGuid, order.vOrderGuid, order.vOrderType, order.vOrderState)">查看详情</x-button>
        </div>
        <div class="etyCell" v-else-if="order.vOrderState == 9">
          <img class="group-head" v-if="order.headImgUrl != undefined" :src="order.headImgUrl"/>
          <span class="group-head group-question" v-else>?</span>
          <!--<img v-else class="group-head" src="../../common/image/avr.jpg"/>-->
          <div class="group-people">{{ order.message }}</div>
          <x-button style="border-radius:99px; color: #8e8e8e; border: 1px solid #8e8e8e" plain mini @click.native="toDetail(order.vGroupOrderGuid, order.vOrderGuid, order.vOrderType, order.vOrderState)">查看详情</x-button>
        </div>
        <!--<div class="etyCell" v-else-if="order.vOrderState == 5">-->
          <!--<x-button style="border-radius:99px; color: #8e8e8e; border: 1px solid #8e8e8e" plain mini>去评价</x-button>-->
        <!--</div>-->
      </div>
    </div>
    <div v-else-if="itemList.length === 0">
      <div class="dataNothing">暂无数据</div>
    </div>
    <div v-if="itemList.length !== 0">
      <loading :loading="isLoading" :titleNo="titleNo"></loading>
    </div>
  </div>
</template>
<script>
  import { Group, Cell, Panel, XButton } from 'vux'
  import HlCell from '../../base/hl-cell/hl-cell'
  import { isWeiXin } from '../../util/util'
  import { mapMutations } from 'vuex'
  import Loading from '../../base/loading/loading'
  import wx from 'weixin-js-sdk'
  import api from '../../fetch/api'

//  window.opPanel.paySuccess = function (arg) {
//    this.$msgbox('提示', 'cancelOrder')
//    alert('window')
//    if (arg === '1') {
//      this.$emit('cancelOrder')
//    } else if (arg === '0') {
//      this.$msgbox('提示', '支付失败')
//    }
//  }

  export default {
    props: {
      itemList: {
        type: Array,
        default: '全部'
      },
      isLoading: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        shopName: '小丸子纹绣店',
        pagState: '待付款',
        type: '1',
        list: [{
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '广州韩束定妆广州韩束定妆广州韩束定妆',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/component/cell'
        }],
        orderType: 9,
        titleNo: '没有更多的订单~'
      }
    },
    created () {
      this.signApi()
    },
    methods: {
      /* @vOrderType 订单类型：1.普通订单 2.团购拼单 3. 砍价订单 */
      toDetail (vGroupOrderGuid, vOrderGuid, vOrderType, vOrderState) {
        if (vOrderType === 2 && vOrderState === 9) {
          this.$router.push({path: '/groupdetail', query: {vGroupOrderGuid: vGroupOrderGuid}})
        } else if (vOrderType === 2 && vOrderState === 2) {
          this.$router.push({path: '/groupSuccess', query: {vGroupOrderGuid: vGroupOrderGuid, vOrderGuid: vOrderGuid}})
        } else if (vOrderState === 1 || vOrderState === 2 || vOrderState === 3 || vOrderState === 5 || vOrderState === 6 || vOrderState === 7 || vOrderState === 8) {
          this.$router.push({path: '/orderdetail', query: {vOrderGuid: vOrderGuid}})
        }
      },
      cancelOder (vOrderGuidVal) {
//        let cToken = this.$getCookie('token')
        let than = this
        this.$confirm('提示', '是否确定取消该订单?', function () {
          than.getCancelOder(vOrderGuidVal)
        })
      },
      getCancelOder (vOrderGuidVal) {
//        let cToken = this.$getCookie('token')
        let that = this
        api.cancelOrder({
//          token: cToken,
          vOrderGuid: vOrderGuidVal
        }).then(res => {
          if (res.code === 0) {
//            window.location.reload()
            this.$msgbox('提示', '取消成功', function () {
              that.$emit('cancelOrder')
            })
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
      toPay (orderGuid) {
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
      /* 安卓ios支付 */
      anzhuoPay (jsonStr) {
//        let that = this
        this.$msgbox('提示', '请到微信端支付')
//        window.opPanel.doPay(jsonStr)
      },
//      paySuccess (arg) {
//        this.$msgbox('提示', 'cancelOrder')
//        if (arg === '1') {
//          this.$emit('cancelOrder')
//        } else if (arg === '0') {
//          this.$msgbox('提示', '支付失败')
//        }
//      },
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
              that.$emit('cancelOrder')
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
          let options = {
            title: '',
            desc: '',
            link: '',
            imgUrl: '',
            success: function () {
            },
            cancel: function () {
            }
          }
          wx.ready(function (res) {
            wx.onMenuShareTimeline(options)
            wx.onMenuShareAppMessage(options)
          })
        }, err => {
          console.log('签名err')
          console.log(err)
        })
      },
      isPagState (pagState, invert) {
        if (pagState === 1) {
          return '待付款'
        } else if (pagState === 2) {
          if (invert === 2) {
            return '待消费'
          } else {
            return '待发货'
          }
        } else if (pagState === 3) {
          return '待收货'
        } else if (pagState === 5) {
          return '已完成'
        } else if (pagState === 6) {
          return '退款中'
        } else if (pagState === 7) {
          return '已退款'
        } else if (pagState === 8) {
          return '已关闭(过期)'
        } else if (pagState === 9) {
          return '拼单中'
        }
      },
      isQuantity (quantity) {
        return '共' + quantity + '件商品'
      },
      isTotalMoney (totalMoney) {
        return '实付￥' + totalMoney + '元'
      },
      ...mapMutations({
        set_vOrderGuid: 'SET_VORDERGUID'
      })

    },
    components: {
      Group,
      Cell,
      Panel,
      HlCell,
      XButton,
      Loading
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .order-list
    font-size: 0.28rem
    /*position: absolute*/
    /*left: 0*/
    /*width: 7.5rem*/
    /*min-height: 13.3rem*/
    /*z-index: 100*/
    background: #f4f4f4
    .robbox
      width: 100%
      display: inline-block
      background: #fff
      margin-top: 0.15rem
      .weui-cell
        color: #333
        font-size: 0.3rem
        &:before
          border-top: none
      .cell-leftIcon
        top: 8px
        position: absolute
        width: 0.5rem
        left: 15px
      .weui-panel__bd
        height: 2.04rem
        .weui-media-box
          padding: 0.18rem
        .weui-media-box_appmsg .weui-media-box__hd
          height: 1.68rem
          width: 1.68rem
    .group-head
      width: 0.60rem
      height: 0.60rem
      position: absolute
      left: 0
      border-radius: 50%
      margin: 0.1rem
      &.group-question
        border:1px dashed #8e8e8e
        text-align: center
        line-height: 0.62rem
        font-size: 0.3rem
        color: #8e8e8e
    .group-people
      position: absolute
      left: 1rem
      line-height: 0.80rem
      color: #333
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
    flex-direction: row-reverse
    background: #fff
    border-top: 1px solid #f4f4f4
    width: 98%
    padding: 2px
    height: 0.8rem
    .weui-btn
      width: 27%
      height: 0.54rem
      line-height: 0.54rem
      margin-right: 10px
      margin-left: 10px
      margin-top: 0.1rem
  .dataNothing
    text-align: center
    font-size: 0.32rem
    margin-top: 0.56rem
    color: #333
  .weui-dialog__hd
    padding: 0em 1.6em 0.1em !important
    color: #333 !important
</style>
