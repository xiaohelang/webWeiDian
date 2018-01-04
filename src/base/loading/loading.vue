<template>
  <div class="loading">
    <div v-if="loading">
      <img style="width: 0.35rem; height: 0.35rem;" src="./loading.gif">
      <span class="desc">{{title}}</span>
    </div>
    <p v-if="!loading" style="line-height: 0.4rem;">{{titleNo}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      },
      titleNo: {
        type: String,
        default: '没有更多的商品了~~~'
      },
      loading: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

  .loading
    width: 100%
    height: 0.4rem
    text-align: center
    display: flex
    padding-left: 2.7rem
    box-sizing: border-box
    font-size: 0.3rem
    color: #333333
    margin-top: 0.15rem
    .desc
      display: inline-block
      line-height: 20px
      font-size: 0.3rem
      color: #333
</style>
