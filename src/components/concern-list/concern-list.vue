<template>
  <div class="concernTemplate">
    <div v-if="listData.length > 0">
      <div class="follow-box" v-for="(item, index) in listData" >
        <div class="box-left" @click="toHome(item.vShopGuid)">
          <img class="follow-header" :src="item.shopLogo"/>
          <div class="follow-wrap">
            <h1 class="wrap-name">{{ item.vShopName }}</h1>
            <span class="wrap-authen">官方认证</span>
          </div>
        </div>
        <img class="wrap-icon" @click="cancelBtn(item.vShopGuid)" src="../../common/image/concer-icon.png" alt=""/>
      </div>
    </div>
    <div class="noData-wrap" v-else>暂时没有关注店铺</div>
    <div v-if="listData.length !== 0">
      <loading :loading="isLoading" :titleNo="titleNo"></loading>
    </div>
  </div>
</template>

<script>
  import api from '../../fetch/api'
  import Loading from '../../base/loading/loading'
  import { getScrollTop, getScrollHeight } from '../../util/util'
  const PAGESIZE = 10

  export default {
    data () {
      return {
        listData: [],
        isLoading: false,
        titleNo: '没有更多店铺~'
      }
    },
    activated () {
      this.listData = []
      this.concernList()
    },
    mounted () {
      document.addEventListener('scroll', () => {
        let clientHeight = window.innerHeight
        if (getScrollTop() + clientHeight === getScrollHeight()) {
          this.pageIdx = this.pageIdx + 1
          let lIndex = localStorage.stateIndex
          this.order(lIndex, this.pageIdx)
        }
      })
    },
    methods: {
      concernList () {
//        let cToken = this.$getCookie('token')
        api.concernList({
//          token: cToken
        }).then(res => {
          if (res.code === 0) {
            if (res.data.rows.length === 0) {
              this.isLoading = false
            } else {
              this.isLoading = true
              let rowsLength = res.data.rows.length
              if (rowsLength < PAGESIZE) {
                this.isLoading = false
              }
              this.listData = this.listData.concat(res.data.rows)
//              this.listData = this.listData.concat(res.data.rows)
            }
          }
        }, err => {
          this.$msgbox('提示', err.data.message)
        })
      },
      // 取消关注
      cancelBtn (vShopGuid) {
        let _this = this
        this.$confirm('提示', '是否取消关注本店？', function () {
          _this.cancelConten(vShopGuid)
        })
      },
      cancelConten (vShopGuid) {
        let _this = this
//        let cToken = this.$getCookie('token')
        api.follwCancel({
//          token: cToken,
          vShopGuid: vShopGuid
        }).then(res => {
          this.$msgbox('提示', '取消成功', function () {
            _this.listData = []
            _this.concernList()
          })
          console.log(res)
        }, err => {
          this.$msgbox('提示', err.data.message)
        })
      },
      // 回到首页
      toHome (vShopGuid) {
        this.$router.push({path: '/home', query: {vShopGuid: vShopGuid}})
      }
    },
    components: {
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .concernTemplate
    position: absolute
    left: 0
    top: 0
    width: 100%
    min-height: 13.3rem
    z-index:102
    background: #f4f4f4
    .follow-box
      height: auto
      overflow: hidden
      background: #ffffff
      padding: 0.25rem 0.36rem 0.25rem 0.25rem
      border-bottom: 1px solid #e8e8e8
      position: relative
      .box-left
        width: 85%
        height: auto
        overflow: hidden
      .follow-header
        width: 1rem
        height: 1rem
        float: left
      .follow-wrap
        display: flex
        flex-direction: column
        float: left
        margin-left: 0.2rem
        .wrap-name
          font-size: 0.3rem
          color: #333333
          margin: 0.21rem 0 0.12rem 0
        .wrap-authen
          width: 1.1rem
          height: 0.28rem
          text-align: center
          line-height: 0.3rem
          font-size: 0.2rem
          background: #f96c9e
          border-radius: 0.05rem
      .wrap-icon
        position: absolute
        right: 0.36rem
        width: 0.38rem
        height: 0.38rem
        top: 0.58rem
    .noData-wrap
      font-size: 0.3rem
      color: #333
      text-align: center
      margin-top: 2rem
  .weui-dialog__hd
    padding: 0em 1.6em 0.1em !important
    color: #333 !important
</style>
