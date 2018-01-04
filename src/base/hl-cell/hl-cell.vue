<template>
  <cell :title="title" :value="value">
    <img slot="child" class="cell-leftIcon" src="../../common/image/shop-icon.png" alt="">
  </cell>
</template>

<script>
  import { Cell } from 'vux'
  export default {
    props: {
      title: {
        type: String,
        default: 'title'
      },
      value: {
        type: String,
        default: 'value'
      }
    },
    data () {
      return {}
    },
    methods: {},
    components: {
      Cell
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  .weui-cell
    color: #333
    padding-left: 50px
    .weui-cell__ft
      color: #f96c9e
  .cell-leftIcon
    top: 7px
    position: absolute
    width: 0.4rem
    left: 15px
  .weui-panel__bd
   height: 2.04rem
   .weui-media-box
    padding: 0.18rem
    .weui-media-box_appmsg .weui-media-box__hd
     height: 1.68rem
     width: 1.68rem
</style>
