<template>
  <div class="group-box" @click="ProdustDetail(item.vShopProductGuid)">
    <img class="product-img" :src="item.vShopProductLogo"/>
    <div class="product-message">
      <h1 class="pro-title">{{ item.vShopProductName }}</h1>
      <div class="group-message">{{ item.groupSize }}人拼单&nbsp;•&nbsp;已拼{{ item.salesVolume }}件</div>
      <div class="product-price"><span class="symbol">￥</span>{{ item.price || item.groupPrice }}<span class="symbol">元</span></div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      item: {
        type: Object
      }
    },
    methods: {
      ProdustDetail (vShopProductGuid) {
        this.$emit('jumdetaile', vShopProductGuid)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .group-box
    padding: 0.2rem 0.25rem
    background: #fff
    height: auto
    overflow: hidden
    .product-img
      width: 1.7rem
      height: 1.7rem
      float: left
    .product-message
      width 5.1rem
      float: left
      margin-left: 0.2rem
      .pro-title
        font-size: 0.28rem
        line-height: 0.35rem
        color: #333
        /*height: 0.7rem*/
        -webkit-text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
        overflow: hidden
      .group-message
        font-size: 0.27rem
        color: #8e8e8e
        padding: 0.15rem 0 0.25rem 0
      .product-price
        font-size: 0.4rem
        color: #f96c9e
        .price-sym
          font-size: 0.28rem
</style>
