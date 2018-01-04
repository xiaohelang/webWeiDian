<template>
  <div class="groupTemplate">
    <div v-show="showAll">
    <v-groupTemple :item='productMsg' :class="classTemple" @jumdetaile="jumdetaile" ></v-groupTemple>
    <ul class="hl-cellS">
      <li class="hl-cellSLi">
        <img style="width: 0.42rem; height: 0.42rem; margin-right: 0.1rem;" src="../../common/image/pinzhi.png" alt="">
        <span style="color: #8e8e8e;">品质保证</span>
      </li>
      <!--<li class="hl-cellSLi" v-show="noDelivery">-->
      <li class="hl-cellSLi" v-show="noDelivery">
        <img style="width: 0.42rem; height: 0.42rem; margin-right: 0.1rem;" src="../../common/image/fu.png"
             alt="">
        <span style="color: #8e8e8e;">服务商品</span>
      </li>
      <li class="hl-cellSLi">
        <img style="width: 0.42rem; height: 0.42rem; margin-right: 0.1rem;" src="../../common/image/tiexin.png" alt="">
        <span style="color: #8e8e8e;">贴心服务</span>
      </li>
    </ul>
    <div class="group-model">
      <v-user :userList="userList" :isquestion="isQuestion" v-show="isUserHead"></v-user>
      <!--v-if="productMsg.vGroupOrderState == 1" v-else-if="productMsg.vGroupOrderState == 2" v-else-if="productMsg.vGroupOrderState == 3"-->
      <div v-show="isGroupBtn">
        <div class="aut-places">仅剩<span class="num-color">{{ productMsg.groupSize - productMsg.orderSize }}</span>个名额，<v-count-down @time-end="message = '该团结束'" :endTime='endTime'></v-count-down></div>
        <div v-show="isHost && isGroupMember" :class="[togetherBtn, {overBtb: isActive}]" ref="triMode" @touchstart="startUp" @touchend="startEnd" @click="shareBtn">分享拼单</div>
        <div v-show="!isHost && isGroupMember" :class="[togetherBtn, {overBtb: isActive}]" ref="triMode" @touchstart="startUp" @touchend="startEnd" @click="shareBtn">分享拼单</div>
        <div v-show="!isHost && !isGroupMember" :class="[togetherBtn, {overBtb: isActive}]" ref="triMode" @touchstart="startUp" @touchend="startEnd" @click="onePuzzle">一键拼单</div>
      </div>
      <div v-show="!isGroupBtn">
        <div class="aut-places">{{ groupText }}</div>
        <div class="together-btn" ref="triMode" @touchstart="startUp" @touchend="startEnd" @click="toTeam(productMsg.vShopProductGuid)">去开团</div>
      </div>
    </div>
    <div class="spelling-note">
      <span style="color:#333">拼单须知</span>
      <span style="float: right">好友拼单·人满发货·人不满退款</span>
    </div>
    <!--分享弹窗-->
    <div class="layer-box" v-show="layerbox" @click="colseBox">
      <img class="layerImg" src="../../common/image/setShare.png"/>
    </div>
    <!--end-->
    <!--<div class="shop-title-box">-->
      <!--<div class="shop-name"><img style="width: 0.44rem;height: 0.44rem;margin: 0.28rem 0.15rem 0 0;" src="../../common/image/wshare.png"/>娜娜工作室</div>-->
      <!--<div class="look-shop">进店看看</div>-->
    <!--</div>-->
    <!--<div class="recommend-box">-->
      <!--<ul>-->
        <!--<li>-->
          <!--<img class="recomImg" src="http://wenxiu-bucket.oss-cn-shenzhen.aliyuncs.com/upload/question/2017-09-12/742cc640bf0540b996acb3c9ca1c6e821505214217264"/>-->
          <!--<h1 class="recom-title">单人时尚款式芭比美甲套餐</h1>-->
          <!--<p class="recom-price">￥128</p>-->
        <!--</li>-->
        <!--<li>-->
          <!--<img class="recomImg" src="http://wenxiu-bucket.oss-cn-shenzhen.aliyuncs.com/upload/question/2017-09-12/742cc640bf0540b996acb3c9ca1c6e821505214217264"/>-->
          <!--<h1 class="recom-title">单人时尚款式芭比美甲套餐</h1>-->
          <!--<p class="recom-price">￥128</p>-->
        <!--</li>-->
      <!--</ul>-->
    <!--</div>-->
    </div>
    <div v-show="!showAll">
      <div style="margin-top: 2rem; font-size: 0.36rem; color: #333; text-align: center;">{{message}}</div>
    </div>
  </div>
