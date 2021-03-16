<template>
  <div class="entry">
    <div class="header-title">考试任务</div>
    <div class="searchWrapper">
      <div class="inputbox">
        <van-search
          v-model="searchValue"
          @focus="focus"
          placeholder="搜索已发布的考试"
          background=""
        ></van-search>
      </div>
    </div>
    <div class="dropdown-menu">
      <van-dropdown-menu>
        <van-dropdown-item title="筛选" ref="item">
          <van-cell center title="进行中">
            <template #right-icon>
              <van-switch
                v-model="switch1"
                size="24"
                active-color="#ee0a24"
              ></van-switch>
            </template>
          </van-cell>
          <van-cell center title="已结束">
            <template #right-icon>
              <van-switch
                v-model="switch2"
                size="24"
                active-color="#ee0a24"
              ></van-switch>
            </template>
          </van-cell>
          <van-cell center title="未参与">
            <template #right-icon>
              <van-switch
                v-model="switch3"
                size="24"
                active-color="#ee0a24"
              ></van-switch>
            </template>
          </van-cell>
          <div style="padding: 5px 16px">
            <van-button type="danger" block round @click="onConfirm">
              确认
            </van-button>
          </div>
        </van-dropdown-item>
        <van-dropdown-item
          v-model="value"
          :options="option"
        ></van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <div class="listsWrapper">
      <TheLists></TheLists>
    </div>
  </div>
</template>
<script>
import TheLists from './lists'

export default {
  components: {
    TheLists
  },
  data () {
    return {
      searchValue: '',
      value: 0,
      switch1: false,
      switch2: false,
      switch3: false,
      option: [
        { text: '默认排序', value: 0 },
        { text: '时间↑', value: 1 },
        { text: '时间↓', value: 2 }
      ]
    }
  },
  methods: {
    focus () {
      this.$router.push({ path: '/service/list-search' })
    },
    onConfirm () {
      this.$refs.item.toggle()
    }
  }
}
</script>
<style lang="scss" scoped src="./style.scss"></style>
