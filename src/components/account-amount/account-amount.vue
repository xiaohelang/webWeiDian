<template>
  <div class="account-content">
    <!--<x-header :left-options="{backText: ''}">账户金额</x-header>-->
    <div class="accout-box-header">
      <div class="cash-pay">可提现余额：<span class="account-money">451.23 <em class="min-uit">元</em></span></div>
      <div class="drawals-button" @click="toBingBrank">提现</div>
    </div>
    <div class="border-line"></div>
    <tab :line-width=2 active-color='#fc378c' v-model="index">
      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2"
                @click="demo2 = item" :key="index" @on-item-click="selectItem(item,index)">{{item}}
      </tab-item>
    </tab>
    <div class="account-list">
      <ul>
        <li>
          <div class="brank-icon"><img src=""/></div>
          <div class="brank-content">
            <div class="brank-name">
              <span style="float: left; font-size: 0.32rem;">提现-银行卡</span>
              <span style="float: right; font-size: 0.32rem;">5000.00</span>
            </div>
            <div class="brank-time">08-07 23:04</div>
          </div>
        </li>
        <li>
          <div class="brank-icon"><img src=""/></div>
          <div class="brank-content">
            <div class="brank-name">
              <span style="float: left; font-size: 0.32rem;">提现-银行卡</span>
              <span style="float: right; font-size: 0.32rem;">5000.00</span>
            </div>
            <div class="brank-time">08-07 23:04</div>
          </div>
        </li>
        <li>
          <div class="brank-icon"><img src=""/></div>
          <div class="brank-content">
            <div class="brank-name">
              <span style="float: left; font-size: 0.32rem;">提现-银行卡</span>
              <span style="float: right; font-size: 0.32rem;">5000.00</span>
            </div>
            <div class="brank-time">08-07 23:04</div>
          </div>
        </li>
        <li>
          <div class="brank-icon"><img src=""/></div>
          <div class="brank-content">
            <div class="brank-name">
              <span style="float: left; font-size: 0.32rem;">提现-银行卡</span>
              <span style="float: right; font-size: 0.32rem;">5000.00</span>
            </div>
            <div class="brank-time">08-07 23:04</div>
          </div>
        </li>
        <li>
          <div class="brank-icon"><img src=""/></div>
          <div class="brank-content">
            <div class="brank-name">
              <span style="float: left; font-size: 0.32rem;">提现-银行卡</span>
              <span style="float: right; font-size: 0.32rem;">5000.00</span>
            </div>
            <div class="brank-time">08-07 23:04</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { XHeader, Tab, TabItem, SwiperItem, Swiper, Scroller, LoadMore } from 'vux'
  const list = () => ['收入记录', '提现记录']
  export default {
    data () {
      return {
        list2: list(),
        demo2: '收入记录',
        index: 0
      }
    },
    methods: {
      selectItem (item) {
        console.log(item)
      },
      toBingBrank () {
        this.$router.push('/bingbrank')
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
  .account-content
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
    .accout-box-header
      border-top: 1px solid #eee
      height: 1.46rem
      box-sizing:border-box
      -webkit-box-sizing:border-box /* Safari */
      .cash-pay
        width: auto
        line-height: 1.46rem
        float: left
        font-size: 0.3rem
        color: #333
        margin-left: 0.24rem
        .account-money
            font-size: 0.48rem
            color: #F96C9E
            .min-uit
               font-size: 0.3rem
               font-style: normal
      .drawals-button
        width: 1.27rem
        height: 0.43rem
        line-height: 0.46rem
        text-align: center
        border-radius: 0.05rem
        background: #F96C9E
        color: #fff
        margin: 0.54rem 0.32rem 0 0
        font-size: 0.24rem
        float: right
    .border-line
      height: 0.21rem
      background: #e8e8e8
    .account-list li
      height: 1.18rem
      border-bottom: 1px solid #E8E8E8
      .brank-icon
        width: 0.61rem
        height: 0.61rem
        float: left
        margin: 0.26rem
        background: #e8e8e8
      .brank-content
        width: 6rem
        float: left
        .brank-name
          font-size: 0.32rem
          color: #333
          overflow: hidden
          margin: 0.26rem 0
        .brank-time
          font-size: 0.24rem
          width 100%
          color: #ccc
      .brank-money
        font-size: 0.32rem
        color: #000
        float: right
        margin: 0.29rem 0.19rem 0 0
</style>