</template>
<script>
  import api from '../../fetch/api'
  import { getNowFormatDate, isWeiXin } from '../../util/util'
  import {ERR_OK, VSHOPPRODUCTTYPE_MATTER, VSHOPPRODUCTTYPE_FICT} from '../../common/js/config'
  import CountDown from '../down-time/down-time'
  import groupTemple from '../group-template/group-template'
  import userTemple from '../user-template/user-template'
  import wx from 'weixin-js-sdk'

  export default {
    data () {
      return {
        vShopProductGuid: '',
        productMsg: {},
        userList: [],
        countDown: '',
        vGroupOrderGuid: '',
        togetherBtn: 'together-btn',
        isActive: false,
        isHost: true,
        layerbox: false,
        isGroupMember: true,
        endTime: '2017-10-13 18:18:00',
        nowPrice: '',
        classTemple: 'class-temple',
        isUserHead: true,
        isQuestion: false,
        isGroupBtn: true,
        groupText: '该订单已拼单成功，请您重新开团',
        shareStr: '',
        vShopProductType: 0,    // 商品类型实物或虚拟
        noDelivery: false,    // 是否为实物或虚拟
        showAll: true,
        message: ''
      }
    },
    components: {
      'v-count-down': CountDown,
      'v-groupTemple': groupTemple,
      'v-user': userTemple
    },
    activated () {
      this.getLogId()
      this.getProduct()
      this.getUser()
      this.signApi()
      window.scrollTo(0, 0)
    },
    methods: {
      /* 安卓 */
      anzhuoShare () {
        let that = this
        window.opPanel.share(that.shareStr)
      },
      /* 根据url获取logId */
      getLogId () {
        if (this.$route.query.vGroupOrderGuid !== undefined) {
          this.vGroupOrderGuid = this.$route.query.vGroupOrderGuid
          return
        }
        let url = window.location.href
        let path = url.split('?')[1]
        if (path === undefined) {
          return
        }
        let str = url.split('?')[1]
        console.log(str)
        let str2 = url.split('?')[1].split('=')[1]
        let str3 = str2.split('#')[0]
        this.vGroupOrderGuid = str3
      },
      /*  @getProduct() => 获取产品信息 */
      getProduct () {
//        let cToken = this.$getCookie('token')
        api.pingDetail({
//          token: cToken,
          vGroupOrderGuid: this.vGroupOrderGuid
        }).then(res => {
          console.log('获取产品信息')
          console.log(res)
          if (res.code === ERR_OK) {
            this.productMsg = res.data
            this.isHost = res.data.isHost
            this.isGroupMember = res.data.isGroupMember
            this.vShopProductGuid = res.data.vShopProductGuid
            this.nowPrice = res.data.groupPrice
            this.vShopProductType = res.data.vShopProductType
            if (this.vShopProductType === VSHOPPRODUCTTYPE_MATTER) {
              this.noDelivery = false
            } else if (this.vShopProductType === VSHOPPRODUCTTYPE_FICT) {
              this.noDelivery = true
            }
            this.getTime(res.data.expiredDate)
            if (res.data.vGroupOrderState === 1) {
              this.isQuestion = true
            } else {
              this.isQuestion = false
            }
            // 按钮状态判断
            if (res.data.vGroupOrderState === 1) {
              this.isGroupBtn = true
            } else if (res.data.vGroupOrderState === 2 || res.data.vGroupOrderState === 3) {
              this.isGroupBtn = false
            }
            if (res.data.vGroupOrderState === 2) {
              this.groupText = '该订单已拼单成功，请您重新开团'
            } else if (res.data.vGroupOrderState === 3) {
              this.groupText = '该订单已过时效，请您重新开团'
            }
          }
        }, err => {
//          console.log('产品信息：' + err.data.message)
          this.showAll = false
          this.message = err.data.message
          this.$msgbox('提示', err.data.message)
        })
      },
      /* @getUser() => 获取用户列表信息 */
      getUser () {
//        let cToken = this.$getCookie('token')
        api.pingUserList({
//          token: cToken,
          vGroupOrderGuid: this.vGroupOrderGuid
        }).then(res => {
          console.log('获取用户列表信息')
          console.log(res)
          if (res.code === 0) {
            if (res.data.recordList.length > 0) {
              this.isUserHead = true
              this.userList = res.data.recordList
            } else {
              this.isUserHead = false
            }
          }
        }, err => {
          this.$msgbox('提示', err.data.message)
        })
      },
      // 时间处理
      getTime (expiredDate) {
        let currentTime = getNowFormatDate()
        currentTime = currentTime.replace(new RegExp('-', 'gm'), '/')
        let starttimeHaoMiao = (new Date(currentTime)).getTime()
//        let expiredDate = res.data.expiredDate
        expiredDate = expiredDate.replace(new RegExp('-', 'gm'), '/')
        let startTimeEnd = (new Date(expiredDate)).getTime()
        if ((startTimeEnd - starttimeHaoMiao) > 0) {
          this.endTime = expiredDate
          this.isActive = false
        } else {
          this.isActive = true
        }
      },
      // 跳转对应商品详情页
      jumdetaile (vShopProductGuid) {
        this.$router.push({path: '/gooddetail', query: {productId: vShopProductGuid}})
      },
      // 一键拼单
      onePuzzle () {
        window.localStorage.price = this.nowPrice
        window.localStorage.isSingerOrGrounp = 'join'
        window.localStorage.isFrom = 'goods'
        window.localStorage.vGroupOrderGuid = this.vGroupOrderGuid
        this.$router.push({path: '/porderdetail', query: {productId: this.vShopProductGuid}})
      },
      // 分享提示
      shareBtn () {
        let that = this
        isWeiXin(function () {
          that.layerbox = true
        }, function () {
          that.layerbox = false
          that.pingTeam(function (res) {
            let options2 = {
              'shareTitle': res.shareTitle,
              'shareContent': res.shareContent,
              'shareUrl': res.shareUrl,
              'shareLogo': res.shareLogo,
              'type': '微店商品'
            }
            that.shareStr = JSON.stringify(options2)
            that.anzhuoShare()
          })
        })
      },
      // 关闭提示
      colseBox () {
        this.layerbox = false
      },
      // 去开团
      toTeam (vShopProductGuid) {
        this.$router.push({path: '/gooddetail', query: {productId: vShopProductGuid}})
      },
      startUp () {
        this.$refs.triMode.style.background = '#ccc'
      },
      startEnd () {
        this.$refs.triMode.style.background = '#f96c9e'
      },
      /* 拼单分享-数据请求 */
      pingTeam (shareFn) {
//        let token = this.$getCookie('token')
        api.userPinShare({
//          token: token,
          vGroupOrderGuid: this.vGroupOrderGuid
        }).then(res => {
          console.log('拼单分享res')
          console.log(res)
          if (res.code === 0) {
            shareFn && shareFn(res.data)
          }
        }, err => {
          console.log('拼单分享err')
          console.log(err)
        })
      },
      //      签名
      signApi () {
        let that = this
        let urlRe = encodeURIComponent(window.location.href.split('#')[0])
        api.sign({
          url: urlRe
        }).then(res => {
          console.log('签名拼单分享res2')
          console.log(res)
          that.config = res.data
          wx.config({
            debug: false,
            appId: that.config.appId,                // 必填，公众号的唯一标识
            timestamp: that.config.timestamp,        // 必填，生成签名的时间戳
            nonceStr: that.config.nonceStr,          // 必填，生成签名的随机串
            signature: that.config.signature,        // 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
          wx.ready(function () {
            that.pingTeam(function (res) {
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
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .groupTemplate
    position: absolute
    left: 0
    top: 0
    width: 100%
    min-height: 13.3rem
    z-index:102
    background: #f4f4f4
    .class-temple
      padding: 0.2rem 0.25rem
    .hl-cellS
      display: flex
      flex-direction: row
      height: 1.02rem
      background: #fff
      margin-top: 0.12rem
      width: 100%
      font-size: 0.28rem
      .hl-cellSLi
        display: flex
        margin-top: 0.32rem
        margin-left: 0.2rem
        line-height: 0.42rem
        flex-direction: row
    .group-model
      margin-top: 0.13rem
      background: #fff
      padding: 0.65rem 0.25rem
      .aut-places
        font-size: 0.32rem
        color: #8e8e8e
        text-align: center
        /*margin-top: 0.6rem*/
        .num-color
          color: #f96c9e
      .s-people
        font-size: 0.32rem
        margin: 0.2rem 0 0 0
        color: #8e8e8e
        text-align: center
      .together-btn
        width: 5.8rem
        height: 0.72rem
        background: #f96c9e
        line-height: 0.74rem
        text-align: center
        color: #fff
        font-size: 0.32rem
        margin: auto
        margin-top: 0.5rem
        border-radius: 0.72rem
        &.overBtb
           background: #ccc
           pointer-events: none
    .spelling-note
      background: #ffffff
      padding: 0 0.25rem
      margin: 0.15rem 0 0 0
      height: 1rem
      line-height: 1.02rem
      font-size: 0.28rem
      color: #8e8e8e
    .shop-title-box
      display:flex
      flex-direction: row
      height: 1rem
      background: #ffffff
      padding: 0 0.25rem
      margin: 0.15rem 0
      font-size: 0.28rem
      .shop-name
        display: flex
        flex-direction: row
        line-height: 1.02rem
        color: #8e8e8e
      .look-shop
        width: 1.88rem
        height: 0.67rem
        line-height: 0.7rem
        border:1px solid #f96c9e
        border-radius: 0.1rem
        position: absolute
        right: 0.25rem
        color: #f96c9e
        text-align: center
        margin-top: 0.14rem
    .recommend-box
      height: auto
      overflow: hidden
      & li
         width: 3.68rem
         height: 4.96rem
         background: #fff
         float: left
         margin: 0 0rem 0.18rem 0
         float: left
         &:nth-child(2n)
             float: right
         .recomImg
           width: 3.68rem
           height: 3.68rem
           vertical-align: middle
         .recom-title
           font-size: 0.28rem
           color: #333
           padding: 0.24rem 0.15rem
           text-overflow: ellipsis
           white-space: nowrap
           overflow: hidden
         .recom-price
           font-size: 0.35rem
           color: #f96c9e
           padding: 0 0.15rem
    .layer-box
      width: 100%
      height: 100%
      position: fixed
      top: 0
      left: 0
      background: rgba(0,0,0,0.6)
      z-index: 103
      .layerImg
        width: 7.5rem
  .weui-dialog__hd
    padding: 0em 1.6em 0.1em !important
    color: #333 !important
</style>
