<template>
  <div class="todayOrder">
    <h6 class="title">我参与的竞赛</h6>
    <ul class="lists">
      <van-row v-if="data.length == 0">
        <van-empty class="custom-image" image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
          description="您当前没有参加竞赛或参加的竞赛已结束" />
      </van-row>
    </ul>
  </div>
</template>
<script>
export default {
  components: {
  },
  created () {
    // 后期开发竞赛
  },
  data () {
    return {
      data: []
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped src="./style.scss"></style>
