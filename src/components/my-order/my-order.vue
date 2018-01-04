<template>
  <div class="my-order" id="myOrder">
    <!--<x-header :left-options="{backText: ''}">我的订单</x-header>-->
    <div>
      <tab :line-width=2 active-color='#fc378c' v-model="index" v-if="groupStyle !=2">
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2"
                  @click="demo2 = item" :key="index" @on-item-click="selectItem(item,index)">{{item}}
        </tab-item>
      </tab>
      <order-list :itemList="itemList" :isLoading="isLoading" @cancelOrder="cancelOrder" id="contantHtml"></order-list>
    </div>
  </div>
</template>

<script>
  import { XHeader, Tab, TabItem, SwiperItem, Swiper } from 'vux'
  import api from '../../fetch/api'
  import Loading from '../../base/loading/loading'
  import { getScrollTop, getScrollHeight } from '../../util/util'
  import OrderList from '../../components/order-list/order-list'
  const list = () => ['全部', '待付款', '待发货', '待收货']
  const PAGESIZE = 10

  export default {
    data () {
      return {
        list2: list(),
        demo2: '全部',
        index: 0,
        itemList: [],
        totalPage: 0, /* 总页数 */
        pageIdx: 1,
        isLoading: false,
        groupStyle: 0 // 判断拼图状态
      }
    },
    activated () {
      this.demo2 = localStorage.stateTitel
      let stateIn = localStorage.stateIndex
      this.groupStyle = stateIn
      this.itemList = []
      this.pageIdx = 1 // 初始化页数
      this.order(stateIn, 1)
      window.scrollTo(0, 0)
    },
    mounted () {
      document.addEventListener('scroll', () => {
        let clientHeight = window.innerHeight
        if (getScrollTop() + clientHeight === getScrollHeight()) {
          if (this.totalPage >= this.pageIdx) {
            this.pageIdx = this.pageIdx + 1
            let lIndex = localStorage.stateIndex
            this.order(lIndex, this.pageIdx)
          }
        }
      })
    },
    methods: {
      selectItem (item, index) {
        localStorage.stateTitel = item
        if (index === 2) {
          index = index + 1
        } else if (index === 3) {
          index = index + 1
        }
        localStorage.stateIndex = index
        this.itemList = []
        this.pageIdx = 1
        this.order(index, this.pageIdx)
      },
      order (index, pageIdx) {
        let cToken = this.$getCookie('token')
        api.myOrder({
          token: cToken,
          pageIndex: pageIdx,
          pageSize: PAGESIZE,
          state: index
        }).then(res => {
          if (res.code === 0) {
//            this.itemList = res.data.rows
            this.totalPage = res.data.totalPage
            if (res.data.rows.length === 0) {
              this.isLoading = false
            } else {
              this.isLoading = true
              let rowsLength = res.data.rows.length
              if (rowsLength < PAGESIZE) {
                this.isLoading = false
              }
              this.itemList = this.itemList.concat(res.data.rows)
            }
          }
          console.log('-----myOrder-----')
          console.log(res.data)
        }, err => {
          this.$msgbox('提示', err.data.message)
        })
      },
      cancelOrder () {
        console.log('cancelOrder')
        let lIndex = localStorage.stateIndex
        this.itemList = []
        this.order(lIndex, 1)
      }
    },
    components: {
      XHeader,
      Tab,
      TabItem,
      SwiperItem,
      Swiper,
      OrderList,
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .my-order
    font-size: 0.28rem
    position: absolute
    left: 0
    top: 0
    width: 7.5rem
    min-height: 13.3rem
    z-index: 101
    background: #f4f4f4
    .weui-cell__ft
      color: #f96c9e
    .vux-header
      background: #ffffff
      border-bottom: 0.03rem solid #f4f4f4
      .vux-header-title
        color: #333
    .vux-center
      background: #ffffff
      height: 10rem
  .weui-dialog__hd
    padding: 0em 1.6em 0.1em !important
    color: #333 !important
</style>
