<template>
  <div class="cash-content">
    <x-header :left-options="{backText: ''}">提现</x-header>
    <div class="cash-header-box">
      <div class="min-title">输入金额：<span>￥</span></div>
      <input class="cash-size" type="text" value="0.00"/>
      <div class="max-cash">（输入金额在50以上）</div>
      <div class="use-cash">可提现金额：1800</div>
    </div>
    <div class="select-mode">选择到账方式</div>
    <div class="select-box-item">
       <div class="card-type">
         <span class="card-name">支付宝</span>
         <span class="card-avr"><img style="width: 0.37rem;height: 0.37rem" src="../../common/image/avr.jpg" /></span>
       </div>
      <div class="change-mode" @click="changeMethod">点击更换方式<i class="down-arrow"></i></div>
    </div>
    <div class="next-button">下一步</div>
    <!-- 选择银行卡 -->
    <div class="bran-pup" v-show="windowPup"></div>
    <div class="select-boxing" v-bind:class="{ show: isActive }">
      <div class="mode-title">选择付款方式<span class="close-btn" @click="closeMethod">x</span></div>
      <scroller lock-x height="3.2rem" @on-scroll="onScroll" ref="scrollerEvent">
        <div class="card-mode-list">
          <ul>
            <li>
              <span class="cart-icon"><img style="width: 0.37rem;height: 0.37rem" src="../../common/image/avr.jpg" /></span>
              <span>支付宝</span>
              <i class="right-rows"></i>
            </li>
            <li>
              <span class="cart-icon"><img style="width: 0.37rem;height: 0.37rem" src="../../common/image/avr.jpg" /></span>
              <span>支付宝1</span>
              <i class="right-rows"></i>
            </li>
          </ul>
        </div>
      </scroller>
    </div>
    <!-- 输入提现密码-->
    <div class="module-boxing">
      <input placeholder="输入账户密码" class="input-cash-pwd" type="password"/>
      <div class="forget-pwd">忘记密码？</div>
      <div class="mode-bottom-box">
        <div class="public-btn cancel-model">取 消</div>
        <div class="public-btn sure-model">确 定</div>
      </div>
    </div>
    <!-- end -->
  </div>
