<template>
  <ul class="lists">
    <li
      class="lists-item"
      v-for="(item, index) in data"
      :key="index"
      @click="playExam(item)"
    >
      <van-row type="flex">
        <van-col span="24">
          <p class="label">
            <van-tag round :type="item.type">{{ item.statu }}</van-tag>
            {{ item.name }}
          </p>
        </van-col>
      </van-row>
      <van-row type="flex">
        <van-col span="24">
          <div class="info">
            <p class="desc">
              {{ item.startTime }}&nbsp;~&nbsp;{{ item.endTime }}
            </p>
          </div>
        </van-col>
      </van-row>
    </li>
  </ul>
</template>
<script>
import marketApi from '@/api/market'
export default {
  data () {
    return {
      params: {
        userId: '',
        examId: ''
      }
    }
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  created () {
    this.params.userId = this.$route.query.userId
  },
  methods: {
    playExam (item) {
      if (item.statu === '已结束') {
        this.$toast('考试已结束')
      } else if (item.statu === '可参加') {
        var examMessage =
          item.name + '\n' +
          '\n考试时间：' +
          item.startTime +
          '~' +
          item.endTime +
          '\n考试时长：' +
          item.examDuration +
          '分钟                            ' +
          '\n总分数：' +
          item.totalScore +
          '分                              ' +
          '\n及格分数：' +
          item.passScore +
          '分                             ' +
          '\n最大考试次数：' +
          item.examCount +
          '次                           '
        this.$dialog
          .confirm({
            message: examMessage,
            confirmButtonText: '确认考试'
          })
          .then(() => {
            this.params.examId = item.id
            // 初始化试卷，成功之后跳转到考试界面
            this.initUserExam(this.params)
          })
          .catch(() => {
            // on cancel
          })
      }
    },
    initUserExam (params) {
      marketApi.initUserExam(params).then((response) => {
        if (response.data.succ) {
          // 组卷成功
          // 路由跳转到考试界面
          this.$router.push({
            name: 'examing',
            params: this.params
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
