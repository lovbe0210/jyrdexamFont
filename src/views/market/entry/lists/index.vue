<template>
  <div class="lists">
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item title="考试" name="exam">
        <div v-if="ExamList.list.length">
          <MarkListItem :data="ExamList.list"></MarkListItem>
        </div>
        <div v-else>
          <span class="none">暂未发布考试</span>
        </div>

      </van-collapse-item>
      <van-collapse-item title="竞赛" name="competition">
        <div>
          <span class="none">暂未发布竞赛</span>
        </div>
      </van-collapse-item>
    </van-collapse>

  </div>
</template>
<script>
import MarkListItem from '@/views/components/mark-list-item'
import marketApi from '@/api/market'
export default {
  components: {
    MarkListItem
  },
  data () {
    return {
      ExamList: {
        list: [],
        serverData: []
      },
      activeName: 'exam'
    }
  },
  created () {
    marketApi.getExamList().then(response => {
      this.ExamList.serverData = response.data.rows
      this.reSetProp()
      // console.log(this.ExamList.list)
    })
  },
  methods: {
    reSetProp () {
      this.ExamList.serverData.forEach(element => {
        var state
        var type
        if (element.STATE_NAME === '进行中') {
          state = '可参加'
          type = 'primary'
        } else if (element.STATE_NAME === '已结束') {
          state = '已结束'
        }
        this.ExamList.list.push({
          id: element.ID,
          name: element.NAME,
          startTime: element.START_TIME_STR.slice(0, 10),
          endTime: element.END_TIME_STR.slice(0, 10),
          examDuration: element.Exam_Duration,
          totalScore: element.PAPER_TOTLE_SCORE,
          passScore: element.PASS_SCORE,
          examCount: element.Exam_Cunt,
          statu: state,
          type: type
        })
      })
    }
  }
}
</script>
