<template>
  <div class="shareTemplate">
    <div class="header-box">
      <div class="share-tab">
        <div :class="[activeClass, {setbox:active == index}]" v-for="(item, index) in list2" @click="selectItem(item, index)">{{item}}</div>
      </div>
    </div>
    <div v-if="bargainList.length > 0">
      <div class="list-box" v-for="(item, index) in bargainList">
        <div class="title-box">
          <span style="color: #f96c9e" v-if="item.vGroupProductLogState == 1">砍价中</span>
          <span v-else>已超时</span>
          <span class="title-start">已砍：￥{{ parseFloat((item.originalPrice - item.price).toFixed(2)) }}元</span>
        </div>
        <div class="group-box">
          <img class="product-img" :src="item.shopProductLogo"/>
          <div class="product-message">
            <h1 class="pro-title">{{ item.vShopProductName }}</h1>
            <div class="group-message">{{ item.shortIntro }}</div>
            <div class="product-price">
              <span class="odd-price">原价：￥{{ item.originalPrice}}元</span>
              <span class="new-price">当前：￥{{ item.price }}元</span>
            </div>
          </div>
        </div>
        <div class="group-footer">
          <span>{{ returnTime(item.createDate) }}</span>
          <!--<span class="sur-time">{{interTime(item.expiredDate)}}</span>-->
          <!--<span class="char-detail" v-if="item.vGroupProductLogState == 2">发起砍价</span>-->
          <span class="char-detail" @click="toDetaile(item.vGroupProductLogGuid)">查看详情</span>
        </div>
      </div>
    </div>
    <div v-else-if="bargainList.length === 0">
      <div class="dataNothing">暂无数据</div>
    </div>
    <div v-if="bargainList.length !== 0">
      <loading :loading="isLoading" :titleNo="titleNo"></loading>
    </div>
  </div>
