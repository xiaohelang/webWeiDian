<template>
  <div class="m-header">
    <div class="headerIn" :style="setBackground">
      <!--<canvas id="canvas-img"></canvas>-->
      <img src="../../common/image/hbg.png" class="h-cover" alt="">
      <!--<div class="headerTop">-->
        <!--<img class="hd-arrow" src="../../common/image/arrow.png" alt="">-->
      <!--</div>-->
      <div class="headerBot">
        <div class="hdBotLeft">
          <img class="logo" :src="avrImg" alt="">
          <div class="title">
            <p class="titleText">{{titleText}}</p>
            <p v-show="isTitleGuan" class="titleGuan">{{titleGuan}}</p>
          </div>
        </div>
        <div class="hdBotRight">
          <img class="brIcon" @click="shareBtn" src="../../common/image/share.png" alt="">
          <img class="brIcon" v-if="isWeixin" @click.stop="callPhone" src="../../common/image/phone.png" alt="">
          <img class="brIcon" @click="myConcern" src="../../common/image/star.png" alt="">
          <img class="brIcon" v-if="isWeixin" @click="conllect" src="../../common/image/collect@2x.png"/>
        </div>
      </div>
    </div>
    <!-- 收藏、分享的提示 -->
    <div class="layer-box" v-show="layerbox" @click="colseBox">
      <img class="layerImg" v-show="collState" src="../../common/image/collect.png"/>
      <img class="layerImg" v-show="shareState" src="../../common/image/setShare.png"/>
    </div>
    <!-- end -->
  </div>
</template>

<script type="text/ecmascript-6">
  import api from '../../fetch/api'
  import {mapMutations, mapGetters} from 'vuex'
  import { ERR_OK } from '../../common/js/config'
