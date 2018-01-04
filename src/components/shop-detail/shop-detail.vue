<template>
  <!--<transition name="detail">-->
    <div class="detail">
      <!--<div @click="shopDetail">按钮</div>-->
      <!--<iframe :src="vShopDetail.vShopIntroUrl" align="right" width="100%" height="100%"-->
              <!--scrolling="no" seamless="seamless" style="height: 15rem;  "-->
              <!--frameborder="0"></iframe>-->
      <div class="detail-info" v-html="vShopDetail.vShopIntro">
      </div>
    </div>
  <!--</transition>-->
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        title: '店铺详情页'
      }
    },
    methods: {
      shopDetail () {
//        return this.vShopDetail
        console.log('测试location')
        console.log(window.location)
//        window.location.assign(this.vShopDetail)
        console.log('Frame')
        console.log(window.frames)
      }
    },
    activated () {
      window.scrollTo(0, 0)
    },
    computed: {
      ...mapGetters([
        'vShopDetail'
      ])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
 /* .detail-enter-active
    transition: all 0.5s

  .detail-enter, .detail-leave-to
    transform: translate3d(100%, 0, 0)*/
  .detail
    position: absolute
    left: 0
    top: 2.56rem
    width: 7.5rem
    min-height: 10.5rem
    z-index: 99
    background: #f4f4f4
    .detail-info
      box-sizing: border-box
      font-size: 0.28rem
      color: #333
      padding: 0.15rem
</style>
