<template>
  <div class="todayOrder">
    <h6 class="title">我参与的考试</h6>
    <ExamListItem :data="myExamList"></ExamListItem>
  </div>
</template>
<script>
import ExamListItem from '@/views/components/exam-list-item'
import examingApi from '@/api/examing'
export default {
  components: {
    ExamListItem
  },
  created () {
    this.initMyExamList()
  },
  data () {
    return {
      myExamList: []
    }
  },
  methods: {
    initMyExamList () {
      examingApi.getMyExamList(this.$route.query.userId).then(response => {
        if (response.data.succ) {
          this.myExamList = response.data.data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped src="./style.scss"></style>
