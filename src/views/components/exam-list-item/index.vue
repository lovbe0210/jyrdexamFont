<template>
  <ul class="lists">
    <van-row v-if="data.length == 0">
      <van-empty class="custom-image" image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
        description="您当前没有参加考试或参加的考试已结束"
      />
    </van-row>
    <li class="lists-item" v-for="(item,index) in data" :key="index">
      <van-row type="flex">
        <van-col span="4">
          <div class="imgs">
            <van-icon name="column" class="img"/>
          </div>
        </van-col>
        <van-col span="18">
          <p class="label">{{item.name}}</p>
        </van-col>
      </van-row>
      <van-row type="flex">
        <van-col span="24">
          <div class="info">
            <p class="desc">剩余次数：{{item.count}}</p>
            <p class="desc">考试时长：{{item.duration}}</p>
            <p class="desc">最高分数：{{item.score}}分</p>
          </div>
          <div class="btn">
            <van-button type="primary" :hairline="false" color="#1A8DFF" size="small"
            @click="initUserExam({userId: userId, examId: item.examId})">
              {{item.buttonText}}
            </van-button>
          </div>
        </van-col>
      </van-row>
    </li>
  </ul>
</template>
<script>
import marketApi from '@/api/market'
export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      userId: ''
    }
  },
  created () {
    this.userId = this.$route.query.userId
  },
  methods: {
    initUserExam (params) {
      marketApi.initUserExam(params).then((response) => {
        if (response.data.succ) {
          // 组卷成功
          // 路由跳转到考试界面
          this.$router.push({
            name: 'examing',
            params: params
          })
        } else {
          // 组卷失败
          this.$notify({
            message: '进入考试失败\n' + response.data.msg,
            duration: 1700
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped src="./style.scss"></style>
