<template>
  <div class="bing-brank">
    <x-header :left-options="{backText: ''}">绑定提现账号</x-header>
    <div class="brank-cell">
      <div class="cell-left">
        <img style="width: 0.24rem; height: 0.24rem; margin-left: 0.38rem; float: left;" src="../../common/image/brank-type.png" alt="">
        <span style="font-size: 0.28rem; color: #333; margin-left: 0.2rem; float: left;">类型</span>
      </div>
      <div class="cell-right">
        <selector v-model="brankType" :options="list" @on-change="onTypeChange"></selector>
      </div>
    </div>
    <div v-if="isShowCard" class="brank-cell">
      <div class="cell-left">
        <img style="width: 0.24rem; height: 0.24rem; margin-left: 0.38rem; float: left;" src="../../common/image/brank-card.png" alt="">
        <span style="font-size: 0.28rem; color: #333; margin-left: 0.2rem; float: left;">银行</span>
      </div>
      <div class="cell-right">
        <selector v-model="cardType" :options="cardList"></selector>
      </div>
    </div>
    <div class="brank-cell">
      <div class="cell-left">
        <img style="width: 0.24rem; height: 0.24rem; margin-left: 0.38rem; float: left;" src="../../common/image/count.png" alt="">
        <span style="font-size: 0.28rem; color: #333; margin-left: 0.2rem; float: left;">账号</span>
      </div>
      <div class="cell-right">
        <x-input placeholder="请输入账号"></x-input>
      </div>
    </div>
    <div class="brank-cell">
      <div class="cell-left">
        <img style="width: 0.24rem; height: 0.24rem; margin-left: 0.38rem; float: left;" src="../../common/image/pernal.png" alt="">
        <span style="font-size: 0.28rem; color: #333; margin-left: 0.2rem; float: left;">姓名</span>
      </div>
      <div class="cell-right">
        <x-input placeholder="请输入姓名" is-type="china-name"></x-input>
      </div>
    </div>
    <div class="brank-cell">
      <div class="cell-left">
        <img style="width: 0.24rem; height: 0.24rem; margin-left: 0.38rem; float: left;" src="../../common/image/carID.png" alt="">
        <span style="font-size: 0.28rem; color: #333; margin-left: 0.2rem; float: left;">身份证</span>
      </div>
      <div class="cell-right">
        <x-input placeholder="请输入身份证号码"></x-input>
      </div>
    </div>
    <div class="brank-cell">
      <div class="cell-left">
        <img style="width: 0.24rem; height: 0.24rem; margin-left: 0.38rem; float: left;" src="../../common/image/phoneNum.png" alt="">
        <span style="font-size: 0.28rem; color: #333; margin-left: 0.2rem; float: left;">电话</span>
      </div>
      <div class="cell-right">
        <x-input placeholder="请输入电话" is-type="china-mobile"></x-input>
      </div>
    </div>
  </div>
</template>

<script>
  import { XHeader, Selector, Group, XInput } from 'vux'
  export default {
    data () {
      return {
        isShowCard: false,
        brankType: 'zfb',
        list: [{key: 'zfb', value: '支付宝'}, {key: 'yhk', value: '银行卡'}],
        cardType: 'zgyh',
        cardList: [{key: 'zgyh', value: '中国银行'}, {key: 'nyyh', value: '农业银行'}]
      }
    },
    methods: {
      onTypeChange (val) {
        if (val === 'zfb') {
          this.isShowCard = false
        } else {
          this.isShowCard = true
        }
      }
    },
    components: {
      XHeader,
      Selector,
      Group,
      XInput
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .bing-brank
    position: absolute
    width: 100%
    min-height: 13.3rem
    background: #fff
    top: 0
    left: 0
    z-index: 101
    .vux-header
      background: #fff
      border-bottom: 1px solid #eee
      .vux-header-title
        color: #333
        font-size: 0.3rem
    .brank-cell
      width: 100%
      height: 0.82rem
      padding: 0.14rem 0
      border-bottom: 1px solid #e8e8e8
      .cell-left
        margin-top: 0.26rem
        width: 1.8rem
        float: left
        justify-content: space-around
      .cell-right
        width: 5.22rem
        height: 0.82rem
        color: #333333
        background: #F9F9F9
        font-size: 0.28rem
        outline: none
        float : left

</style>
