<template>
  <div class="author-relative">
    <div class="all-author">
      <div class="author-head" v-for="(item, index) in userList">
        <img :src="item.headImgUrl"/>
        <span class="author-icon" v-if="item.isHost === true">拼主</span>
      </div>
      <div class="quest" v-show="isquestion">?</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      userList: {
        type: Array
      },
      isquestion: {
        type: Boolean
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .author-relative
    height: 1.2rem
    position: relative
    margin-bottom: 0.6rem
    .all-author
      display: flex
      flex-direction: row
      position: absolute
      bottom: 0px
      left: 50%
      transform: translateX(-50%)
      -webkit-transform: translateX(-50%)
      .author-head
        width: 1.2rem
        height: 1.2rem
        position: relative
        margin-right: 0.2rem
        & img
          width: 100%
          height: 100%
          border-radius: 50%
        .author-icon
          background: #f96c9e
          height: 0.30rem
          line-height: 0.32rem
          font-size: 0.16rem
          width: 0.58rem
          position: absolute
          bottom: 0rem
          right: 0
          text-align: center
          border-radius: 0.25rem
      .quest
        width: 1.2rem
        height: 1.2rem
        border:1px dashed #8e8e8e
        border-radius: 50%
        text-align: center
        font-size: 0.60rem
        line-height: 1.22rem
        color: #8e8e8e
        box-sizing: border-box
</style>
