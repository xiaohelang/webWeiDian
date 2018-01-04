<template>
  <span>{{time}}</span>
</template>
<script>
  export default {
    data () {
      return {
        time: '',
        flag: false
      }
    },
    props: {
      endTime: {
        type: String
      }
    },
    mounted () {
      let time = null
      clearInterval(time)
      time = setInterval(() => {
        if (this.flag === true) {
          clearInterval(time)
        }
        this.timeDown()
      }, 500)
    },
    methods: {
      timeDown () {
        const endTime = new Date(this.endTime)
        const nowTime = new Date()
        let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000)
        let d = parseInt(leftTime / (24 * 60 * 60))
        let h = this.formate(parseInt(leftTime / (60 * 60) % 24))
        let m = this.formate(parseInt(leftTime / 60 % 60))
        let s = this.formate(parseInt(leftTime % 60))
        if (leftTime <= 0) {
          this.flag = true
          this.$emit('time-end')
          this.time = '该团结束'
          return false
        }
        if (d > 0) {
          this.time = `${d}天${h}小时${m}分${s}秒`
        } else if (h > 0) {
          this.time = `${h}小时${m}分${s}秒`
        } else if (m > 0) {
          this.time = `${m}分${s}秒`
        } else {
          this.time = `${s}秒`
        }
      },
      formate (time) {
        if (time >= 10) {
          return time
        } else {
          return `0${time}`
        }
      }
    }
  }
</script>
