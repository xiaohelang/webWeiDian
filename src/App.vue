<template>
  <div id="app">
    <m-header></m-header>
    <!--<tab></tab>-->
    <m-footer></m-footer>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script  type="text/ecmascript-6" >
  import MHeader from './components/m-header/m-header'
  import Tab from './components/tab/tab'
  import MFooter from './components/m-footer/m-footer'

  export default {
    created () {
    },
    components: {
      MHeader,
      Tab,
      MFooter
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #app
    color: pink
    max-width: 750px;
    margin: 0 auto
    position: relative
    .box
      background: red
</style>
