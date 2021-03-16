<template>
  <div id="mineEntry">
    <div class="avatar-wrapper">
      <div class="img">
        <router-link :to="{ name: 'mineSetting' }">
          <img
            :src="userInfo.avatarUrl"
          />
        </router-link>
      </div>
    </div>
    <div class="list">
      <van-cell-group>
        <van-cell
          title="账号"
          :value="userInfo.loginName"
          size="large"
          center
        />
        <van-cell
          title="部门"
          :value="userInfo.departmentName"
          size="large"
          center
        />
        <van-cell title="姓名" :value="userInfo.realName" size="large" center />
        <van-cell
          title="考试成绩"
          is-link
          arrow-direction="down"
          size="large"
          @click="showExamScore()"
        />
        <van-action-sheet v-model="scoreShow" title="考试成绩">
          <div class="examScore">
            <van-row gutter="5" class="title">
              <van-col span="11">考试名称</van-col>
              <van-col span="4">分数</van-col>
              <van-col span="5">用时</van-col>
              <van-col span="4">排名</van-col>
            </van-row>
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <van-row gutter="5" v-for="item in myExamList" :key="item.id">
                <van-col span="11">{{ item.examName }}</van-col>
                <van-col span="4">{{ item.maxScore + "分" }}</van-col>
                <van-col span="5">{{ item.totalDuration }}</van-col>
                <van-col span="4" v-if="item.sort">{{ item.sort }}</van-col>
                <van-col span="4" v-else>暂无排名</van-col>
              </van-row>
            </van-list>
          </div>
        </van-action-sheet>
        <van-cell
          title="手机"
          is-link
          to="/phoneNum"
          value="点击绑定"
          value-class="rignt"
          size="large"
          center
        />
        <van-cell
          title="微信"
          is-link
          to="/weChat"
          value="点击绑定"
          value-class="rignt"
          size="large"
          center
        />
        <van-cell
          title="邮箱"
          is-link
          to="/email"
          value="点击绑定"
          value-class="rignt"
          size="large"
          center
        />
        <van-cell
          title="修改密码"
          is-link
          size="large"
          @click="updatePassword()"
        />
        <van-action-sheet v-model="pwdShow" title="修改密码" @close="reload()">
          <div class="updatePwd">
            <van-form validate-first @submit="onSubmit">
              <van-field
                v-model="password.beforePwd"
                placeholder="请输入原密码"
                type="password"
                :rules="[{ required: true }]"
              />
              <van-field
                v-model="password.nowpwd"
                :rules="[{ pattern, message: '包含一个大写字母和数字8-20位' }]"
                type="password"
                placeholder="请输入新密码(包含一个大写字母和数字8-20位)"
              />
              <van-field
                v-model="password.confirmNowPwd"
                :rules="[{ validator, message: '两次输入密码不一致' }]"
                type="password"
                placeholder="请再次输入新密码(包含一个大写字母和数字8-20位)"
              />
              <div style="margin: 16px">
                <van-button round block type="info" native-type="submit"
                  >提交</van-button
                >
              </div>
            </van-form>
          </div>
        </van-action-sheet>
        <van-cell title="退出登录" is-link size="large" @click="loginOut()">
          <template #right-icon>
            <van-icon name="share" class="search-icon" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import ucenterApi from '@/api/ucenter'
export default {
  data () {
    return {
      userInfo: {},
      myExamList: [],
      scoreShow: false, // 成绩面板显示开关
      pwdShow: false, // 修改密码显示开关
      loading: false, // 列表是否开始加载
      finished: false, // 列表是否加载完所有数据
      password: {
        userId: '',
        beforePwd: '',
        nowpwd: '',
        confirmNowPwd: ''
      },
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/
    }
  },
  created () {
    this.getUserInfo(this.$route.query.userId)
  },
  methods: {
    getUserInfo (userId) {
      ucenterApi.getUserById(userId).then((response) => {
        if (response.data.succ) {
          this.userInfo = response.data.data
        }
      })
    },
    showExamScore () {
      // 展示所有考试成绩
      ucenterApi.getMyExam(this.$route.query.userId).then((response) => {
        if (response.data.succ) {
          this.myExamList = response.data.data
          this.scoreShow = true
        }
      })
    },
    updatePassword () {
      // 修改密码
      this.pwdShow = true
    },
    loginOut () {
      this.$dialog
        .confirm({
          message: '确认退出登录？'
        })
        .then(() => {
          ucenterApi.loginOut().then((response) => {
            if (response.data.succ) {
              this.$router.push({
                path: '/login'
              })
            }
          })
        })
        .catch(() => {
          // on cancel
        })
    },

    // 下面全是下拉列表相关方法
    onLoad () {
      // 异步更新数据
      this.finished = true
    },

    validator (val) {
      return this.password.nowpwd === this.password.confirmNowPwd
    },

    // 修改密码
    onSubmit () {
      this.password.userId = this.userInfo.id
      ucenterApi.updatePwd(this.password).then((response) => {
        if (response.data.succ) {
          this.pwdShow = false
          this.$toast.success(response.data.msg)
        } else {
          this.$toast.fail(response.data.msg)
        }
      })
    },

    // 修改密码页面关闭数据置空
    reload () {
      this.password = {}
    }
  }
}
</script>

<style lang="scss" src='./index.scss'></style>
