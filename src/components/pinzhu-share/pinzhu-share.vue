<template>
  <div class="pinzhu-share">
    <img class="icon-img" src="../../common/image/pinzhu-share.png" alt="">
    <div>
      <p style="text-align: center; font-size: 0.32rem; margin-top: 0.5rem; color: #000;">
        还差<span style="color: red;">{{peopleNum}}</span>人，赶紧邀请还有来拼单吧！
      </p>
      <p style="text-align: center; font-size: 0.28rem; margin-top: 0.4rem; color: #000;">
        拼单人满后立即发货
      </p>
      <p style="text-align: center; font-size: 0.3rem; margin-top: 0.8rem; color: #000;">
        ！温馨提示
      </p>
      <p style="text-align: center; font-size: 0.28rem; margin-top: 0.4rem; color: #000;">
        拼主可在个人中心-我的拼单中查看拼单状态
      </p>
    </div>
    <div class="wait3" v-show="isChuli">
      <loading :loading="loading" :title="title"></loading>
    </div>
  </div>
</template>
<script>
  import api from '../../fetch/api'
  import {ERR_OK} from '../../common/js/config'
  import wx from 'weixin-js-sdk'
  import Loading from '../../base/loading/loading'

  export default {
    data () {
      return {
        peopleNum: 0,
        isChuli: true,
        title: '正在处理中...',
        loading: true
      }
    },
    mounted () {
//      this.timeOut()
    },
    activated () {
      this.timeOut()
      this.pingGrounpNum = window.localStorage.pingGrounpNum - 1
      console.log('pingGrounpNum')
      console.log(this.pingGrounpNum)
      this.peopleNum = window.localStorage.pingGrounpNum - 1
      this.signApi()
    },
    methods: {
      /* 拼主分享-数据请求 */
      userPinShare (vGroupOrderGuid, shareFn) {
//        let token = this.$getCookie('token')
        api.userPinShare({
//          token: token,
          vGroupOrderGuid: vGroupOrderGuid
        }).then(res => {
          console.log('拼单分享成功res')
          console.log(res)
          if (res.code === ERR_OK) {
            shareFn && shareFn(res.data)
          }
        }, err => {
          console.log('拼单分享失败err')
          console.log(err)
        })
      },
      /* 定时3秒 */
      timeOut () {
        let timer = null
        let that = this
        clearTimeout(timer)
        timer = setTimeout(() => {
          that.isChuli = false
        }, 3500)
      },
      //      签名
      signApi () {
        let that = this
        let urlRe = encodeURIComponent(window.location.href.split('#')[0])
        api.sign({
          url: urlRe
        }).then(res => {
          console.log('拼单分享签名')
          console.log(res)
          that.config = res.data
          wx.config({
            debug: false,
            appId: that.config.appId,                // 必填，公众号的唯一标识
            timestamp: that.config.timestamp,        // 必填，生成签名的时间戳
            nonceStr: that.config.nonceStr,          // 必填，生成签名的随机串
            signature: that.config.signature,        // 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
          wx.ready(function () {
            let vGroupOrderGuid = that.$route.query.vGroupOrderGuid
            that.userPinShare(vGroupOrderGuid, function (res) {
              let options = {
                title: res.shareTitle,
                desc: res.shareContent,
                link: res.shareUrl,
                imgUrl: res.shareLogo,
                success: function () {
                  console.log('ok')
                },
                cancel: function () {
                  console.log('not_ok')
                }
              }
              wx.onMenuShareTimeline(options)
              wx.onMenuShareAppMessage(options)
            })
          })
        }, err => {
          console.log('签名err')
          console.log(err)
        })
      }
    },
    components: {
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*  .detail-enter-active
      transition: all 0.3s
    .detail-enter, .detail-leave-to
      transform: translate3d(100%, 0, 0)*/
  .pinzhu-share
    font-size: 0.28rem
    position: absolute
    left: 0
    top: 0
    width: 7.5rem
    min-height: 13.4rem
    z-index: 103
    background: #f4f4f4
  .icon-img
    width: 7.5rem
    height: 3.8rem
  .wait3
    position: fixed
    z-index: 104
    background: rgba(255, 255, 255, 0.9)
    overflow: hidden
    line-height: 12rem
    text-align: center
    font-size: 0.4rem
    color: #fff
    top: 0
    left: 0
    bottom: 0
    right: 0
</style>