</template>
<script>
  import { XHeader, Tab, TabItem, SwiperItem, Swiper, Scroller, LoadMore } from 'vux'
  export default {
    data () {
      return {
        windowPup: false,
        isActive: false
      }
    },
    methods: {
      changeMethod () {
//        console.log('1111')
        this.windowPup = true
        this.isActive = true
      },
      closeMethod () {
        this.isActive = false
        this.windowPup = false
      },
      onScroll (pos) {
        this.scrollTop = pos.top
      }
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
  .cash-content
    position: absolute
    width: 100%
    min-height: 13.3rem
    background: #fff
    top: 0
    left: 0
    z-index: 101
    .vux-header
      background: #F96C9E
      .vux-header-title
        color: #fff
        font-size: 0.3rem
    .cash-header-box
      height: 3.2rem
      background: #f96c9e
      .min-title
        font-size: 0.3rem
        color: #fff
        padding: 0.15rem 0 0 0.39rem
        & span
           font-size: 0.5rem
      .cash-size
        width: 100%
        font-size: 1rem
        background: #f96c9e
        text-align: center
        color: #fff
        margin: 0.15rem 0
        outline: none
      .max-cash
        font-size: 0.2rem
        color: #fff
        text-align: center
      .use-cash
        font-size: 0.24rem
        margin-top:0.32rem
        text-align: center
        color: #fff
    .select-mode
      height: 0.79rem
      line-height: 0.81rem
      font-size: 0.28rem
      color: #ccc
      border-bottom: 1px solid #eee
      margin: 0 0.24rem
    .select-box-item
      height: 1.07rem
      line-height: 1.09rem
      border-bottom: 1px solid #eee
      padding: 0 0.24rem
      .card-type
        font-size: 0.3rem
        color: #333
        width: auto
        float: left
        .card-avr
          display: inline-block
          width: 0.37rem
          height: 0.37rem
          margin-left: 0.21rem
          line-height: 0.37rem
          line-height: 0.37rem
          vertical-align: middle
      .change-mode
        font-size: 0.28rem
        color: #cccccc
        float: right
        position: relative
        padding-right: 0.68rem
        .down-arrow
          &:after
            content: ""
            position: absolute
            width: 0.20rem
            height: 0.20rem
            border: 2px solid #ccc
            border-width: 2px 0 0 2px
            -webkit-transform: rotate(222deg)
            transform: rotate(222deg)
            top: 0.38rem
            right: 7px
    .next-button
      width: 6.71rem
      height: 0.89rem
      background: #f96c9e
      border-radius: 0.05rem
      margin: auto
      color: #fff
      text-align: center
      line-height: 0.91rem
      font-size: 0.32rem
      margin-top: 2rem
    .bran-pup
      position: fixed
      width: 100%
      height: 100%
      top: 0
      left: 0
      background: rgba(0,0,0,0.4)
    .select-boxing
      width: 100%
      height: 4rem
      background: #fff
      position: fixed
      left: 0
      bottom: 0
      -webkit-backface-visibility: hidden;
      -webkit-transition: -webkit-transform 0.4s cubic-bezier(0.465,0.183,0.153,0.946);
      transition: -webkit-transform 0.4s cubic-bezier(0.465,0.183,0.153,0.946);
      transition: transform 0.4s cubic-bezier(0.465,0.183,0.153,0.946);
      -webkit-transform: translate3d(0,100%,0);
      transform: translate3d(0,100%,0);
      &.show
        -webkit-transform: translate3d(0,0,0)
        transform: translate3d(0,0,0)
      .mode-title
        height: 0.75rem
        font-size: 0.3rem
        line-height: 0.77rem
        text-align: center
        color: #333
        position: relative
        border-bottom: 1px solid #eee
        .close-btn
          font-size: 0.4rem
          position: absolute
          right: 0.2rem
          top: 0
      .card-mode-list li
        height: 0.8rem
        line-height: 0.82rem
        font-size: 0.3rem
        border-bottom: 1px solid #eee
        position: relative
        color: #333
        .cart-icon
          display: inline-block
          width: 0.37rem
          height: 0.37rem
          line-height: 0.37rem
          vertical-align: middle
          margin-left: 0.2rem
        .right-rows
          &:after
            content: ""
            position: absolute
            width: 0.20rem
            height: 0.20rem
            border: 1px solid #ccc
            border-width: 1px 0 0 1px
            -webkit-transform: rotate(120deg)
            transform: rotate(135deg)
            top: 0.33rem
            right: 10px
    .module-boxing
      width: 6.41rem
      height: 3.21rem
      background: #fff
      border-radius: 0.1rem
      position: fixed
      left: 50%;
      top: 50%;
      margin-left: -3.205rem
      margin-top: -1.605rem
      z-index: 5
      display: none
      .input-cash-pwd
        width: 5.29rem
        height: 1.21rem
        line-height: 0.6rem
        background: #e8e8e8
        font-size: 0.32rem
        padding: 0 0.2rem
        outline: none
        display: inherit
        margin: auto
        margin-top: 0.36rem
        margin-bottom: 0.22rem
        border-radius: 0.1rem
      .forget-pwd
        font-size: 0.24rem
        color: #ccc
        margin-left: 0.37rem
      .mode-bottom-box
        height: auto
        overflow: hidden
        margin-top: 0.22rem
        .public-btn
          width: 1.49rem
          height: 0.57rem
          line-height: 0.59rem
          background: #ccc
          border-radius: 0.1rem
          float: left
          color: #fff
          font-size: 0.28rem
          text-align: center
        .cancel-model
           margin-left: 1.2rem
           margin-right: 1.03rem
        .sure-model
          background: #f96c9e
</style>
