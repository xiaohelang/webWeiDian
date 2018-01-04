<template>
  <div class="successTemplate">
    <div class="group-model" style="margin: 0">
      <v-user :userList="userList" :isquestion="isQuestion"></v-user>
      <div class="aut-places" style="color: #f96c9e"><img style="width: 0.48rem;height: 0.4rem; margin-right: 0.12rem" src="../../common/image/group-icon.png"/>拼单成功</div>
      <div class="s-people" v-show="!isQQ">商家正在努力发货，请耐心等待！</div>
      <div class="s-people" v-show="isQQ">已成功购买，消费时出示消费码或二维码</div>
      <!--<div class="together-btn" @click="toHome">去看看娜娜工作室</div>-->
    </div>
    <div class="address-messages">
      <div class="address-box">
        <span>商品名称</span>
        <span class="aside-right">{{ addressList.vShopProductName}}</span>
      </div>
      <div class="address-box">
        <span>收货人</span>
        <span class="aside-right">{{ addressList.consignee }}</span>
      </div>
      <div class="address-box">
        <span>联系电话</span>
        <span class="aside-right">{{ addressList.phone }}</span>
      </div>
      <div class="address-box" v-show="isQQ">
        <span>邮箱或QQ</span>
        <span class="aside-right">{{ addressList.qq }}</span>
      </div>
      <div class="address-box" v-show="!isQQ">
        <span>收货地址</span>
        <span class="aside-right">{{ addressList.detailAddress }}</span>
      </div>
      <div class="address-box">
        <span>拼单成功时间</span>
        <span class="aside-right">{{ addressList.groupCompleteDate }}</span>
      </div>
    </div>
    <div class="address-messages" v-show="isQQ">
      <div class="address-box">
        <span>消费码</span>
        <span class="aside-right">{{verifyCode}}</span>
      </div>
      <div class="address-box" style="height: auto; text-align: center; padding: 0.2rem;">
        <img :src="qrcodeImg" alt="">
      </div>
    </div>
    <!--<div class="commed-produst">推荐商品</div>-->
    <!--<div class="recommend-box">-->
      <!--<ul>-->
        <!--<li>-->
          <!--<img class="recomImg" src="http://wenxiu-bucket.oss-cn-shenzhen.aliyuncs.com/upload/question/2017-09-12/742cc640bf0540b996acb3c9ca1c6e821505214217264"/>-->
          <!--<h1 class="recom-title">单人时尚款式芭比美甲套餐单人时尚款式芭比美甲套餐</h1>-->
          <!--<p class="recom-price">￥128</p>-->
        <!--</li>-->
      <!--</ul>-->
    <!--</div>-->
  </div>
</template>
<script>
  import api from '../../fetch/api'
  import userTemple from '../user-template/user-template'
  import {ERR_OK, VSHOPPRODUCTTYPE_MATTER, VSHOPPRODUCTTYPE_FICT} from '../../common/js/config'

  function AddresList (item) {
    this.vShopProductName = item.vShopProductName
    this.consignee = item.consignee || item.contactName
    this.phone = item.phone || item.mobilePhone
    this.detailAddress = item.detailAddress
    this.groupCompleteDate = item.groupCompleteDate
    this.qq = item.qq
  }
  export default {
    data () {
      return {
        userList: [],
        addressList: {},
        vShopGuid: '',
        vOrderGuid: '', // 订单id
        isQuestion: false,
        isQQ: true,
        verifyCode: '', // 消费码
        qrcodeImg: '', // 二维码
        expiresIn: 0
      }
    },
    components: {
      'v-user': userTemple
    },
    activated () {
      this.getUser()
      this.getAddress()
      window.scrollTo(0, 0)
    },
    methods: {
      /*
      * @getUser() => 获取用户列表信息
      */
      getUser () {
//        let cToken = this.$getCookie('token')
        api.pingUserList({
//          token: cToken,
          vGroupOrderGuid: this.$route.query.vGroupOrderGuid
        }).then(res => {
          console.log('获取用户列表')
          console.log(res)
          if (res.code === ERR_OK) {
            this.userList = res.data.recordList
          }
        }, err => {
          this.$msgbox('提示', err.data.message)
        })
      },
      /*
      * 获取收货地址
      */
      getAddress () {
//        let cToken = this.$getCookie('token')
        api.orderDetails({
//          token: cToken,
          vOrderGuid: this.$route.query.vOrderGuid
        }).then(res => {
          console.log('获取收货地址')
          console.log(res)
          if (res.code === ERR_OK) {
            if (res.data.vShopProductType === VSHOPPRODUCTTYPE_MATTER) {
              this.isQQ = false
              this.addressList = new AddresList(res.data)
            } else if (res.data.vShopProductType === VSHOPPRODUCTTYPE_FICT) {
              this.isQQ = true
              this.getQrcode()
              this.getOrder()
              this.addressList = new AddresList(res.data)
            }
//            this.addressList = res.data
            this.vShopGuid = res.data.vShopGuid
          }
        }, err => {
          this.$msgbox('提示', err.data.message)
        })
      },
      toHome () {
        this.$router.push({path: '/home', query: {vShopGuid: this.vShopGuid}})
//        console.log(`this.vShopGuid:${this.vShopGuid}`)
      },
      /* 获取虚拟二维码 */
      getQrcode () {
//        let cToken = this.$getCookie('token')
        api.qrcode({
//          token: cToken,
          vOrderGuid: this.$route.query.vOrderGuid
        }).then(res => {
          console.log('获取二维码')
          console.log(res)
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
      //  获取下单详情页 中的消费码
      getOrder (vOrderGuid) {
//        let cToken = this.$getCookie('token')
        api.orderDetails({
//          token: cToken,
          vOrderGuid: this.$route.query.vOrderGuid
        }).then(res => {
          console.log('获取订单详情')
          console.log(res)
          if (res.code === 0) {
            this.verifyCode = res.data.verifyCode
          }
        }, err => {
          this.$msgbox('提示', err.data.message)
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
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .successTemplate
    position: absolute
    left: 0
    top: 0
    width: 100%
    min-height: 13.3rem
    z-index:102
    background: #f4f4f4
    .group-model
      margin-top: 0.13rem
      background: #fff
      padding: 0.65rem 0.25rem
      .aut-places
        font-size: 0.32rem
        color: #8e8e8e
        text-align: center
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
    .address-messages
      display: flex
      flex-direction: column
      background: #ffffff
      margin-top: 0.15rem
      .address-box
        height: 0.87rem
        line-height: 0.89rem
        border-bottom: 1px solid #e8e8e8
        font-size: 0.28rem
        color: #333
        padding: 0 0.25rem
        .aside-right
          width: 70%
          webkit-text-overflow: ellipsis
          display: -webkit-box
          -webkit-line-clamp: 1
          -webkit-box-orient: vertical
          overflow: hidden
          float: right
          text-align: right
          color: #8e8e8e
    .commed-produst
      height: 0.85rem
      line-height: 0.87rem
      color: #333
      font-size: 0.28rem
      padding: 0 0.25rem
      background: #ffffff
      margin-top: 0.15rem
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
  .weui-dialog__hd
    padding: 0em 1.6em 0.1em !important
    color: #333 !important
</style>