</template>
<script>
  import api from '../../fetch/api'
  import { getScrollTop, getScrollHeight, getTimer, getNowFormatDate } from '../../util/util'
  import Loading from '../../base/loading/loading'
  const list = () => ['砍价中', '已超时']
  const PAGESIZE = 5

  export default {
    data () {
      return {
        list2: list(),
        active: 0,
        activeClass: 'flex-box',
        bargainList: [],
        indexState: 1,
        pageIdx: 1,
        totalPage: 0, /* 总页数 */
        isLoading: false,
        titleNo: '没有更多的订单~'
      }
    },
    activated () {
      this.indexState = localStorage.indexState
      this.pageIdx = 1 // 初始化页数
      this.bargainList = []
      this.getBargain(this.indexState, 1)
    },
    mounted () {
      document.addEventListener('scroll', () => {
        let clientHeight = window.innerHeight
        if (getScrollTop() + clientHeight === getScrollHeight()) {
          if (this.totalPage >= this.pageIdx) {
            this.pageIdx = this.pageIdx + 1
            let lIndex = localStorage.indexState
            this.getBargain(lIndex, this.pageIdx)
          }
        }
      })
    },
    methods: {
      selectItem (item, index) {
        this.active = index
        if (index === 0) {
          index = index + 1
        } else if (index === 1) {
          index = index + 1
        }
        localStorage.indexState = index
        this.bargainList = []
        this.getBargain(index, 1)
      },
      interTime (expiredDate) {
        let timer = null
        clearInterval(timer)
        timer = setInterval(getTimer(expiredDate), 500)
      },
      getBargain (indexState, pageIdx) {
//        let cToken = this.$getCookie('token')
        api.bargain({
//          token: cToken,
          pageIndex: pageIdx,
          pageSize: PAGESIZE,
          vGroupProductLogState: indexState
        }).then(res => {
          if (res.code === 0) {
            this.totalPage = res.data.totalPage
            if (res.data.rows.length === 0) {
              this.isLoading = false
            } else {
              this.isLoading = true
              let rowsLength = res.data.rows.length
              if (rowsLength < PAGESIZE) {
                this.isLoading = false
              }
              this.bargainList = this.bargainList.concat(res.data.rows)
            }
          }
        }, err => {
          this.$msgbox('提示', err.data.message)
        })
      },
      returnTime (item) {
        let nowTime = getNowFormatDate()
        nowTime = nowTime.replace(new RegExp('-', 'gm'), '/')
        let timeMill = (new Date(nowTime)).getTime()
        item = item.replace(new RegExp('-', 'gm'), '/')
        let millSecond = (new Date(item)).getTime()
        let timeDiffer = timeMill - millSecond
        let days = Math.floor(timeDiffer / (24 * 3600 * 1000))
        let leavs1 = timeDiffer % (24 * 3600 * 1000)    //  计算天数后剩余的毫秒数
        let hour = Math.floor(leavs1 / (3600 * 1000))
        var leaves2 = leavs1 % (3600 * 1000)        //  计算小时数后剩余的毫秒数
        var minute = Math.floor(leaves2 / (60 * 1000))
        if (days === 0) {
          if (hour === 0) {
            if (minute === 0) {
              return '刚刚'
            } else {
              return minute + '分钟前'
            }
          } else {
            return hour + '个小时前'
          }
        } else {
          return days + '天前'
        }
      },
      toDetaile (vGroupProductLogGuid) {
        this.$router.push({path: '/sharekan', query: {vGroupProductLogGuid: vGroupProductLogGuid}})
      }
    },
    components: {
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shareTemplate
    position: absolute
    left: 0
    top: 0
    width: 100%
    min-height: 13.3rem
    z-index:102
    background: #f4f4f4
    .header-box
      width: 100%
      height: 0.78rem
      background: #fff
      padding-top: 0.15rem
      .share-tab
        display: flex
        width: 5.6rem
        height: 0.6rem
        line-height: 0.62rem
        border:1px solid #f96c9e
        margin: auto
        color: #f96c9e
        border-radius: 0.08rem
        font-size: 0.32rem
        .flex-box
          flex: 1
          text-align: center
          &.setbox
             background: #f96c9e
             color: #fff
    .list-box
      display: flex
      flex-direction: column
      background: #fff
      margin-top: 0.15rem
      .title-box
        height: 0.6rem
        line-height: 0.6rem
        padding: 0 0.25rem
        font-size: 0.28rem
        color: #ccc
        border-bottom: 1px solid #e8e8e8
        .title-start
          float: right
          color: #f96c9e
      .group-box
        padding: 0.2rem 0.25rem
        background: #fff
        height: auto
        overflow: hidden
        .product-img
          width: 1.7rem
          height: 1.7rem
          float: left
        .product-message
          width 5.1rem
          float: left
          margin-left: 0.2rem
          .pro-title
            font-size: 0.28rem
            line-height: 0.35rem
            color: #333
            /*height: 0.7rem*/
            -webkit-text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 2
            -webkit-box-orient: vertical
            overflow: hidden
          .group-message
            font-size: 0.24rem
            color: #8e8e8e
            /*height: 0.58rem*/
            line-height: 0.32rem
            margin: 0.1rem 0 0.1rem 0
            -webkit-text-overflow: ellipsis;
            display: -webkit-box
            -webkit-line-clamp: 2
            -webkit-box-orient: vertical
            overflow: hidden
          .product-price
            font-size: 0.4rem
            color: #f96c9e
            height: 0.32rem
            line-height: 0.32rem
            .odd-price
              font-size: 0.24rem
              float: left
              color: #8e8e8e
            .new-price
              font-size: 0.24rem
              float: right
      .group-footer
        height: 1.03rem
        line-height: 1.05rem
        border-top: 1px solid #e8e8e8
        font-size: 0.28rem
        color: #8e8e8e
        padding: 0 0.25rem
        .sur-time
          margin-left: 0.95rem
          color: #8e8e8e
        .char-detail
          display: inline-block
          width: 1.65rem
          height: 0.65rem
          line-height: 0.67rem
          border:1px solid #f96c9e
          border-radius: 0.1rem
          text-align: center
          color: #f96c9e
          float: right
          margin-left: 0.25rem
          margin-top: 0.17rem
    .dataNothing
      font-size: 0.3rem
      color: #333
      text-align: center
      margin-top: 2rem
  .weui-dialog__hd
    padding: 0em 1.6em 0.1em !important
    color: #333 !important
</style>
