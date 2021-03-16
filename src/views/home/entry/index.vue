<!--
 * @Author: WangQiBiao
 * @LastEditors: WangQiBiao
 * @Description:
 * @Date: 2019-03-31 13:41:09
 * @LastEditTime: 2019-03-31 13:55:24
 -->
<template>
  <div class="entry">
    <div class="header-title">首页</div>
    <div class="subnav">
      <ul class="nav">
        <van-row class="nav-item">
            <van-col span="6" @click="exam">
              <img class="icon" :src="require('@/assets/pic/exam.jpg') || 'https://via.placeholder.com/88x88'" alt="">
              <p class="label" :style="examStyle">考试</p>
            </van-col>
            <van-col span="6" @click="competition">
              <img class="icon" :src="require('@/assets/pic/jingsai.jpg') || 'https://via.placeholder.com/88x88'" alt="">
              <p class="label" :style="competeStyle">竞赛</p>
            </van-col>
            <van-col span="6" @click="questionList">
              <img class="icon" :src="require('@/assets/pic/examRes.jpg') || 'https://via.placeholder.com/88x88'" alt="">
              <p class="label">题库</p>
            </van-col>
            <van-col span="6" @click="myErrorQ">
              <img class="icon" :src="require('@/assets/pic/failure.jpg') || 'https://via.placeholder.com/88x88'" alt="">
              <p class="label">错题本</p>
            </van-col>
        </van-row>
      </ul>
    </div>
    <component :is="comName"></component>
  </div>
</template>
<script>
import myPlay from './myPlay'
import competition from './competition'
export default {
  components: {
    myPlay, competition
  },
  data () {
    return {
      comName: 'myPlay',
      examStyle: 'color:#1A8DFF;',
      competeStyle: ''
    }
  },
  methods: {
    competition () {
      this.comName = 'competition'
      this.competeStyle = 'color:#1A8DFF;'
      this.examStyle = ''
    },
    exam () {
      this.comName = 'myPlay'
      this.competeStyle = ''
      this.examStyle = 'color:#1A8DFF;'
    },
    questionList () {
      this.$toast({
        message: '请联系管理员开放试题库',
        icon: 'friends-o',
        position: 'top'
      })
    },
    myErrorQ () {
      this.$toast({
        message: '小吕一正在疯狂加班中...',
        icon: 'logistics',
        position: 'top'
      })
    }
  }
}
</script>
<style lang="scss" src="./style.scss"></style>
