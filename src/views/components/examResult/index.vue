<template>
  <div class="entry">
    <div class="bg">
      <van-nav-bar class="back" @click-left="onClickLeft">
        <template  #left>
          <van-icon name="arrow-left" size="18" color="aliceblue"/>
          <span class="text">返回</span>
        </template>
        <template #title>
          <span class="text">考试结果</span>
        </template>
      </van-nav-bar>
      <van-row><br></van-row>
      <div class="left_icon">
        <van-image width="120" height="30" :src="img.left_decorate"/>
      </div>
      <div class="result">
        <div class="userInfo">
          <van-row class="headImage">
            <van-image width="50" height="50" :src="img.headImg"/>
          </van-row>
          <van-row class="userName">
            <p>{{userInfo.name}}</p>
          </van-row>
          <van-row class="score">
            <van-col class="smallStart">
              <van-image width="18" height="18" :src="img.smallStart"/>
            </van-col>
            <van-col>
              <span class="text">{{Number(examUserInfo.maxScore).toFixed(1)}}</span>
              <span>分</span>
            </van-col>
            <van-col class="narmalStart">
              <van-image width="10" height="10" :src="img.narmalStart"/>
            </van-col>
          </van-row>
          <van-row>
            <van-divider dashed :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 10px' }"/>
          </van-row>
          <van-row >
            <van-col span="4"></van-col>
            <van-col span="16">
              <van-divider :style="{ width:10,color: '#1989fa', borderColor: '#1989fa', padding: '0 10px' }">排行榜</van-divider>
            </van-col>
            <van-col span="4"></van-col>
          </van-row>
          <van-row class="Shoot">
            <van-col span="3">名次</van-col>
            <van-col span="9">用户名</van-col>
            <van-col span="5">分数</van-col>
            <van-col span="7">用时</van-col>
          </van-row>
          <van-row class="allSomeone">
            <van-col span="3">1</van-col>
            <van-col span="9">lovbe0210</van-col>
            <van-col span="5">100分</van-col>
            <van-col span="7">2分30秒</van-col>
          </van-row>
        </div>
      </div>
      <div class="right_icon">
        <van-image width="120" height="30" :src="img.right_decorate"/>
      </div>
      <van-row class="btn">
        <van-col span="2"/>
        <van-col span="9">
          <van-button plain type="default" round size="large" @click="showMyExamed()">查看试卷</van-button>
        </van-col>
        <van-col span="2"/>
        <van-col span="9">
          <van-button plain type="default" round size="large" @click="initUserExam()">再考一次</van-button>
        </van-col>
        <van-col span="2"/>
      </van-row>
      <van-row class="bottom"></van-row>
    </div>
  </div>
</template>
<script>
import examingApi from '@/api/examing'
import ucenterApi from '@/api/ucenter'
import marketApi from '@/api/market'
export default {
  data () {
    return {
      examUserInfo: {},
      userInfo: {},
      img: {
        headImg: require('@/assets/pic/img_default_head.png'),
        right_decorate: require('@/assets/pic/right_decorate.png'),
        left_decorate: require('@/assets/pic/left_decorate.png'),
        smallStart: require('@/assets/pic/small_start.png'),
        narmalStart: require('@/assets/pic/normal_Start.png')
      }
    }
  },
  created () {
    this.getExamUserInfo()
  },
  methods: {
    getExamUserInfo () {
      examingApi.getExamUserById(this.$route.params.examUserId).then(response => {
        if (response.data.succ) {
          this.examUserInfo = response.data.data
          ucenterApi.getUserById(this.examUserInfo.userId).then(response => {
            if (response.data.succ) {
              this.userInfo = response.data.data
            }
          })
        }
      })
    },
    onClickLeft () {
      this.$router.push({
        path: '/market/entry'
      })
    },
    initUserExam () {
      marketApi.initUserExam({userId: this.examUserInfo.userId,
        examId: this.examUserInfo.examId}).then((response) => {
        if (response.data.succ) {
          // 组卷成功
          // 路由跳转到考试界面
          this.$router.push({
            name: 'examing',
            params: {userId: this.examUserInfo.userId,
              examId: this.examUserInfo.examId}
          })
        } else {
          // 组卷失败
          this.$notify({
            message: '进入考试失败\n' + response.data.msg,
            duration: 1700
          })
        }
      })
    },
    showMyExamed () {
      this.$toast('吕一正在疯狂加班中...')
    }
  }
}
</script>
<style lang="scss" scoped src="./style.scss"></style>
