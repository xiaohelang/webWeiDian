<template>
  <div class="share-kantp">
    <div class="good-cell" @click="toDetail(cell.vShopProductGuid)">
      <img class="cell-img" :src="cell.img" alt="">
      <div class="cell-right">
        <p class="cell-right-p1">{{cell.title1}}</p>
        <p class="cell-right-p2">{{cell.title2}}</p>
        <div class="cell-price">
          <span style="color: #8e8e8e;">原价: ￥{{cell.oldPrice}}</span>
          <span v-show="showMinPrice" style="color: #f96c9e;">最低: ￥{{cell.lowPrice}}</span>
        </div>
      </div>
    </div>
    <div class="kan-zhu">
      <img class="kan-zhu-logo" :src="user.img" alt="">
      <p class="kan-zhu-p">{{user.text}}</p>
    </div>
    <div class="pai">
      <div class="pai-title">
        <span v-if="showMinPrice" style="height: 0.8rem; line-height: 0.8rem; font-size: 0.32rem; color: #fff;">还差：￥{{chaPrice}}</span>
        <span style="height: 0.8rem; line-height: 0.8rem; font-size: 0.32rem; color: #fff;">已砍：￥{{kanPrice}}</span>
        <img class="title-img" style="left: 0;" src="../../common/image/left-arr.png" alt="">
        <img class="title-img" style="right: 0;" src="../../common/image/right-arr.png" alt="">
      </div>
      <div class="pai-list">
        <div class="cell-title">
          <span>截止时间：{{date}} </span>
          <span>{{time}}</span>
        </div>
        <div class="together-btn" v-show="!isHost&&!isKan" @click="helpKan">帮他砍价</div>
        <ul class="together-ul" v-show="!isHost&&isKan">
          <li class="together-li" style="background: #f96c9e; color: #ffffff;" @click="iWant">我也想要</li>
          <li class="together-li" style="" :class="[bgColor, {overBtb: isActive}]" @click="shareKan">找人砍价</li>
        </ul>
        <ul class="together-ul" v-show="isHost">
          <li class="together-li" style="background: #f96c9e; color: #ffffff;" @click="toBuy">现价￥{{nowPrice}}</li>
          <li class="together-li" style="background: #ffffff; color: #f96c9e;" @click="shareKanHelp">找人砍价</li>
        </ul>
        <p class="sm-btn">
          <span style="text-decoration: underline; " @click="openShow">活动说明</span>
        </p>
        <div class="kan-pan">
          <div class="kan-pan-text">砍价榜</div>
        </div>
        <ul class="pai-ul">
          <li class="pai-li" v-for="item in textList">
            <div class="pai-li-left">
              <img style="width: 0.48rem; height: 0.48rem; margin-right: 0.17rem; border-radius: 50%;" :src="item.headImgUrl">
              <span style="font-size: 0.24rem; line-height: 0.48rem; color: #8e8e8e;">{{item.message}}</span>
            </div>
            <div class="pai-li-right">已砍：￥{{item.deductPrice}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="showMode" v-show="isShow" @click="closeShow">
      <div class="showMore">
        <span class="closeBtn" @click="closeShow">X</span>
        <h4 class="showMoreH4">砍价说明</h4>
        <p class="showMoreP1">最低价成交</p>
        <p class="showMoreP2">如商品原价100元，商户设定最低成交价为50元。这时，你可以分享此商品信息给好友，邀请他们帮你进行砍价。越多好友帮忙，价钱越低。在截止时间前如砍价至商户设定的最低成交价（此示例为50元）则，按照最低成交价结算。
        </p>
        <p class="showMoreP1" style="margin-top: 0.2rem;">实时金额成交</p>
        <p class="showMoreP2">如商品原价100元，商户设定最低成交价为50元。这时，你可以分享此商品信息给好友，邀请他们帮你进行砍价。越多好友帮忙，价钱越低。当时间截止后未砍价至最低成交价，则按照砍价后的实时金额进行结算。
        </p>
      </div>
    </div>
    <div class="setShare" @click="setShare" v-if="isShowShare&&isWeixin" >
      <img src="../../common/image/setShare.png" style="width: 7.5rem; height: 7.65rem; position: absolute; left: 0; top: -0.5rem;" alt="">
    </div>
  </div>
</template>

<script>
  import * as util from '../../util/util'

  export default {
    props: {
      date: {
        type: String
      },
      time: {
        type: String
      },
      cell: {
        type: Object,
        default: () => {
          return {
            img: '',
            title1: '',
            title2: '',
            oldPrice: 0,
            lowPrice: 0,
            vShopProductGuid: ''
          }
        }
      },
      isActive: {
        type: Boolean,
        default: false
      },
      showMinPrice: {
        type: Boolean,
        default: true
      },
      nowPrice: {
        type: Number,
        default: 0
      },
      chaPrice: {
        type: Number,
        default: 0
      },
      kanPrice: {
        type: Number,
        default: 0
      },
      user: {
        type: Object,
        default: () => {
          return {
            img: '',
            text: '我想用最低价购买，兄弟姐妹们出力帮忙砍价喔！'
          }
        }
      },
      textList: {
        type: Array,
        default: () => {
          return [
            {
              headImgUrl: '',
              message: '',
              deductPrice: 0
            }
          ]
        }
      },
      isKan: {
        type: Boolean,
        default: false
      },
      isHost: {
        type: Boolean
      },
      isShow: {
        type: Boolean,
        default: false
      },
      isShowShare: {
        type: Boolean,
        default: false
      },
      isWeixin: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        bgColor: 'bg-color'
      }
    },
    mounted () {
      util.setTitle('分享砍价')
    },
    methods: {
      /* 关闭蒙层 */
      closeShow () {
        this.$emit('closeShow')
      },
      /* 打开蒙层 */
      openShow () {
        this.$emit('openShow')
      },
      /* 关闭分享砍价蒙版 */
      setShare () {
        this.$emit('setShare')
      },
      /* 帮忙砍价 */
      helpKan () {
        this.$emit('helpKan')
      },
      /* 我也想要 */
      iWant () {
        this.$emit('iWant')
      },
      /* 找人砍价 */
      shareKan () {
        this.$emit('shareKan')
      },
      /* 砍主自己帮忙分享砍价 */
      shareKanHelp (vShopProductGuid) {
        console.log('砍价模板')
        this.$emit('shareKanHelp', vShopProductGuid)
      },
      /* 去购买 */
      toBuy () {
        this.$emit('toBuy')
      },
      /* 回到详情页 */
      toDetail (vShopProductGuid) {
        this.$emit('toDetail', vShopProductGuid)
      }
    }
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  /*@import "../../../../common/mixin.styl"*/
  .share-kantp
    font-size: 0.28rem
    position: absolute
    left: 0
    top: 0
    width: 100%
    z-index: 102
    background: #f4f4f4
    .good-cell
      width: 100%
      height: 2.04rem
      background: #ffffff
      padding: 0.18rem 0.24rem
      box-sizing: border-box
      flex-direction: row
      display: flex
      .cell-img
        height: 1.68rem
        width: 1.68rem
      .cell-right
        padding-left: 0.2rem
        box-sizing: border-box
        flex: 1
        .cell-right-p1
          -webkit-text-overflow: ellipsis
          display: -webkit-box
          -webkit-line-clamp: 2
          -webkit-box-orient: vertical
          line-height: 0.32rem
          overflow: hidden
          font-size: 0.28rem
          color: #333333
        .cell-right-p2
          -webkit-text-overflow: ellipsis
          display: -webkit-box
          -webkit-line-clamp: 2
          line-height: 0.3rem
          -webkit-box-orient: vertical
          overflow: hidden
          margin-top: 0.13rem
          font-size: 0.24rem
          color: #8e8e8e
        .cell-price
          flex-direction: row
          justify-content: space-between
          margin-top: 0.1rem
          font-size: 0.24rem
          display: flex
    .kan-zhu
      width: 100%
      background: #fdfdfd
      height: 0.98rem
      margin-top: 0.12rem
      flex-direction: row
      display: flex
      box-sizing: border-box
      padding: 0.13rem 0.3rem 0.13rem 0.43rem
      .kan-zhu-logo
        width: 0.72rem
        height: 0.72rem
        border-radius: 50%
      .kan-zhu-p
        line-height: 0.72rem
        color: #f96c9e
        margin-left: 0.2rem
        font-size: 0.24rem
    .pai
      width: 100%
      margin-top: 0.14rem
      .pai-title
        position: relative
        width: 7.2rem
        height: 0.8rem
        margin: auto
        display: flex
        justify-content: space-around
        border-top-left-radius: 0.1rem
        border-top-right-radius: 0.1rem
        background: #f96c9e
        .title-img
          position: absolute
          bottom: -0.2rem
          width: 0.2rem
          height: 0.2rem

      .together-btn
        width: 5.8rem
        height: 0.72rem
        background: #f96c9e
        line-height: 0.74rem
        text-align: center
        color: #fff
        font-size: 0.32rem
        margin: auto
        border-radius: 0.72rem
      .together-ul
        display: flex
        flex-direction: row
        justify-content: space-between
        width: 5.8rem
        height: 0.72rem
        margin: auto
        .together-li
          width: 2.68rem
          height: 0.72rem
          line-height: 0.74rem
          border-radius: 0.72rem
          border: 1px solid #f96c9e
          font-size: 0.32rem
          text-align: center
          &.bg-color
            background: #ffffff
            color: #f96c9e
          &.overBtb
            background: #ccc
            color: #8e8e8e
            border: 1px solid #ccc
            pointer-events: none
      .sm-btn
        text-align: center
        color: #f96c9e
        font-size: 0.24rem
        margin-top: 0.54rem
      .kan-pan
        width: 100%
        border-bottom: 1px solid #e8e8e8
        position: relative
        margin-top: 0.48rem
        margin-bottom: 0.2rem
        .kan-pan-text
          position: absolute
          margin: auto
          color: #333
          left: 0
          top: 0
          bottom: 0
          right: 0
          width: 1.5rem
          text-align: center
          font-size: 0.28rem
          background: #fff
          height: 0.5rem
          line-height: 0.5rem
      .pai-list
        margin: auto
        background: #ffffff
        width: 6.8rem
        .cell-title
          width: 100%
          padding: 0.2rem 0.5rem
          box-sizing: border-box
          line-height: 0.6rem
          color: #8e8e8e
          display: flex
          background: #fdfdfd
          flex-direction: row
          justify-content: space-between
        .pai-ul
          width: 100%
          padding: 0.3rem 0.5rem
          box-sizing: border-box
          .pai-li
            display: flex
            flex-direction: row
            justify-content: space-between
            margin-bottom: 0.28rem
            .pai-li-left
              display: flex
            .pai-li-right
              color: #f96c9e
              font-size: 0.24rem
              line-height: 0.48rem
    .showMode
      position: fixed
      z-index: 103
      background: rgba(0, 0, 0, 0.3)
      overflow: hidden
      top: 0
      left: 0
      bottom: 0
      right: 0
      .showMore
        position: fixed
        background: #fff
        width: 80%
        z-index: 110
        top: 50%
        left: 50%
        -webkit-transform: translate(-50%,-50%)
        transform: translate(-50%,-50%)
        text-align: center
        border-radius: 5px
        padding-bottom: 0.3rem
        .closeBtn
          position: absolute
          right: -0.25rem
          top: -0.25rem
          background: #ccc
          display: inline-block
          width: 0.5rem
          height: 0.5rem
          line-height: 0.5rem
          color: #333
          border-radius: 50%
          border: 1px solid #fff
        .showMoreH4
          color: #333
          line-height: 0.8rem
          height: 0.8rem
          border-bottom: 1px solid #f4f4f4
        .showMoreP1
          text-align: left
          margin-left: 0.1rem
          font-size: 0.24rem
          margin-top: 0.1rem
          border-left: 5px solid blue
          line-height: 0.4rem
          padding-left: 0.1rem
          color: #333333
        .showMoreP2
          text-align: left
          margin-left: 0.3rem
          padding-right: 0.15rem
          font-size: 0.2rem
          line-height: 0.5rem
          color: #333333
        .showMoreH5
          border-top: 1px solid #f4f4f4
          color: #333
          line-height: 0.6rem
          height: 0.6rem
    .setShare
      position: fixed
      z-index: 102
      background: rgba(0, 0, 0, 0.6)
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
