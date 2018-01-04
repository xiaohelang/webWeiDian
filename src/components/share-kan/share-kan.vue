<template>
  <div class="share-kan">
    <share-kantp :date="date"
                 :time="time"
                 @closeShow="closeShow"
                 @openShow="openShow"
                 @helpKan="helpKan"
                 @iWant="iWant"
                 @shareKan="shareKan"
                 @toBuy="toBuy"
                 @shareKanHelp="shareKanHelp"
                 @setShare="setShare"
                 :isShow="isShow"
                 :cell="cell"
                 :nowPrice="nowPrice"
                 :chaPrice="chaPrice"
                 :kanPrice="kanPrice"
                 :user="user"
                 :textList="textList"
                 :isHost="isHost"
                 :isKan="isKan"
                 :isShowShare="isShowShare"
                 :isWeixin="isWeixin"
                 :isActive="isActive"
                 :showMinPrice="showMinPrice"
                 @toDetail="toDetail"
    ></share-kantp>
  </div>
</template>

<script>
  import ShareKantp from '../share-kantp/share-kantp'
  import api from '../../fetch/api'
  import {ERR_OK} from '../../common/js/config'
  import {isWeiXin} from '../../util/util'
  import wx from 'weixin-js-sdk'

  function KanList (options) {
    this.headImgUrl = options.headImgUrl
    this.message = options.message
    this.deductPrice = options.deductPrice
  }
  export default {
    data () {
      return {
        isShow: false,
        isShowShare: false,
        vGroupProductLogGuid: '',
        vShopProductGuid: '',
        config: {},
        cell: {
          img: 'http://wenxiu-bucket.oss-cn-shenzhen.aliyuncs.com/head/2017-09-27/4.jpg',
          title1: '',
          title2: '',
          oldPrice: 0,
          lowPrice: 0,
          vShopProductGuid: ''
        },
        date: '',
        time: '',
        nowPrice: 0,
        chaPrice: 199,
        kanPrice: 399,
        priceList: [10.2, 11.8, 20.6],
        isHost: false,
        isKan: false,
        isWeixin: true,
        isActive: false,
        showMinPrice: true,
        used: 1,
        user: {
          img: '',
          text: ''
        },
        textList: [],
        imgs: [
          'http://wenxiu-bucket.oss-cn-shenzhen.aliyuncs.com/head/2017-09-27/1.jpg',
          'http://wenxiu-bucket.oss-cn-shenzhen.aliyuncs.com/head/2017-09-27/2.jpg',
          'http://wenxiu-bucket.oss-cn-shenzhen.aliyuncs.com/head/2017-09-27/3.jpg',
          'http://wenxiu-bucket.oss-cn-shenzhen.aliyuncs.com/head/2017-09-27/4.jpg',
          'http://wenxiu-bucket.oss-cn-shenzhen.aliyuncs.com/head/2017-09-27/5.jpg',
          'http://wenxiu-bucket.oss-cn-shenzhen.aliyuncs.com/head/2017-09-27/6.jpg'
        ],
        texts: [
          '这人品谁能档我!?',
          '这手气买六合彩去...',
          '别谢我，请叫我雷锋',
          '人品跟气质成正比',
          '我就是砍价高手',
          '厉害了，国足进世界杯了'
        ]
      }
    },
    activated () {
      this.is_WeiXin()
      this.getLogId()
      this.signApi()
      this.userKanDetail(this.vGroupProductLogGuid)
      this.userKanList(this.vGroupProductLogGuid)
    },
 /*   created () {
      this.getLogId()
      this.signApi()
      this.userKanDetail(this.vGroupProductLogGuid)
      this.userKanList(this.vGroupProductLogGuid)
    },  */
    methods: {
      /* 兼容安卓ios分享 */
      quanShare () {
//        this.is_weixin()
        this.showShare = true
      },
      is_WeiXin () {
        let that = this
        isWeiXin(function () {
          that.isWeixin = true
        }, function () {
          that.isWeixin = false
        })
      },
      /* 关闭蒙层 */
      closeShow () {
        this.isShow = false
        this.random()
      },
      /* 打开蒙层 */
      openShow () {
        this.isShow = true
        this.random()
      },
      /* 关闭分享砍价蒙版 */
      setShare () {
        this.isShowShare = false
      },
      /* 帮忙砍价 */
      helpKan () {
//        this.isKan = false
        console.log('helpKan')
        if (this.vGroupProductLogGuid === '') {
          return
        } else {
          this.userKanHelp(this.vGroupProductLogGuid)
        }
      },
      /* 我也想要 */
      iWant () {
        this.$router.push({path: '/gooddetail', query: {productId: this.vShopProductGuid}})
      },
      /* 找人砍价 */
      shareKan () {
        console.log('shareKan')
        this.isShowShare = true
        this.signApi()
      },
      /* 安卓或ios分享 */
      anzhuoShare (shareStr) {
        window.opPanel.share(shareStr)
      },
      /* 发起人分享或者未砍价分享 */
      shareKanHelp () {
        console.log('shareKanHelp')
        /* 适配安卓ios的分享内容 */
        let that = this
        if (!that.isWeixin) {
          that.isShowShare = false
          this.setKanShare(function (res) {
            let options = {
              'shareTitle': res.shareTitle,
              'shareContent': res.shareContent,
              'shareUrl': res.shareUrl,
              'shareLogo': res.shareLogo,
              'type': '微店商品'
            }
            let shareStr = JSON.stringify(options)
            that.anzhuoShare(shareStr)
          })
        } else {
          this.isShowShare = true
        }
        console.log(`isShowShare:${this.isShowShare}`)
        this.signApi()
      },
      /* 去购买 */
      toBuy () {
        if (this.vGroupProductGuid === '' && this.nowPrice === 0) {
          return
        }
        document.cookie = `vShopProductGuid=${this.vShopProductGuid}`
//        window.localStorage.price = this.nowPrice
        window.localStorage.isSingerOrGrounp = 'kan'
//        window.localStorage.vGroupProductGuid = this.vGroupProductGuid
        window.localStorage.isFrom = 'goods'
//        this.$router.push('/porderdetail')
        this.$router.push({path: '/porderdetail', query: {productId: this.vShopProductGuid, vGroupProductLogGuid: this.vGroupProductLogGuid}})
        console.log('toBuy')
      },
      /* 点击图片跳转到详情页 */
      toDetail (vShopProductGuid) {
        this.$router.push({path: '/gooddetail', query: {productId: vShopProductGuid}})
      },
      /* 1-6的随机数 */
      random () {
        let rand = Math.floor(Math.random() * 6)
        return rand
      },
      /* 根据url获取logId */
      getLogId () {
        if (this.$route.query.vGroupProductLogGuid !== undefined) {
          this.vGroupProductLogGuid = this.$route.query.vGroupProductLogGuid
          return
        }
        let url = window.location.href
        let path = url.split('?')[1]
        if (path === undefined) {
          return
        }
        let str = url.split('?')[1]
        console.log(str)
        let str2 = url.split('?')[1].split('=')[1]
        let str3 = str2.split('#')[0]
        this.vGroupProductLogGuid = str3
        console.log(`vGroupProductLogGuid-hhh:${this.vGroupProductLogGuid}`)
      },
      /* 砍价详情数据请求 */
      userKanDetail (vGroupProductLogGuid) {
//        let token = this.$getCookie('token')
        api.userKanDetail({
//          token: token,
          vGroupProductLogGuid: vGroupProductLogGuid
        }).then(res => {
          console.log('sharekan')
          console.log(res)
          if (res.code === ERR_OK) {
            this.vShopProductGuid = res.data.vShopProductGuid
            if (res.data.isHost !== undefined) {
              this.isHost = res.data.isHost
            }
            if (res.data.helped !== undefined) {
              this.isKan = res.data.helped
            }
            if (res.data.showMinPrice !== undefined) {
              this.showMinPrice = res.data.showMinPrice
            }
//            this.isKan = false
            console.log('res.data:')
            console.log(res.data)
            let expiredDateStr = res.data.expiredDate
            window.localStorage.vGroupProductGuid = res.data.vGroupProductGuid
            if (expiredDateStr !== '') {
              let expiredDateArr = expiredDateStr.split(' ')
              this.date = expiredDateArr[0]
              this.time = expiredDateArr[1]
            }
            if (res.data.used) {
              this.used = res.data.used
            }
            this.cell = {
              img: res.data.shopProductLogo,
              title1: res.data.vShopProductName,
              title2: res.data.shortIntro,
              oldPrice: res.data.originalPrice,
              lowPrice: res.data.minPrice,
              vShopProductGuid: res.data.vShopProductGuid
            }
            this.nowPrice = (res.data.price).toFixed(2)
            this.chaPrice = (res.data.price - res.data.minPrice).toFixed(2)
            this.kanPrice = (res.data.originalPrice - res.data.price).toFixed(2)
            this.user = {
              img: res.data.headImgUrl,
              text: res.data.content
            }
          } else {
            this.$msgbox('提示', res.message)
          }
          console.log('res砍价详情')
          console.log(res)
        }, err => {
          console.log('err砍价详情')
          console.log(err)
        })
      },
      /* 砍价列表数据请求 */
      userKanList (vGroupProductLogGuid) {
//        let token = this.$getCookie('token')
        api.userKanList({
//          token: token,
          vGroupProductLogGuid: vGroupProductLogGuid
        }).then(res => {
          if (res.code === ERR_OK) {
            let list = res.data.recordList
            this.textList = []
            for (let item of list) {
              this.textList.push(new KanList(item))
            }
            console.log('res砍价列表数据')
            console.log(res)
          } else {
            this.$msgbox('提示', res.message)
          }
        }, err => {
          console.log('err砍价列表数据')
          console.log(err)
          this.$msgbox('提示', err.data.message)
        })
      },
      /* 帮忙砍价数据请求 */
      userKanHelp (vGroupProductLogGuid) {
        this.isActive = false
//        let token = this.$getCookie('token')
        api.userKanHelp({
//          token: token,
          vGroupProductLogGuid: vGroupProductLogGuid
        }).then(res => {
          if (res.code === ERR_OK) {
            this.isKan = true
            this.userKanDetail(vGroupProductLogGuid)
            this.userKanList(vGroupProductLogGuid)
            console.log('帮忙砍价res')
            console.log(res)
          }
//          this.userKanList(vGroupProductLogGuid)
        }, err => {
          /* 表示是砍价已经到低价了 */
          if (err.data.code === 1300) {
            this.isActive = true
            this.isKan = true
            this.$msgbox('提示', err.data.message)
          } else if (err.data.code === 1301) {
            /* 表示该活动已经过期 */
            this.isKan = true
            this.isActive = true
            this.$msgbox('提示', err.data.message)
          } else {
            this.$msgbox('提示', err.data.message)
          }
          console.log('err帮忙砍价')
          console.log(err)
        })
      },
      /* 砍价分享-数据请求 */
      setKanShare (shareFn) {
//        let token = this.$getCookie('token')
        api.userKanShare({
//          token: token,
          vGroupProductLogGuid: this.vGroupProductLogGuid
        }).then(res => {
          console.log('砍价分享res')
          console.log(res)
//          this.signApi()
          if (res.code === 0) {
            shareFn && shareFn(res.data)
          }
        }, err => {
          console.log('砍价分享err')
          console.log(err)
        })
      },
      //      签名
      signApi () {
        let that = this
        let urlRe = encodeURIComponent(window.location.href.split('#')[0])
        api.sign({
          url: urlRe
        }).then(res => {
          console.log('签名砍价分享res2')
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
            that.setKanShare(function (res) {
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
      ShareKantp
    }
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  /*@import "../../../../common/mixin.styl"*/
  .share-kan
    font-size: 0.28rem
    position: absolute
    left: 0
    top: 0
    width: 100%
    min-height: 13.3rem
    z-index: 102
    background: #f4f4f4
  .weui-dialog__hd
    padding: 0em 1.6em 0.1em !important
    color: #333 !important
</style>
