<template>
  <div class="reset-pw">
    <x-header :left-options="{backText: ''}">修改密码</x-header>
    <div class="wrap">
      <div class="wrapImg"></div>
    </div>
    <div class="password">
      <img class="passwordImg" src="../../common/image/password.png" alt="">
      <div class="passwordIpt">
        <x-input placeholder="输入密码" type="password" v-model="password"></x-input>
      </div>
    </div>
    <div class="password">
      <img class="passwordImg" src="../../common/image/password.png" alt="">
      <div class="passwordIpt">
        <x-input placeholder="确认密码" v-model="password2" type="password" :equal-with="password"></x-input>
      </div>
    </div>
    <div class="password">
      <img class="passwordImg" style="width: 0.24rem;" src="../../common/image/phoneNum.png" alt="">
      <div class="passwordIpt">
        <x-input placeholder="输入手机号码"  is-type="china-mobile"></x-input>
      </div>
    </div>
    <div class="confirm">
        <div class="confirmLeft">
          <x-input placeholder="输入验证码" type="number"></x-input>
        </div>
        <a class="confirmRight">获取验证码</a>
    </div>
    <div class="login">
      登录
    </div>
  </div>
</template>

<script>
  import { XHeader, Group, XInput, ButtonTab, ButtonTabItem } from 'vux'
  export default {
    data () {
      return {
        password: '',
        password2: ''
      }
    },
    methods: {},
    components: {
      XHeader,
      Group,
      XInput,
      ButtonTab,
      ButtonTabItem
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .reset-pw
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
    .wrap
      width: 100%
      height: 2.4rem
      text-align: center
      .wrapImg
        height: 1.38rem
        width: 1.38rem
        display: inline-block
        margin-top: 0.98rem
        background: #ccc
        border-radius: 50%
    .password
      border: 1px solid #e8e8e8
      border-radius: 0.45rem
      margin: auto
      margin-top: 0.36rem
      display: flex
      width: 6.22rem
      height: 0.9rem
      .passwordImg
        height: 0.24rem
        width: 0.18rem
        margin-left: 0.4rem
        margin-top: 0.32rem
      .passwordIpt
        font-size: 0.32rem
        text-align: center
        color: #333333
        margin-right: 0.6rem
        flex: 1
        .weui-input
          text-align: center
    .confirm
      border-radius: 0.45rem
      margin: auto
      margin-top: 0.36rem
      display: flex
      width: 6.22rem
      height: 0.9rem
      .confirmLeft
        border: 1px solid #eeeeee
        border-top-left-radius: 0.42rem
        border-bottom-left-radius: 0.42rem
        flex: 1
        font-size: 0.32rem
        .weui-input
          text-align: center
          color: #747474
      .confirmRight
        display: block
        width: 2.5rem
        font-size: 0.32rem
        line-height: 0.82rem
        text-align: center
        background: #eeeeee
        color: #fff
        border: 1px solid #eeeeee
        border-top-right-radius: 0.42rem
        border-bottom-right-radius: 0.42rem
    .login
      border-radius: 0.45rem
      margin: auto
      border: 1px solid #eeeeee
      width: 6.22rem
      height: 0.9rem
      line-height: 0.9rem
      margin-top: 2.12rem
      text-align: center
      font-size: 0.32rem
      color: #ffffff
      background: #eeeeee
      cursor: pointer
</style>
