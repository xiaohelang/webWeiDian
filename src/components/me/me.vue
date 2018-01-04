<template>
  <div class="me">
      <!--<x-header :left-options="{showBack: false}" title="个人中心"/>-->
      <div class="avrBox">
        <div class="avrBoxIn">
          <img class="boxImg" :src="headImgUrl" alt="">
          <div class="boxR">
            <p class="p1"><span>昵称：</span><span>{{memberName}}</span></p>
            <p class="p2"><span>电话号码：</span><span>{{mobilePhone}}</span></p>
          </div>
        </div>
      </div>
      <group>
        <cell title="我的订单" value="查看全部订单"  @click.native="toNation('全部',0)"></cell>
        <tab-item></tab-item>
      </group>
      <group class="addresClas">
        <!--<cell title="我的钱包"  value="451.23" is-link link="/accountamount">-->
          <!--<img slot="child" class="cell-leftIcon" src="../../common/image/wallet-icon.png" alt="">-->
        <!--</cell>-->
        <cell title="收货地址"  value="默认地址" is-link link="/addresslist">
          <img slot="child" class="cell-leftIcon" src="../../common/image/addres-icon.png" alt="">
        </cell>
        <!--<cell title="收货地址"  value="跳转到设置密码" is-link link="/resetpw">-->
          <!--<img slot="child" class="cell-leftIcon" src="../../common/image/addres-icon.png" alt="">-->
        <!--</cell>-->
      </group>
      <div class="me-box" @click="toConcern">
        <img class="me-icon-box" src="../../common/image/concer-icon.png" alt="">
        <span class="text-float">我的关注</span>
      </div>
      <div class="me-box" @click="toShare">
        <img class="me-icon-box" src="../../common/image/center-ionc6.png" alt="">
        <span class="text-float">分享砍价</span>
        <!--<span class="text-number">0</span>-->
      </div>
      <div class="me-box" @click="toGroup">
        <img class="me-icon-box" src="../../common/image/center-ionc7.png" alt="">
        <span class="text-float">我的拼单</span>
        <!--<span class="text-number">0</span>-->
      </div>
    </div>
</template>
<script>
  import { Group, Cell, XAddress, XHeader, ChinaAddressV3Data } from 'vux'
  import TabItem from '../../components/tab-item/tab-item'
  import api from '../../fetch/api'

  export default {
    data () {
      return {
        token: '',
        title: '个人中心页',
        headImgUrl: '',
        memberName: '',
        mobilePhone: '暂无电话号码',
        value3: ['广东省', '中山市', '--'],
        addressData: ChinaAddressV3Data
      }
    },
    created () {
//      this.pLogin()
      this.personalInfo()
    },
    methods: {
      /* 登录 */
      pLogin () {
        api.Login('/login.do', {
//          20BB3C28-BBDA-4629-A6E9-BB84DB5D5D3E  何亮
//          1AA32567-182E-4573-82A0-CB6EAD1BE4F1
//          52DEC0D7-7BBC-4840-BF85-5CB42DBE88CE  大树
//          EFEE4527-9F45-4546-8D20-0B8417ACC0A5 娜娜
          memberGuid: 'EFEE4527-9F45-4546-8D20-0B8417ACC0A5'
        }).then(res => {
          console.log('登录成功')
          console.log(res.data.token)
          if (res.code === 0) {
            this.token = res.data.token
            document.cookie = `token=${this.token}`
            this.personalInfo(this.token)
          }
        }, err => {
          console.log('登录失败')
          console.log(err)
        })
      },
      /* 用户信息 */
      personalInfo () {
//        let token = this.$getCookie('token')
//        {'token': token}
        api.Personal().then(res => {
          console.log('用户信息成功')
          console.log(res)
//          let ll = this.$getCookie('token')
          if (res.code === 0) {
            this.memberName = res.data.memberName
            if (res.data.mobilePhone === undefined) {
              this.mobilePhone = '暂无电话号码'
            } else {
              this.mobilePhone = res.data.mobilePhone
            }
            this.headImgUrl = res.data.headImgUrl
          }
        }, err => {
          console.log('用户信息失败')
          console.log(err)
        })
      },
      toNation (itme, index) {
        localStorage.stateTitel = itme
        localStorage.stateIndex = index
        this.$router.push('/myorder')
      },
      // 拼单功能
      toGroup () {
        this.$router.push('/GroupList')
      },
      // 砍价详情
      toShare () {
        this.$router.push('/sharelist')
      },
      // 我的关注列表
      toConcern () {
        this.$router.push('/concernlist')
      }
    },
    components: {
      Group,
      Cell,
      XAddress,
      XHeader,
      TabItem
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .me-enter-active
    transition: all 0.3s

  .me-enter, .me-leave-to
    transform: translate3d(100%, 0, 0)
  .me
    position: absolute
    left: 0
    top: 0
    width: 7.5rem
    min-height: 13rem
    z-index: 99
    background: #f4f4f4
    .vux-header
      height: 0.9rem
      background: #f96c9e
    .avrBox
      box-sizing: border-box
      background: pink
      padding-top: 0.54rem
      height: 2.24rem
      width: 7.5rem
      .avrBoxIn
        display: flex
        flex-direction: row
        margin-left: 1.32rem
        height: 1rem
        width: 4.86rem
        .boxImg
          border-radius: 50%
          height: 1rem
          width: 1rem
        .boxR
          font-size: 0.14rem
          margin-left: 0.27rem
          color: #fff
          .p1
            margin-top: 0.05rem
            font-size: 0.28rem
          .p2
            margin-top: 0.31rem
            font-size: 0.25rem
    .addresClas
      .vux-label
        padding-left: 0.62rem
    .weui-cells
      margin-top: 0.16rem
      .weui-cell__ft
        font-size: 0.28rem
    .vux-cell-primary
      font-size: 0.28rem
      color: #333333
    .cell-leftIcon
      position: absolute
      left: 0.4rem
      width: 0.32rem
      height: 0.40rem
    .weui-cell_access
      font-size: 0.28rem
      color: #ccc
    .me-box
      height: 0.78rem
      line-height: 0.80rem
      background: #fff
      margin-top: 0.15rem
      font-size: 0.28rem
      color: #333
      padding: 0 0.40rem
      .me-icon-box
        width: 0.38rem
        height: 0.38rem
        display: inline-block
        float: left
        margin-top: 0.20rem
        margin-right 0.15rem
      .text-float
        float: left
      .text-number
        float: left
        height: 0.32rem
        line-height: 0.34rem
        border-radius: 0.15rem
        font-size: 0.22rem
        background: #f96c9e
        padding: 0 0.15rem
        color: #fff
        margin: 0.15rem 0 0 0.12rem
  .weui-dialog__hd
    padding: 0em 1.6em 0.1em !important
    color: #333 !important
</style>
