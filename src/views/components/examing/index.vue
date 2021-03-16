<template>
  <div class="entry">
    <van-row class="title">
      <router-link :to="{ path: beforeRoute }" class="left">
        <van-col span="1" class="return">
          <van-icon name="arrow-left" size="20" />
        </van-col>
        <van-col span="4">&nbsp;返回</van-col>
      </router-link>
      <van-col span="11" v-if="showComplete">
        <van-count-down :time="time" class="mid" format="剩余时间：HH:mm:ss" @finish="finished()"/>
      </van-col>
      <van-col span="4" class="right">
        <van-icon name="label" color="#fff"
        size="22" v-if="currentQuestion.marked" @click="decreMarkQuestion()"/>
        <van-icon name="label-o" color="#fff"
        size="22" v-else @click="increMarkQuestion()"/>
        <van-icon name="send-gift" color="#fff" size="22"  :badge="mark"
        class="mark" @click="show = true"/>
      </van-col>
      <van-col span="4" class="submit">
        <van-button round type="info" color="#1A8CFE" @click="submitExam()">交卷</van-button>
      </van-col>
    </van-row>
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper">
        <div class="block">
          <van-grid square :column-num="7" :gutter="7" class="marked">
            <van-grid-item v-for="value in examUserQuestion.length" :key="value" @click="jumpQuestion(value)">
            <a class="markedItem" v-if="examUserQuestion[value-1].marked">{{value}}
              <van-icon name="checked" size="17" color="#00C853" class="icon"
              v-if="examUserQuestion[value-1].answer"/>
            </a>
            <a class="unmarkedItem" v-else>{{value}}
              <van-icon name="checked" size="17" color="#00C853" class="icon"
              v-if="examUserQuestion[value-1].answer"/>
            </a>

            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </van-overlay>
    <van-row class="singleQuestion" v-if="showComplete">
      <div class="warn">
        <van-cell-group>
          <van-cell
            v-if="currentQuestion.questionType == 2"
            :title=" '当前题型：单项选择题（' + currentQuestion.singleScore + '分）' "
            size="large"
          />
          <van-cell v-if="currentQuestion.questionType == 3"
            :title="'当前题型：多项选择题（' + currentQuestion.singleScore + '分）'"
            size="large"
          />
          <van-cell
            v-if="currentQuestion.questionType == 4"
            :title="'当前题型：判断题（' + currentQuestion.singleScore + '分）'"
            size="large"
          />
          <van-cell
            v-if="currentQuestion.questionType == 5"
            :title="'当前题型：填空题（' + currentQuestion.singleScore + '分）'"
            size="large"
          />
          <van-cell
            v-if="currentQuestion.questionType == 6"
            :title="'当前题型：简答题（' + currentQuestion.singleScore + '分）'"
            size="large"
          />
        </van-cell-group>
      </div>
      <van-progress :percentage="percentage" class="percent" />
      <div>
        <van-cell-group>
          <van-cell
            :title="'(' + (currentQuestionIndex + 1) + '/' +
            examUserQuestion.length + '）' + currentQuestion.title " size="large"/>
          <van-cell>
            <template #title>
              <div v-if="currentQuestion.questionType == 2">
                <van-radio-group v-model="radio" class="options">
                  <van-radio
                    name="A"
                    v-if="currentQuestion.optionA"
                    class="option"
                    >{{ "A.  " + currentQuestion.optionA }}</van-radio
                  >
                  <van-radio
                    name="B"
                    v-if="currentQuestion.optionB"
                    class="option"
                    >{{ "B. " + currentQuestion.optionB }}</van-radio
                  >
                  <van-radio
                    name="C"
                    v-if="currentQuestion.optionC"
                    class="option"
                    >{{ "C. " + currentQuestion.optionC }}</van-radio
                  >
                  <van-radio
                    name="D"
                    v-if="currentQuestion.optionD"
                    class="option"
                    >{{ "D. " + currentQuestion.optionD }}</van-radio
                  >
                  <van-radio
                    name="E"
                    v-if="currentQuestion.optionE"
                    class="option"
                    >{{ "E. " + currentQuestion.optionE }}</van-radio
                  >
                  <van-radio
                    name="F"
                    v-if="currentQuestion.optionF"
                    class="option"
                    >{{ "F. " + currentQuestion.optionF }}</van-radio
                  >
                  <van-radio
                    name="G"
                    v-if="currentQuestion.optionG"
                    class="option"
                    >{{ "G. " + currentQuestion.optionG }}</van-radio
                  >
                </van-radio-group>
              </div>

              <div v-if="currentQuestion.questionType == 3" class="options">
                <van-checkbox-group v-model="result">
                  <van-checkbox
                    name="A"
                    v-if="currentQuestion.optionA"
                    class="option"
                    >{{ "A.  " + currentQuestion.optionA }}</van-checkbox
                  >
                  <van-checkbox
                    name="B"
                    v-if="currentQuestion.optionB"
                    class="option"
                    >{{ "B.  " + currentQuestion.optionB }}</van-checkbox
                  >
                  <van-checkbox
                    name="C"
                    v-if="currentQuestion.optionC"
                    class="option"
                    >{{ "C.  " + currentQuestion.optionC }}</van-checkbox
                  >
                  <van-checkbox
                    name="D"
                    v-if="currentQuestion.optionD"
                    class="option"
                    >{{ "D.  " + currentQuestion.optionD }}</van-checkbox
                  >
                  <van-checkbox
                    name="E"
                    v-if="currentQuestion.optionE"
                    class="option"
                    >{{ "E.  " + currentQuestion.optionE }}</van-checkbox
                  >
                  <van-checkbox
                    name="F"
                    v-if="currentQuestion.optionF"
                    class="option"
                    >{{ "F.  " + currentQuestion.optionF }}</van-checkbox
                  >
                  <van-checkbox
                    name="G"
                    v-if="currentQuestion.optionG"
                    class="option"
                    >{{ "G.  " + currentQuestion.optionG }}</van-checkbox
                  >
                </van-checkbox-group>
              </div>

              <div v-if="currentQuestion.questionType == 4">
                <van-radio-group v-model="radio" class="options">
                  <van-radio name="对" class="option">对</van-radio>
                  <van-radio name="错" class="option">错</van-radio>
                </van-radio-group>
              </div>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </van-row>
    <van-row class="loading" v-else>
      <van-loading type="spinner" color="#1989fa" vertical  size="28px">
        小吕一正在疯狂组卷中...
      </van-loading>
    </van-row>
    <van-row class="button">
      <van-col span="1"> </van-col>
      <van-col span="8">
        <van-button
          round
          type="info"
          size="large"
          disabled
          v-if="currentQuestionIndex == 0"
          >上一题</van-button
        >
        <van-button
          round
          type="info"
          size="large"
          v-else
          @click="beforeQuestion"
          >上一题</van-button
        >
      </van-col>
      <van-col span="1"> </van-col>
      <van-col span="13">
        <van-button
          round
          type="info"
          size="large"
          v-if="currentQuestionIndex == examUserQuestion.length - 1"
          @click="submitExam"
          >交卷</van-button
        >
        <van-button
          round
          type="info"
          size="large"
          v-else
          @click="nextQuestion()"
          >下一题</van-button
        >
      </van-col>
      <van-col span="1"> </van-col>
    </van-row>
  </div>
