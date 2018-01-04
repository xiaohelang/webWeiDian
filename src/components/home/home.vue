<template>
  <div class="home" id="mescroll">
    <!--<slider :pages="pages" :sliderinit="sliderinit"></slider>-->
    <ul class="list" ref="home">
      <p v-show="!(list.length)" style="text-align: center; font-size: 0.4rem; width: 100%; margin-top: 0.5rem; color: #333;">暂无商品</p>
      <li ref="Li" @touchstart="touchStart(index)" @touchend="touchEnd(index)" @mouseover="touchStart(index)" @mouseout="touchEnd(index)" v-show="list.length" class="list-li" v-for="(item, index) in list" :class="indexFn(index)" @click.stop="toDetail(item)" :key="index">
        <img class="li-img" v-lazy='item.shopProductLogo' alt="">
        <div :class="selectIcon(item.vGroupProductType)" alt=""></div>
        <span class="li-title">{{item.vShopProductName}}</span>
        <span class="li-price"><em>￥</em>{{item.price}}<em>元</em></span>
      </li>
    </ul>
    <loading :loading="loading"></loading>
  </div>
</template>
<style>

</style>
<script>
  import slider from 'vue-concise-slider'
  import api from '../../fetch/api'
  import {mapMutations} from 'vuex'
  import wx from 'weixin-js-sdk'
  import { ERR_OK } from '../../common/js/config'
  import Loading from '../../base/loading/loading'
  import { getScrollTop, getClientHeight, getScrollHeight } from '../../util/util'

  const PAGESIZE = 10

  export default {
    data () {
      return {
        //  图片列表[arr]
        pages: [
          {
            title: 'sider1',
            style: {
              background: 'url(http://www.lgstatic.com/thumbnail_600x360/i/image/M00/31/11/CgqKkVdJE9mAPnBbAAFiY-fByjE117.png)'
            }
          },
          {
            title: 'sider2',
            style: {
              background: 'url(http://www.hishop.com.cn/uploads/150914/21678-150914112244436.jpg)'
            }
          },
          {
            title: 'slide3',
            style: {
              background: 'url(http://www.hishop.com.cn/uploads/150914/21678-150914112244436.jpg)'
            }
          }
        ],
        sliderinit: {
          currentPage: 0, //  当前页码
          thresholdDistance: 100, //  滑动判定距离
          thresholdTime: 100,  //  滑动判定时间
          autoplay: 3000,  //  自动滚动[ms]
          loop: true,  //  循环滚动
          direction: 'horizontal',  //  方向设置，垂直滚动
          infinite: 1,  // 无限滚动前后遍历数
          slidesToScroll: 1 // 每次滑动项数
        },
        list: [],
        titleText: '',
        options: {},
        config: {},
        pageIdx: 1,
        loading: false,
        timer: null,
        pullup: true,
        listenScroll: true,
        vShopGuid: '04CBCB60-D34A-49D6-8F69-9964D0034614'
//        vShopGuid: 'EFC717FD-88ED-4E95-8706-41BDF35141AD'
//        vShopGuid: 'FE1DD6E1-F344-49CE-9EA5-23A698793159'
//          04CBCB60-D34A-49D6-8F69-9964D0034614
      }
    },
    created () {
      //  签名
//      this.hhh()
//      this.signApi()
//      this.getShopPage(1)
    },
    activated () {
      window.scrollTo(0, 0)
      this.titleText = localStorage.titleText
      this.setTitle(this.titleText)
      this.hhh()
      this.signApi()
//      this.getShopPage(1)
      console.log('从详情返回的')
      console.log(this.$route.query.vShopGuid)
      document.addEventListener('scroll', () => {
        if (getScrollTop() + getClientHeight() === getScrollHeight()) {
          this.pageIdx = this.pageIdx + 1
          this.getShopPage(this.pageIdx)
        }
      })
    },
//    mounted () {
//      this.hhh()
//      this.signApi()
//      console.log('从详情返回的')
//      console.log(this.$route.query.vShopGuid)
//      document.addEventListener('scroll', () => {
//        if (getScrollTop() + getClientHeight() === getScrollHeight()) {
//          this.pageIdx = this.pageIdx + 1
//          this.getShopPage(this.pageIdx)
//        }
//      })
//    },
    methods: {
      touchStart (index) {
        this.$refs.Li[index].style.opacity = '0.8'
        console.log('touchStart')
        console.log(this.$refs.Li[index])
      },
      touchEnd (index) {
//        this.$refs.Li.style.opacity = '1'
        this.$refs.Li[index].style.opacity = '1'
        console.log('touchEnd')
      },
      getShopPage (pageIdx) {
        console.log('getShopPage')
//        pageIdx = window.parseInt(pageIdx)
        this.loading = true
        api.shopPage({
          vShopGuid: this.vShopGuid,
          pageIndex: pageIdx,
          pageSize: PAGESIZE
        }).then(res => {
          if (res.code === ERR_OK) {
//            this.list = res.data.rows
            if (res.data.rows.length === 0) {
              this.loading = false
              return
            } else {
              let rowLength = res.data.rows.length
              if (rowLength < PAGESIZE) {
                this.loading = false
              }
              this.list = this.list.concat(res.data.rows)
            }
          } else {
            this.$msgbox('列表异常', res.message)
          }
        }, err => {
          console.log('获取首页列表错误')
          console.log(err)
          this.$msgbox('列表异常', err.data.message)
        })
      },
      hhh () {
        let url = window.location.href
        this.list = []
        let path = url.split('?')[1]
        if (path === undefined) {
          this.getShopPage(1)
          return
        }
        let str2 = url.split('?')[1].split('=')[1]
        if (this.$route.query.vShopGuid === undefined) {
          this.vShopGuid = str2.split('#')[0]
          this.getShopPage(1)
        } else {
          this.vShopGuid = this.$route.query.vShopGuid
//          this.setvShopGuid(this.vShopGuid)
//          http://vshop.wxsapp.com/index.html?vShopProductGuid=B8F8F94B-DEA4-473A-AF96-74C9D3FEEDAD#/home?vShopGuid=3C81FC9F-533B-43BF-ABCC-1A01E94CEAF0
//            http://vshop-t.wxsapp.com/index.html?vShopGuid=EFC717FD-88ED-4E95-8706-41BDF35141AD
//          let urlStr = 'http://vshop-t.wxsapp.com/index.html?vShopGuid=' + this.vShopGuid
          let origin = window.location.origin
          let pathname = window.location.pathname
          let urlStr = origin + pathname + '?vShopGuid=' + this.vShopGuid
          window.location.assign(urlStr)
          this.setvShopGuid2(this.vShopGuid)
          this.getShopPage(1)
        }
//        this.getShopPage(1)
      },
      indexFn (index) {
        if (index % 2 === 0) {
          return 'mR'
        } else {
          return 'mR2'
        }
      },
      /* 签名 */
      signApi () {
        let urlRe = encodeURIComponent(window.location.href.split('#')[0])
        let that = this
        api.sign({
          url: urlRe
        }).then(res => {
          console.log('签名res-home')
          console.log(res)
          if (res.code === ERR_OK) {
            that.config = res.data
          }
          wx.config({
            debug: false,
            appId: that.config.appId,                // 必填，公众号的唯一标识
            timestamp: that.config.timestamp,        // 必填，生成签名的时间戳
            nonceStr: that.config.nonceStr,          // 必填，生成签名的随机串
            signature: that.config.signature,        // 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
          wx.ready(function () {
//            that.getShopPage()
            that.setShareShop(function (res) {
              that.options = res
              let option = {
                title: that.options.shareTitle,
                desc: that.options.shareContent,
                link: that.options.shareUrl,
                imgUrl: that.options.shareLogo,
                success: function () {
                },
                cancel: function () {
                }
              }
              wx.onMenuShareTimeline(option)
              wx.onMenuShareAppMessage(option)
              wx.error(function (res) {
                console.log('真正分享失败')
                console.log(res)
              })
            })
          })
        }, err => {
          console.log('签名err')
          console.log(err)
        })
      },
      /* 分享店铺 */
      setShareShop (optionFn) {
        api.shareShop({
          vShopGuid: this.vShopGuid
        }).then(res => {
          console.log('分享成功')
          console.log(res)
          if (res.code === ERR_OK) {
            optionFn && optionFn(res.data)
          }
        }, err => {
          console.log('分享错误')
          console.log(err)
        })
      },
      /* 拼团 砍价图标 */
      selectIcon (vGroupProductType) {
        if (vGroupProductType === 0) {
          return ''
        } else if (vGroupProductType === 1) {
          return 'li-icon1'
        } else if (vGroupProductType === 2) {
          return 'li-icon2'
        }
      },
      toDetail (item) {
        document.cookie = `vShopProductGuid=${item.vShopProductGuid}`
        this.setvShopProductGuid(item.vShopProductGuid)
        this.setvGroupProductType(item.vGroupProductType)
        this.$router.push({path: '/gooddetail', query: {productId: item.vShopProductGuid}})
      },
      ...mapMutations({
        setvShopGuid2: 'SET_VSHOPGUID2',
        setvShopProductGuid: 'SET_VSHOPPRODUCTGUID',
        setvGroupProductType: 'SET_VGROUNPPRODUCTTYPE'
      })
    },
/*    computed: {
      ...mapGetters([
        'vShopGuid'
      ])
    },  */
    components: {
      slider,
      Loading
    },
    watch: {
      vShopGuid2 (newVal) {
        this.vShopGuid = newVal
        this.getHeader()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .home
    @media screen and (max-width:750px) {
      .slider-container {
        height: 2rem;
        margin: 0.12rem auto;
        width: 100%;
      }
    }
    .slider-pagination-bullets {
      bottom: 0.1rem;
      left: 0;
      width: 100%;
    }
    height: 100%
    margin-bottom: 1.2rem
    .list
      display: flex
      flex-wrap: wrap
      .list-li
        position: relative
        width: 3.68rem
        height: 4.96rem
        background: #fff
        margin-top: 0.15rem
        .li-img
          width: 3.68rem
          height: 3.68rem
        .li-icon1
          width: 0.48rem
          height: 0.56rem
          position: absolute
          background: url('../../common/image/tuan.png')
          background-size: 0.48rem 0.56rem
          left: 0
          top: 0
        .li-icon2
          width: 0.48rem
          height: 0.56rem
          position: absolute
          background: url('../../common/image/kan.png')
          background-size: 0.48rem 0.56rem
          left: 0
          top: 0
        .li-title
          display: block
          /*line-height: 0.32rem*/
          font-size: 0.25rem
          color:#333333
          /*height: 0.62rem*/
          text-overflow: ellipsis
          white-space: nowrap
          overflow: hidden
          padding: 0.12rem 0 0.13rem 0.17rem
        .li-price
          display: block
          line-height: 0.32rem
          font-size: 0.34rem
          padding-left: 0.21rem
          margin-top: 0.10rem
          color: #f96c9e
          & em
            font-size: 0.18rem
            font-style: normal
      .mR
        margin-right: 0.14rem
      .mR2
        margin-right: 0
  .weui-dialog__hd
    padding: 0em 1.6em 0.1em !important
    color: #333 !important

</style>
