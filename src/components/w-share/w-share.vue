<template>
  <div class="wshare">
      <div><img style="width: 7.5rem; height: 7.5rem;" src="../../common/image/shareImg2.png" alt=""></div>
      <div class="title">
        <p class="p1">一键下载美工场APP</p>
        <p class="p2">选我要开店，就可享用鲸带来的效益</p>
      </div>
      <a href="https://itunes.apple.com/cn/app/wen-xiu-shi/id1168246216" class="apple">
        <img style="width: 0.4rem; height: 0.4rem; position: relative; top: 0.05rem;" src="../../common/image/apple.png" alt="">
        <span>APP Store</span></a>
      <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.wxsapp.api.app.oneshow" class="apple">
        <img style="width: 0.4rem; height: 0.4rem;  position: relative; top: 0.05rem;" src="../../common/image/anzhuo.png" alt="">
        <span>安卓下载</span>
      </a>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '我是分享页面'
      }
    },
    methods: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .wshare-enter-active
    transition: all 0.5s

  .wshare-enter, .wshare-leave-to
    transform: translate3d(100%, 0, 0)
  .wshare
    position: absolute
    left: 0
    top: 0
    width: 7.5rem
    min-height: 13rem
    z-index: 99
    background: #f4f4f4
    .title
      width: 7.5rem
      color: #f96c9e
      margin-bottom: 0.5rem
      font-size: 0.32rem
      .p1
        text-align: center
        line-height: 0.5rem
      .p2
        line-height: 0.5rem
        text-align: center
    .apple
      display: block
      width: 3.12rem
      font-size: 0.32rem
      line-height: 0.72rem
      border-radius: 0.36rem
      border: 1px solid #f96c9e
      color: #f96c9e
      text-align: center
      margin:0.4rem auto 0
      height: 0.72rem

</style>