//  import wx from 'weixin-js-sdk'
  import {isWeiXin} from '../../util/util'

  export default {
    data () {
      return {
        headBg: '',
        backStyle: {
          background: 'url(' + this.headBg + ')'
        },
        avrImg: '',
        titleText: '',
        titleGuan: '',
        isTitleGuan: true,
        mobilePhone: '',
        layerbox: false,
        collState: false,
        shareState: false,
        isWeixin: true,
        shareStr: '',
//        04CBCB60-D34A-49D6-8F69-9964D0034614
//        EFC717FD-88ED-4E95-8706-41BDF35141AD
        vShopGuid: '04CBCB60-D34A-49D6-8F69-9964D0034614'
      }
    },
    activated () {
      console.log('toHeader')
      this.hhh()
      this.is_WeiXin()
      this.getShopInfo()
      this.getHeader()
    },
    created () {
      this.hhh()
      this.is_WeiXin()
      this.getShopInfo()
      this.getHeader()
//      api.testShop()
    },
    methods: {
      bgSize () {
        if (this.headBg !== '') {
          return 'bg2-size'
        }
        console.log('这是2.7版本')
        console.log('修改了拼团支付，砍价团购id错误的，上限团')
        console.log('修改支付页面的分享出来的链接，订单详情分享')
      },
      hhh () {
//        window.location.assign(url)
        let url = window.location.href
        let path = url.split('?')[1]
        if (path === undefined) {
          return
        }
        let str2 = url.split('?')[1].split('=')[1]
        this.vShopGuid = str2.split('#')[0]
      },
      callPhone () {
        window.location.href = 'tel://' + this.mobilePhone
      },
      getShopInfo () {
        api.shopInfo({vShopGuid: this.vShopGuid}).then(res => {
          console.log('头部请求数据-1-1')
          console.log(res)
          if (res.code === ERR_OK) {
            this.setvShopDetail(res.data)
            this.headBg = res.data.background
//          this.getImageSize(res.data.background)
            this.avrImg = res.data.shopLogo
            this.titleText = res.data.shopName
            this.titleGuan = res.data.verified === 1 ? '官方认证' : '未认证'
            this.vShopGuid = res.data.vShopGuid
            this.mobilePhone = res.data.mobilePhone
            this.setTitle(this.titleText)
            localStorage.titleText = this.titleText
            if (this.titleGuan === '未认证') {
              this.isTitleGuan = false
            } else {
              this.isTitleGuan = true
            }
          } else {
//          this.$msgbox('店铺异常', `code:${res.message}`)
          }
        }, err => {
          console.log(err)
//        this.$msgbox('店铺异常', `code:${err.data.message}`)
        })
      },
      getHeader () {
        api.shopInfo({vShopGuid: this.vShopGuid}).then(res => {
          console.log('头部请求数据-1-2')
          console.log(res)
          if (res.code === ERR_OK) {
            this.setvShopDetail(res.data)
            this.headBg = res.data.background
            this.avrImg = res.data.shopLogo
            this.titleText = res.data.shopName
            this.titleGuan = res.data.verified === 1 ? '官方认证' : '未认证'
            this.vShopGuid = res.data.vShopGuid
            this.setTitle(this.titleText)
            if (this.titleGuan === '未认证') {
              this.isTitleGuan = false
            } else {
              this.isTitleGuan = true
            }
          } else {
//          this.$msgbox('店铺异常', `code:${res.message}`)
          }
        }, err => {
          console.log(err)
//        this.$msgbox('店铺异常', `code:${err.data.message}`)
        })
      },
      conllect () {
        if (!this.isWeixin) {
          this.layerbox = false
          this.collState = false
          this.shareState = false
        } else {
          this.layerbox = true
          this.collState = true
          this.shareState = false
        }
      },
      /* 分享店铺按钮 */
      shareBtn () {
        this.collState = false
//        let that = this
        if (!this.isWeixin) {
          this.layerbox = false
          this.shareState = false
          this.setShareShop(function (res) {
            let options = {
              'shareTitle': res.shareTitle,
              'shareContent': res.shareContent,
              'shareUrl': res.shareUrl,
              'shareLogo': res.shareLogo,
              'type': '微店店铺'
            }
            let shareStr = JSON.stringify(options)
            window.opPanel.share(shareStr)
//            that.anzhuoShare(shareStr)
          })
        } else {
          this.layerbox = true
          this.shareState = true
        }
      },
      /* 安卓或ios分享 */
      anzhuoShare (shareStr) {
        window.opPanel.share(shareStr)
      },
      colseBox () {
        this.layerbox = false
      },
      // 关注店铺
      myConcern () {
//        let cToken = this.$getCookie('token')
        api.myConcern({
//          token: cToken,
          vShopGuid: this.vShopGuid
        }).then(res => {
          this.$msgbox('提示', '关注成功')
        }, err => {
          this.$msgbox('提示', err.data.message)
        })
      },
      /* 判断是否为微信浏览器 */
      is_WeiXin () {
        let that = this
        isWeiXin(function () {
          that.isWeixin = true
        }, function () {
          that.isWeixin = false
        })
      },
      /* 分享店铺 */
      setShareShop (optionFn) {
        api.shareShop({
          vShopGuid: this.vShopGuid
        }).then(res => {
          console.log('分享店铺成功')
          console.log(res)
          if (res.code === ERR_OK) {
            optionFn && optionFn(res.data)
          }
        }, err => {
          console.log('分享店铺错误')
          console.log(err)
        })
      },
      ...mapMutations({
        setvShopGuid: 'SET_VSHOPGUID',
        setvShopDetail: 'SET_VSHOPDETAIL'
      })
    },
    computed: {
      ...mapGetters([
        'vShopGuid2'
      ]),
      setBackground () {
        return { background: 'url(' + this.headBg + ') 0 0 / 100% 100%' }
      }
    },
    watch: {
      vShopGuid2 (newVal) {
        this.vShopGuid = newVal
        this.getHeader()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .m-header
    position: relative
    height: auto
    color: $color-theme
    font-size: 0
    #canvas-img
      width: 7.5rem
      height: 2.56rem
    .headerIn
      position: relative
      width: 7.5rem
      height: 2.56rem
      /*background: url('../../common/image/headBG.jpg')*/
      background-size: 7.5rem 2.5rem
      .h-cover
        width: 7.5rem
        height: 1.58rem
        position: absolute
        left: 0
        bottom: 0
      .headerTop
        width: 7.5rem
        height: 1.58rem
        .hd-arrow
          width: 0.19rem
          height: 0.36rem
          margin-top: 0.66rem
          margin-left: 0.4rem
      .headerBot
        width: 7.5rem
        height: 0.88rem
        position: absolute
        left: 0
        bottom: 5px
        .hdBotLeft
          width: 4.3rem
          height: 0.88rem
          float: left
          .logo
            width: 0.88rem
            height: 0.88rem
            border-radius: 0.1rem
            margin-left: 0.1rem
            float: left
          .title
            margin-left: 0.1rem
            color: #fff
            float: left
            .titleText
              font-size: 0.28rem
              margin-top: 0.1rem
            .titleGuan
              margin-top: 0.1rem
              width: 1.08rem
              height: 0.28rem
              text-align: center
              line-height: 0.28rem
              background-color: rgba(249, 108, 158, 1)
              font-size: 0.2rem
              border-radius: 0.05rem
        .hdBotRight
          margin-top: 0.2rem
          float: right
          width: 3rem
          height: 0.48rem
          .brIcon
            float: right
            height: 0.48rem
            width: 0.48rem
            margin: 0 0.12rem
    .img
      width: 100%
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 6px
      width: 30px
      height: 32px
      margin-right: 9px
      bg-image('logo')
      background-size: 30px 32px
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
    .layer-box
      width: 100%
      height: 100%
      position: fixed
      top: 0
      left: 0
      background: rgba(0,0,0,0.6)
      z-index: 103
      .layerImg
        width: 7.5rem
  .weui-dialog__hd
    padding: 0em 1.6em 0.1em !important
    color: #333 !important
</style>
