<template>
  <div class="address-list">
    <x-header :left-options="{backText: ''}">收货地址<a slot="right" @click="toAddaddress" style="color: #fff; width: 1rem; text-align: center; display: block;">添加</a></x-header>
    <div v-for="item in pRecordList" class="list-item">
      <group>
        <div @click="backPdetail(item)">
          <cell :title="title2(item.consignee)" :value="item.phone"></cell>
          <cell-box>
            收货地址：{{getAddress(item)}}
          </cell-box>
        </div>
        <div class="add-check">
          <check-icon v-model="item.isDefault">
            <span :class="getSpnClor" v-if="item.isDefault" style="color: #f96c9e">默认地址</span>
            <span :class="getSpnClor" v-else>默认地址</span>
          </check-icon>
          <ul class="check-box">
            <li class="check-boxLi" @click.stop="editAddress(item.vReceiverGuid)"><img style="width: 0.33rem;height: 0.33rem; margin-right: 5px;margin-top: 0.30rem" src="../../common/image/edit.png" alt="">编辑</li>
            <li class="check-boxLi" @click.stop="delectAddress(item.vReceiverGuid)"><img style="width: 0.33rem;height: 0.33rem; margin-right: 5px;margin-top: 0.30rem" src="../../common/image/delext.png" alt="">删除</li>
          </ul>
        </div>
      </group>
    </div>
    <div class="noAddress" v-show="pRecordList.length === 0? true : false">
      还没有地址，请添加地址
    </div>

  </div>
</template>

<script>
  import { XInput, Group, XAddress, ChinaAddressV3Data, XTextarea, XHeader, Cell, CellBox, CheckIcon } from 'vux'
  import api from '../../fetch/api'
  import { mapMutations } from 'vuex'

  export default {
    data () {
      return {
        vSPGuid: '',
        pRecordList: [],
        iconDefault: false,
        title: '大树',
        phone: 13318704492,
        value3: ['广东省', '中山市', '--'],
        addressData: ChinaAddressV3Data
      }
    },
    computed: {
    },
    created () {
//      this.vSPGuid = this.$route.query.productId
      this.getAllAddressList()
    },
    beforeRouteEnter (to, from, next) {
      if (to.path === '/addresslist') {
        next(vm => {
//          vm.vSPGuid = this.$route.query.productId
          vm.getAllAddressList()
        })
      }
      if (from.path === '/me') {
        localStorage.isMe = true
      } else {
        localStorage.isMe = false
      }
    },
    methods: {
      getAddress (item) {
        return (item.province + item.city + item.area + item.detailAddress)
      },
      getIconDefault (item) {
        this.iconDefault = item.isDefault
      },
      title2 (title) {
        return '收货人：' + title
      },
      toAddaddress () {
        localStorage.isEdit = false
        this.$router.push('/addaddress')
//        this.$router.push({path: '/addaddress', query: {productId: this.vSPGuid}})
      },
      getSpnClor () {
        if (this.demo1 === true) {
          return 'spn-color'
        }
        return ''
      },
      /* 返回下单详情 */
      backPdetail (item) {
        if (localStorage.isMe === 'true') {
          return
        } else {
          window.localStorage.isFrom = 'lists'
          this.setvItemAddress(item)
//          this.$router.push({path: '/porderdetail', query: {productId: this.vSPGuid}})
          this.$router.push('/porderdetail')
        }
      },
      editAddress (vReceiverGuid) {
        localStorage.isEdit = true
        localStorage.vReceiverGuid = vReceiverGuid
        this.$router.push('/addaddress')
//        this.$router.push({path: '/addaddress', query: {productId: this.vSPGuid}})
      },
      delectAddress (vReceiverGuid) {
        console.log('删除按钮')
        console.log(vReceiverGuid)
        let that = this
        this.$confirm('提示', '是否确定删除此地址?', function () {
          that.getDelectAddress(vReceiverGuid)
        })
//        this.getDelectAddress(vReceiverGuid)
      },
      getDelectAddress (vReceiverGuid) {
//        let cToken = this.$getCookie('token')
        api.deleteAddress({
//          token: cToken,
          vReceiverGuid: vReceiverGuid
        }).then(res => {
          if (res.code === 0) {
            this.getAllAddressList()
            this.$msgbox('提示', '删除成功')
          }
        }, err => {
          console.log('删除失败')
          console.log(err)
        })
      },
      getAllAddressList () {
//        let cToken = this.$getCookie('token')
//        {token: cToken}
        api.allAddress().then(res => {
          if (res.code === 0) {
            console.log('获取地址列表成功')
            console.log(res.data)
            this.pRecordList = res.data.recordList
            console.log(this.pRecordList)
          }
        }, err => {
          console.log('获取地址列表失败')
          console.log(err)
        })
      },
      ...mapMutations({
        setvItemAddress: 'SET_VITEMADDRESS'
      })
    },
    watch: {
//      '$route' (to, from) {
//        this.getAllAddressList()
//      }
    },
    components: {
      XInput,
      Group,
      XAddress,
      XTextarea,
      XHeader,
      Cell,
      CellBox,
      CheckIcon
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .address-list
    position: absolute
    left: 0
    top: 0
    width: 7.5rem
    min-height: 13.3rem
    z-index: 100
    background: #f4f4f4
    .list-item
      margin-bottom: 0.2rem
      .vux-header
        background-color: rgba(255, 255, 255, 1)
        .vux-header-title
          color: #333333
      .weui-cells
        color: #333333
        margin-top: 0
        font-size: 0.30rem
        .weui-cell__ft
          color: #333333
      .weui-icon-circle
        font-size: 0.45rem
      .weui-icon-success
        font-size: 0.45rem
        &:before
           color: #f96c9e
      .weui-cell:before
        border-top: 0
      .add-check
        display: flex
        flex-direction: row
        justify-content: space-between
        border-top: 1px solid #f4f4f4
        height: 0.96rem
        line-height: 0.96rem
        background: #ffffff
        margin-top: 0.20rem
        /*padding: 0.3rem 0.2rem*/
        box-sizing: border-box
        width: 7.5rem
        .check-box
          display: flex
          flex-direction: row
          width: 3rem
          .check-boxLi
            display: flex
            width: 1.5rem
            flex-direction: row
        .spn-color
          color: red
    .noAddress
      font-size: 0.4rem
      margin-top: 0.5rem
      color: #333
      text-align: center
  .weui-dialog__hd
    padding: 0em 1.6em 0.1em !important
    color: #333 !important
</style>
