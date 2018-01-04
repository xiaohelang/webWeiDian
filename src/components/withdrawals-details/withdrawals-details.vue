<template>
  <div class="withdrawls-content">
    <!--<x-header :left-options="{backText: ''}">提现详情</x-header>-->
    <div class="drewls-header">
      <div class="drewls-bran"><img style="width: 0.48rem;height: 0.48rem" src="../../common/image/avr.jpg"/>中国建设银行</div>
      <div class="drawls-money">100.00</div>
      <div class="drawls-success">成功</div>
    </div>
    <div class="drawls-content">
      <div class="drawls-public-box"><label>转出说明</label><span class="text-right">账户-转出到银行卡</span></div>
      <div class="drawls-public-box">
        <label>转出进度</label>
        <div class="roll-box">
          <div class="roll-list-box public-step first-step">
            <img class="roll-icon" src="../../common/image/ic_success_status@2x.png"/>
            <span class="success-red">提交成功</span>
            <span class="roll-time">08-07 11:02</span>
          </div>
          <div class="roll-list-box margin-both public-step second-step">
            <img class="roll-icon" src="../../common/image/ic_wait_state@2x.png"/>
            <span>平台处理中</span>
            <span class="roll-time">08-07 11:02</span>
          </div>
          <div class="roll-list-box public-step treed-step">
            <img class="roll-icon" src="../../common/image/ic_wait_state@2x.png"/>
            <span>到账成功</span>
            <span class="roll-time">08-07 11:02</span>
          </div>
        </div>
      </div>

      <div class="drawls-public-box"><label>转入账户</label><span class="text-right">中国建设银行（7991）</span></div>
      <div class="drawls-public-box"><label>到账时间</label><span class="text-right">72小时内到账</span></div>
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
    .drawls-content
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
        .roll-box
          width: 3.75rem
          float: right
          position: relative
          &:before
            content: ''
            height: 2.2rem
            border:1px solid #8E8E8E
            position: absolute
            left: 0.16rem
            top:0
            z-index: -1
        .roll-list-box
          height: 0.37rem
          line-height: 0.39rem
          position: relative
          .success-red
            color: #F96C9E
          .roll-time
            font-size: 0.22rem
            color: #333
            float: right
          .roll-icon
            width: 0.37rem
            height: 0.37rem
            float: left
            margin-right: 0.2rem
            background: #fff
        .margin-both
          padding: 0.59rem 0
        .public-step
          &:before
            content: ''
            border:1px solid #F96C9E
            position: absolute
            left: 0.16rem
            top:0
            z-index: -1
        .first-step
          &:before
             height: 0.6rem
        .second-step
          &:before
            height:1.2rem
        .treed-step
          &:before
            height:0.5rem
            top: -0.5rem

</style>
