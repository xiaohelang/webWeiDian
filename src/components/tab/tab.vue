<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/home">
      <img class="icon-img" src="../../common/image/home.png" alt="">
      <img class="icon-img2" src="../../common/image/home2.png" alt="">
      <span class="tab-link">店铺首页</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/home">
      <img class="icon-img" src="../../common/image/all.png" alt="">
      <img class="icon-img2" src="../../common/image/all2.png" alt="">
      <span class="tab-link">全部商品</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/home">
      <img class="icon-img" src="../../common/image/sale.png" alt="">
      <img class="icon-img2" src="../../common/image/sale2.png" alt="">
      <span class="tab-link">促销商品</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/home">
      <img class="icon-img" src="../../common/image/new.png" alt="">
      <img class="icon-img2" src="../../common/image/new2.png" alt="">
      <span class="tab-link">新品上架</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  .tab
    display: flex
    height: 1.02rem
    font-size: $font-size-medium
    background: #fff
    .tab-item
      flex: 1
      text-align: center
      .icon-img
        display: none
      .icon-img2
        display: block
        width: 0.36rem
        height: 0.36rem
        margin: 0.16rem auto 0.13rem
      .tab-link
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
        .tab-link
          color: $color-theme
          font-size: 0.2rem
          line-height: 0.16rem
          padding-bottom: 0.19rem
          border-bottom: 2px solid $color-theme
</style>
