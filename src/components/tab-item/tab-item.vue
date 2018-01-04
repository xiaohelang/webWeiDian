<template>
  <div class="tabA">
    <div class="tabA-line"></div>
    <!--<router-link tag="div" class="tabA-item" to="/myorder?pendPay=待付款&stateIndex=1">-->
    <div class="tabA-item" @click="toNation('待付款',1)">
      <badge :text="awaitPayOrderCount" v-if="awaitPayOrderCount > 0 "></badge>
      <img class="icon-img2" src="../../common/image/center-ionc1.png" alt="">
      <span class="tabA-link">待付款</span>
    </div>
    <!--</router-link>-->
    <!--<router-link tag="div" class="tabA-item" to="/myorder?pendPay=待拼单&stateIndex=2">-->
    <!--<div class="tabA-item" @click="toNation('待拼单',2)">-->
      <!--<badge :text="awaitGroupOrderCount" v-if="awaitGroupOrderCount > 0 "></badge>-->
      <!--<img class="icon-img2" src="../../common/image/center-ionc2.png" alt="">-->
      <!--<span class="tabA-link">待拼单</span>-->
    <!--</div>-->
    <!--</router-link>-->
    <!--<router-link tag="div" class="tabA-item" to="/myorder?pendPay=待发货&stateIndex=3">-->
    <div class="tabA-item" @click="toNation('待发货',3)">
      <badge :text="awaitDeliveryOrderCount" v-if="awaitDeliveryOrderCount > 0 "></badge>
      <img class="icon-img2" src="../../common/image/center-ionc3.png" alt="">
      <span class="tabA-link">待发货</span>
    </div>
    <!--</router-link>-->
    <!--<router-link tag="div" class="tabA-item" to="/myorder?pendPay=待收货&stateIndex=4">-->
    <div class="tabA-item" @click="toNation('待收货',4)">
      <badge :text="deliveryOrderCount" v-if="deliveryOrderCount > 0 "></badge>
      <img class="icon-img2" src="../../common/image/center-ionc4.png" alt="">
      <span class="tabA-link">待收货</span>
    </div>
    <!--</router-link>-->
    <!--<router-link tag="div" class="tabA-item" to="/myorder?pendPay=待评价&stateIndex=5">-->
    <!--<div class="tabA-item" @click="toNation('待评价',5)">-->
      <!--<badge :text="awaitCommentOrderCount" v-if="awaitCommentOrderCount > 0 "></badge>-->
      <!--<img class="icon-img2" src="../../common/image/center-ionc5.png" alt="">-->
      <!--<span class="tabA-link">待评价</span>-->
    <!--</div>-->
    <!--</router-link>-->
  </div>
</template>
<script type="text/ecmascript-6">
  import {Badge} from 'vux'
  import api from '../../fetch/api'
  export default {
    props: {
      payState: {
        type: Number
      }
    },
    data () {
      return {
        awaitPayOrderCount: 0,
        awaitGroupOrderCount: 0,
        awaitDeliveryOrderCount: 0,
        deliveryOrderCount: 0,
        awaitCommentOrderCount: 0
      }
    },
    methods: {
      orderCout () {
//        let cToken = this.$getCookie('token')
//        {token: cToken}
        api.orderCount().then(res => {
          if (res.code === 0) {
//            this.stateVal = res.data
            this.awaitPayOrderCount = res.data.awaitPayOrderCount
            this.awaitGroupOrderCount = res.data.awaitGroupOrderCount
            this.awaitDeliveryOrderCount = res.data.awaitDeliveryOrderCount
            this.deliveryOrderCount = res.data.deliveryOrderCount
            this.awaitCommentOrderCount = res.data.awaitCommentOrderCount
          }
          console.log(res)
        })
      },
      toNation (itme, index) {
//        console.log(itme)
        localStorage.stateTitel = itme
        localStorage.stateIndex = index
        this.$router.push('/myorder')
      }
    },
    activated () {
      this.orderCout()
    },
    components: {
      Badge
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  .tabA
    position: relative
    display: flex
    width: 7.5rem
    height: 1.5rem
    font-size: $font-size-medium
    background: #fff
    .tabA-line
      width: 7.3rem
      position: absolute
      right: 0
      top: 0
      border-bottom: 1px solid #ccc
    .tabA-item
      flex: 1
      text-align: center
      position: relative
      .vux-badge
        position: absolute
        top: 0.2rem
        /*left: 0.8rem*/
      .icon-img
        display: none
      .icon-img2
        display: block
        width: 0.38rem
        height: 0.38rem
        margin: 0.4rem auto 0.22rem
      .tabA-link
        color: #333
        padding-bottom: 0.19rem
        display: block
        font-size: 0.22rem
        line-height: 0.22rem
      &.router-link-active
        .icon-img
          display: block
          width: 0.38rem
          height: 0.38rem
          margin: 0.4rem auto 0.13rem
        .icon-img2
          display: none
        .tabA-link
          color: $color-theme
          font-size: 0.2rem
          line-height: 0.16rem
          padding-bottom: 0.19rem
</style>
