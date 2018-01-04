<template>
  <div class="withdrawls-content">
    <x-header :left-options="{backText: ''}">账单详情</x-header>
    <div class="drewls-header">
      <div class="drewls-bran"><img style="width: 0.48rem;height: 0.48rem" src="../../common/image/avr.jpg"/>珊珊工作室（店铺名字）</div>
      <div class="drawls-money">-100.00</div>
      <div class="drawls-success">交易成功</div>
    </div>
    <div class="bill-content">
      <div class="drawls-public-box"><label>付款方式</label><span class="text-right">微信支付</span></div>
      <div class="drawls-public-box"><label>商品名称</label><span class="text-right">美睫毛168元套餐</span></div>
      <div class="box-line"></div>
      <div class="drawls-public-box"><label>创建时间</label><span class="text-right">2017-08-07 11:02</span></div>
      <div class="drawls-public-box"><label>订单号</label><span class="text-right">2572582432</span></div>
      <div class="box-line"></div>
    </div>
  </div>
</template>
<script>
  import { XHeader, Tab, TabItem, SwiperItem, Swiper, Scroller, LoadMore } from 'vux'
  export default {
    data () {
    },
    components: {
      XHeader,
      Tab,
      TabItem,
      SwiperItem,
      Swiper,
      Scroller,
      LoadMore
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .withdrawls-content
    position: absolute
    width: 100%
    min-height: 13.3rem
    background: #fff
    top: 0
    left: 0
    z-index: 101
    .vux-header
      background: #fff
      .vux-header-title
        color: #333
        font-size: 0.3rem
    .drewls-header
      border-top: 1px solid #eee
      .drewls-bran
        font-size: 0.3rem
        color: #333
        height: 0.48rem
        /*text-align: center*/
        line-height: 0.48rem
        margin: 0.3rem 0 0.42rem 0
        & img
          float: left
          margin-left: 2.52rem
          margin-right: 0.15rem
      .drawls-money
        text-align: center
        font-size: 0.48rem
        color: #f96c9e
      .drawls-success
        text-align: center
        font-size: 0.3rem
        color: #333
        margin-top: 0.26rem
    .bill-content
      margin-top: 0.97rem
      .box-line
        border-bottom: 0.02rem solid #eee
        margin: 0.2rem 0.3rem
      .drawls-public-box
        font-size: 0.3rem
        color: #8e8e8e
        margin: 0 0.3rem
        padding: 0.22rem 0
        height: auto
        overflow: hidden
        position: relative
        .text-right
          float: right
          color: #333
</style>
