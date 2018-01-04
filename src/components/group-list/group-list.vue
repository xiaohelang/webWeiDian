<template>
  <div class="listTemplate">
    <div class="list-box" v-for="(item, index) in listDate" v-if="listDate.length > 0">
      <div class="title-box border-1px">
        <span>{{ returnTime(item.createDate) }}</span>
        <span class="title-start" v-if="item.vGroupOrderState == 1">拼单中</span>
        <span class="title-start" v-else-if="item.vGroupOrderState == 2">拼单成功</span>
        <span class="title-start" v-else>已过期</span>
      </div>
      <v-groupTemple :item='item' :class="classTemple"></v-groupTemple>
      <div class="group-footer">
        <img v-if="item.headImgUrl != undefined" class="char-avt" :src="item.headImgUrl"/>
        <span class="char-quest" v-else>?</span>
        <span>{{ item.message }}</span>
        <span class="char-detail" v-if="item.vGroupOrderState != 2" @click="getDetail(item.vGroupOrderGuid)">查看详情</span>
        <span class="char-detail" v-else @click="getDetailSuccess(item.vGroupOrderGuid, item.vOrderGuid)">查看详情</span>
      </div>
    </div>
    <div v-else-if="listDate.length === 0"></div>
    <div v-if="listDate.length !== 0">
      <loading :loading="isLoading" :titleNo="titleNo"></loading>
    </div>
  </div>
</template>
<script>
  import api from '../../fetch/api'
  import { getScrollTop, getScrollHeight, getNowFormatDate } from '../../util/util'
  import Loading from '../../base/loading/loading'
  import groupTemple from '../group-template/group-template'
  const PAGESIZE = 10

  export default {
    data () {
      return {
        listDate: [],
        pageIdx: 1,
        isLoading: false,
        totalPage: 0, /* 总页数 */
        titleNo: '没有更多的订单~',
        classTemple: 'class-temple'
      }
    },
    activated () {
      window.scrollTo(0, 0)
      this.listDate = []
      // 初始化页数
      this.pageIdx = 1
      this.getList(1)
      window.scrollTo(0, 0)
    },
    methods: {
      getList (pageIdx) {
//        let cToken = this.$getCookie('token')
        api.groupList({
//          token: cToken,
          pageIndex: pageIdx,
          pageSize: PAGESIZE
        }).then(res => {
          console.log(res)
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
              this.listDate = this.listDate.concat(res.data.rows)
            }
          }
        }, err => {
          this.$msgbox('提示', err.data.message)
        })
      },
      /*
       * @getDetail() => 进入详情
       */
      getDetail (vGroupOrderGuid) {
//        document.cookie = `vShopProductGuid=${vShopProductGuid}`
        this.$router.push({path: '/groupdetail', query: {vGroupOrderGuid: vGroupOrderGuid}})
      },
      /*
       * @getDetailSuccess() => 进入成功详情
       */
      getDetailSuccess (vGroupOrderGuid, vOrderGuid) {
        this.$router.push({path: '/groupSuccess', query: {vGroupOrderGuid: vGroupOrderGuid, vOrderGuid: vOrderGuid}})
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
      }
    },
    mounted () {
      /*
      * 滚动分页
      */
      document.addEventListener('scroll', () => {
        let clientHeight = window.innerHeight
        if (getScrollTop() + clientHeight === getScrollHeight()) {
          if (this.totalPage > this.pageIdx) {
            this.pageIdx = this.pageIdx + 1
            this.getList(this.pageIdx)
          }
        }
      })
    },
    components: {
      Loading,
      'v-groupTemple': groupTemple
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  @import "../../common/stylus/base"
  .listTemplate
    position: absolute
    left: 0
    top: 0
    width: 100%
    min-height: 13.3rem
    z-index:102
    background: #f4f4f4
    .list-box
      display: flex
      flex-direction: column
      background: #fff
      margin-bottom: 0.15rem
      .title-box
        height: 0.6rem
        line-height: 0.6rem
        padding: 0 0.25rem
        font-size: 0.28rem
        color: #ccc
        border-1px:(#e8e8e8)
        /*border-bottom: 1px solid #e8e8e8*/
        .title-start
          float: right
          color: #f96c9e
      .class-temple
        padding: 0.2rem 0.25rem
      .group-footer
        display: flex
        flex-direction: row
        height: 1.03rem
        line-height: 1.05rem
        border-top: 1px solid #e8e8e8
        font-size: 0.28rem
        color: #8e8e8e
        padding: 0 0.25rem
        .char-quest
          width: 0.63rem
          height: 0.63rem
          line-height: 0.65rem
          text-align: center
          font-size: 0.40rem
          display: block
          border:1px dashed #8e8e8e
          border-radius: 50%
          margin: 0.19rem 0.17rem 0 0
        .char-avt
          width: 0.64rem
          height: 0.64rem
          border-radius: 50%
          vertical-align: middle
          margin: 0.19rem 0.17rem 0 0
        .char-detail
          display: inline-block
          width: 1.65rem
          height: 0.65rem
          line-height: 0.67rem
          border:1px solid #f96c9e
          border-radius: 0.1rem
          text-align: center
          color: #f96c9e
          position: absolute
          right: 0.25rem
          margin-top: 0.17rem
  .weui-dialog__hd
    padding: 0em 1.6em 0.1em !important
    color: #333 !important
</style>
