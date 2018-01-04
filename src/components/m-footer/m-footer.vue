<template>
  <div class="tabF">
    <router-link tag="div" class="tabF-item" to="/wshare">
      <img class="icon-img" src="../../common/image/wshare.png" alt="">
      <img class="icon-img2" src="../../common/image/wshare2.png" alt="">
      <span class="tabF-link">我要开店</span>
    </router-link>
    <router-link tag="div" class="tabF-item" to="/home">
      <img class="icon-img" src="../../common/image/shop.png" alt="">
      <img class="icon-img2" src="../../common/image/shop2.png" alt="">
      <span class="tabF-link">店铺商品</span>
    </router-link>
    <router-link tag="div" class="tabF-item" to="/shopdetail">
      <img class="icon-img" src="../../common/image/detail.png" alt="">
      <img class="icon-img2" src="../../common/image/detail2.png" alt="">
      <span class="tabF-link">店铺详情</span>
    </router-link>
    <router-link tag="div" class="tabF-item" to="/me">
      <img class="icon-img" src="../../common/image/me.png" alt="">
      <img class="icon-img2" src="../../common/image/me2.png" alt="">
      <span class="tabF-link">会员中心</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  .tabF
    position: fixed
    z-index: 100
    left: 0
    bottom: 0
    display: flex
    width: 100%
    margin: 0 auto
    height: 1.02rem
    font-size: $font-size-medium
    background: #fff
    .tabF-item
      flex: 1
      text-align: center
      .icon-img
        display: none
      .icon-img2
        display: block
        width: 0.36rem
        height: 0.36rem
        margin: 0.16rem auto 0.13rem
      .tabF-link
        padding-bottom: 0.19rem
        color: $color-text-l
        display: block
        font-size: 0.2rem
        line-height: 0.16rem
      &.router-link-active
        .icon-img
          display: block
          width: 0.36rem
          height: 0.36rem
          margin: 0.16rem auto 0.13rem
        .icon-img2
          display: none
        .tabF-link
          color: #f96c9e
          font-size: 0.2rem
          line-height: 0.16rem
          padding-bottom: 0.19rem
</style>