</template>
<script>
import examingApi from '@/api/examing'
export default {
  data () {
    return {
      showComplete: false,
      beforeRoute: '',
      param: {},
      time: 120,
      examUserInfo: {},
      examUserQuestion: [],
      currentQuestionIndex: 0,
      currentQuestion: {},
      radio: '',
      result: [],
      percentage: 1,
      mark: 0,
      show: false,
      questionNum: 30
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      if (from.path === '/login') {
        vm.beforeRoute = '/'
        return
      }
      vm.beforeRoute = from.path
    })
  },
  created () {
    this.getQuestionList()
  },
  methods: {
    getQuestionList () {
      this.param.userId = this.$route.params.userId
      this.param.examId = this.$route.params.examId
      // 获取考试用户信息
      examingApi.getExamUserInfo(this.param).then((response) => {
        if (response.data.succ) {
          this.examUserInfo = response.data.data
          // 初始化倒计时
          // 开始时间
          var date = new Date(this.examUserInfo.beginTime.replace(/-/g, '/'))
          var str = date.getTime()
          // 当前时间
          var currenttime = +new Date()
          this.time = Math.round(this.examUserInfo.examDuration * 1000 - (currenttime - str))
          // 获取试题集合
          examingApi.getExamQuestionList(this.examUserInfo.id).then((response) => {
            if (response.data.succ) {
              this.examUserQuestion = response.data.data
              // 加载指定序号试题
              this.currentQuestion = this.examUserQuestion[ this.currentQuestionIndex ]
              this.percentage = Math.round(
                ((this.currentQuestionIndex + 1) / this.examUserQuestion.length) * 100)
              // 最后改变请求状态为完成
              this.showComplete = true
              if (this.time <= 0) {
                // 强制交卷
                this.redirectSubmit()
              }
            }
          })
        } else {
          this.$router.push({
            path: '/market/entry'
          })
        }
      })
    },
    // 下一题
    nextQuestion () {
      // 保存当前答案
      this.saveAnswer()
      // 切换显示下一个试题
      this.currentQuestionIndex += 1
      this.currentQuestion = this.examUserQuestion[this.currentQuestionIndex]
      // 渲染下一题的答案
      this.showNextAnswer()
      // 重新计算进度条
      this.percentage = Math.round(
        ((this.currentQuestionIndex + 1) / this.examUserQuestion.length) * 100
      )
    },
    // 上一题
    beforeQuestion () {
      // 保存当前答案
      this.saveAnswer()
      // 切换显示上一个试题
      this.currentQuestionIndex -= 1
      this.currentQuestion = this.examUserQuestion[this.currentQuestionIndex]
      // 渲染下一题的答案
      this.showNextAnswer()
      // 重新计算进度条
      this.percentage = Math.round(
        ((this.currentQuestionIndex + 1) / this.examUserQuestion.length) * 100
      )
    },

    // 保存当前答案
    saveAnswer () {
      var answer = this.examUserQuestion[this.currentQuestionIndex].answer
      // 检查是否有答案选中，如果已做答则先判断当前答案是否和考试试题列表答案相同
      // 单选题
      if (
        this.currentQuestion.questionType === 2 ||
        this.currentQuestion.questionType === 4
      ) {
        if (this.radio) {
          // 如果相同则不做提交，如果不同先更改答案，然后异步提交当前答案
          if (this.radio !== answer) {
            this.examUserQuestion[ this.currentQuestionIndex ].answer = this.radio
            examingApi.saveCurrentAnswer(this.examUserQuestion[this.currentQuestionIndex].id, this.examUserQuestion[this.currentQuestionIndex].answer).then(response => {
            })
          }
        }
      }
      // 多选题
      if (this.currentQuestion.questionType === 3) {
        if (this.result && this.result.length > 0) {
          // 如果相同则不做提交，如果不同先更改答案，然后异步提交当前答案
          if (this.result !== answer) {
            this.examUserQuestion[ this.currentQuestionIndex ].answer = this.result
            examingApi.saveCurrentAnswer(this.examUserQuestion[this.currentQuestionIndex].id, this.examUserQuestion[this.currentQuestionIndex].answer).then(response => {
            })
          }
        }
      }
    },

    // 回显下一题的答案
    showNextAnswer () {
      if (
        this.currentQuestion.questionType === 2 ||
        this.currentQuestion.questionType === 4
      ) {
        this.radio = this.examUserQuestion[this.currentQuestionIndex].answer
      } else if (this.currentQuestion.questionType === 3) {
        // 多选需要注意result为数组
        if (this.currentQuestion.answer == null) {
          this.result = []
        } else {
          this.result = this.examUserQuestion[this.currentQuestionIndex].answer
        }
      }
    },
    // 交卷
    submitExam () {
      // 首先保存当前试题的答案
      this.saveAnswer()
      // 检查所有试题是否已经答完
      var allAnswered = true
      this.examUserQuestion.forEach((item, i) => {
        if (item.answer == null) {
          allAnswered = false
        } else if (item.answer.length === 0) {
          allAnswered = false
        }
      })
      if (!allAnswered) {
        // 试题未答完
        this.$dialog
          .confirm({
            title: '确认交卷',
            message: '您还有未答完的试题，是否确认交卷？',
            confirmButtonText: '确认交卷'
          })
          .then(() => {
            // 真正的交卷
            examingApi.submitExam(this.examUserInfo.id).then(response => {
              this.$router.push({
                name: 'examResult',
                params: {examUserId: response.data.data}
              })
            })
          })
          .catch(() => {
            // on cancel
          })
      } else {
        this.$dialog.alert({
          message: '确认交卷？',
          theme: 'round-button'
        }).then(() => {
          examingApi.submitExam(this.examUserInfo.id).then(response => {
            if (response.data.succ) {
              this.$router.push({
                name: 'examResult',
                params: {examUserId: response.data.data}
              })
            }
          })
        })
      }
    },
    increMarkQuestion () {
      this.mark += 1
      this.currentQuestion.marked = true
    },
    decreMarkQuestion () {
      this.mark -= 1
      this.currentQuestion.marked = false
    },
    jumpQuestion (value) {
      // 切换显示下一个试题
      this.currentQuestionIndex = value - 1
      this.currentQuestion = this.examUserQuestion[this.currentQuestionIndex]
      // 渲染下一题的答案
      this.showNextAnswer()
      // 重新计算进度条
      this.percentage = Math.round(
        ((this.currentQuestionIndex + 1) / this.examUserQuestion.length) * 100
      )
    },
    // 倒计时结束自动交卷
    finished () {
      // 判断分数
      this.$toast.loading({
        message: '考试时间结束，即将自动交卷',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 2500,
        onClose: this.redirectSubmit
      })
    },
    redirectSubmit () {
      // 首先保存当前试题的答案
      this.saveAnswer()
      examingApi.submitExam(this.examUserInfo.id).then(response => {
        if (response.data.succ) {
          this.$router.push({
            name: 'examResult',
            params: {examUserId: response.data.data}
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped src="./style.scss"></style>
