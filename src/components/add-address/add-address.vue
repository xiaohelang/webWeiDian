<template>
  <div class="address">
    <x-header :left-options="{backText: ''}">{{addressTitle}}<a style="display: block; color: #333; width: 1rem; text-align: center;" @click.stop="saveOrEdit" slot="right">保存</a></x-header>
    <group>
      <x-input title="收货人" name="username" placeholder="请输入姓名" is-type="china-name" v-model="userName"></x-input>
      <x-input title="联系电话" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"
               v-model="mobile"></x-input>
      <x-address title="所在地区" v-model="address" raw-value :list="addressData"></x-address>
      <x-textarea :max="100" name="description" placeholder="请输入详细地址" :height="100" v-model="dtAddress"></x-textarea>
    </group>
    <div class="add-check">
      <check-icon :value.sync="moRem">设置为默认地址</check-icon>
    </div>
  </div>
</template>

<script>
  import {
    XInput,
    Group,
    XAddress,
    Cell,
    ChinaAddressV3Data,
    XTextarea,
    XHeader,
    CheckIcon,
    Value2nameFilter as value2name
  } from 'vux'
  import api from '../../fetch/api'

  export default {
    data () {
      return {
        vSPGuid: '',
        title: '个人中心页',
        userName: '',
        mobile: '',
        address: ['广东省', '广州市', '天河区'],
        address2: '',
        dtAddress: '',
        addressData: ChinaAddressV3Data,
        moRem: true,
        titleType: '',
        isEdit: true,
        addressTitle: '添加地址'
      }
    },
    activated () {
      this.vSPGuid = this.$route.query.productId
      this.isEdit = localStorage.isEdit
      let vReceiverGuid = localStorage.vReceiverGuid
      if (this.isEdit === 'true') {
        this.addressTitle = '编辑地址'
        if (typeof (vReceiverGuid) !== 'undefined') {
          this.getAddress(vReceiverGuid)
        }
      } else if (this.isEdit === 'false') {
        this.addressTitle = '添加地址'
        this.userName = ''
        this.mobile = ''
        this.dtAddress = ''
      }
    },
    methods: {
      saveOrEdit () {
        this.isEdit = localStorage.isEdit
        if (this.isEdit === 'true') {
          this.editAddress()
        } else if (this.isEdit === 'false') {
          this.saveAddress()
        }
      },
      saveAddress () {
        this.address2 = this.getName(this.address).split(' ')
        if (!this.address2[2]) {
          this.address2.pop()
          this.address2.push(this.address2[1])
        }
//        let cToken = this.$getCookie('token')
        api.addAddress({
//          token: cToken,
          consignee: this.userName,
          province: this.address2[0],
          city: this.address2[1],
          area: this.address2[2],
          detailAddress: this.dtAddress,
          zipCode: '5',
          phone: this.mobile,
          isDefault: this.moRem
        }).then(res => {
          console.log('添加地址')
          let that = this
          if (res.code === 0) {
            this.userName = ''
            this.mobile = ''
            this.dtAddress = ''
            this.$msgbox('提示', res.message, function () {
              that.$router.push('/addresslist')
//              that.$router.push({path: '/addresslist', query: {productId: this.vSPGuid}})
            })
          }
          console.log(res)
        }, err => {
          console.log('数据错误02')
          console.log(err)
          this.$msgbox('提示', err.data.message)
        })
      },
//      获取编辑地址信息
      getAddress (vReceiverGuid) {
//        let cToken = this.$getCookie('token')
        api.infoAddress({
//          token: cToken,
          vReceiverGuid: vReceiverGuid
        }).then(res => {
//          console.log(res)
          if (res.code === 0) {
            this.userName = res.data.consignee
            this.mobile = res.data.phone
            this.dtAddress = res.data.detailAddress
            this.address = [res.data.province, res.data.city, res.data.area]
            this.moRem = res.data.isDefault
          }
        }, err => {
          this.$msgbox('提示', err.data.message)
        })
      },
//      更新编辑地址信息
      editAddress () {
        this.address2 = this.getName(this.address).split(' ')
        if (!this.address2[2]) {
          this.address2.pop()
          this.address2.push(this.address2[1])
        }
//        let cToken = this.$getCookie('token')
        let vReceiverGuid = localStorage.vReceiverGuid
        let than = this
        api.upDateAddress({
//          token: cToken,
          vReceiverGuid: vReceiverGuid,
          consignee: this.userName,
          province: this.address2[0],
          city: this.address2[1],
          area: this.address2[2],
          detailAddress: this.dtAddress,
          zipCode: '5',
          phone: this.mobile,
          isDefault: this.moRem
        }).then(res => {
          if (res.code === 0) {
            this.$msgbox('提示', res.message, function () {
              than.$router.push('/addresslist')
//              than.$router.push({path: '/addresslist', query: {productId: this.vSPGuid}})
            })
          }
        }, err => {
          this.$msgbox('提示', err.data.message)
        })
      },
      getName (value) {
        return value2name(value, ChinaAddressV3Data)
      }
    },
    components: {
      XInput,
      Group,
      XAddress,
      XTextarea,
      XHeader,
      CheckIcon,
      Cell
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .address
    font-size: 0.28rem
    position: absolute
    left: 0
    top: 0
    width: 7.5rem
    min-height: 13.3rem
    z-index: 100
    background: #f4f4f4
    .vux-header
      background: #ffffff
      .vux-header-title
        color: #333
    .weui-cell
      color: #333
    .vux-check-icon > span
      font-size: 0.26rem
      color: rgba(249, 108, 158, 1)
    .weui-cells
      margin-top: 0
      font-size: 0.30rem
    .weui-icon-success
      &:before
         color: #f96c9e
    .weui-cell:before
      left: 0
    .vux-cell-box:before
      left: 0
    .add-check
      height: 0.96rem
      background: #ffffff
      margin-top: 0.20rem
      padding: 0.3rem 0.2rem
      box-sizing: border-box
      width: 7.5rem
  .weui-dialog__hd
    padding: 0em 1.6em 0.1em
    color: #333
  .vux-header .vux-header-right > a
    color: #333

</style>
