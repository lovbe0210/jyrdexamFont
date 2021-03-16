<template>
  <div class="entry">
    <van-row class="back">
      <router-link :to="{ path: beforeRoute }" class="left">
          <van-icon name="arrow-left" size="22" />
      </router-link>
    </van-row>
    <van-row class="title">
      <span>请设置您的登录账号</span>
    </van-row>
    <van-form @submit="onSubmit">
      <div class="loginName">
        <van-row class="hidden" v-show="showOrHidden.loginName.flag">
          <van-col class="left">*</van-col>
          <van-col class="right">&nbsp;用户名</van-col>
        </van-row>
        <van-row class="input">
          <van-col class="left">{{showOrHidden.loginName.text}}</van-col>
          <van-col>
            <van-field v-model="userInfo.loginName" placeholder="请输入用户名(6-18位)"
            :rules="[{required: true}]" @focus="getFocus('loginName')" @blur="loseFocus('loginName')" />
            <div class="right">
              <span v-show="showOrHidden.loginName.msgFlag">{{showOrHidden.loginName.errorMsg}}</span>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="workNum">
        <van-row class="hidden" v-show="showOrHidden.workNum.flag">
          <van-col class="left">*</van-col>
          <van-col class="right">&nbsp;工号</van-col>
        </van-row>
        <van-row class="input">
          <van-col class="left">{{showOrHidden.workNum.text}}</van-col>
          <van-col>
            <van-field v-model="userInfo.workNum" placeholder="请输入工号" :rules="[{required: true}]"
            @focus="getFocus('workNum')" @blur="loseFocus('workNum',userInfo.workNum)"/>
            <div class="right">
              <span v-show="showOrHidden.workNum.msgFlag">{{showOrHidden.workNum.errorMsg}}</span>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="realName">
        <van-row class="hidden" v-show="showOrHidden.realName.flag">
          <van-col class="left">*</van-col>
          <van-col class="right">&nbsp;真实姓名</van-col>
        </van-row>
        <van-row class="input">
          <van-col class="left">{{showOrHidden.realName.text}}</van-col>
          <van-col>
            <van-field v-model="userInfo.realName" placeholder="请输入真实姓名" :rules="[{ required: true}]"
            @focus="getFocus('realName')" @blur="loseFocus('realName')"/>
            <div class="right">
              <span v-show="showOrHidden.realName.msgFlag">{{showOrHidden.realName.errorMsg}}</span>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="departmentId">
        <van-row class="input">
          <van-col class="left">*</van-col>
          <van-col>
            <van-field readonly clickable name="picker" :value="showDepart" @click="showPicker = true"
              placeholder="点击选择部门信息"  :rules="[{ required: true}]"/>
            <van-popup v-model="showPicker" position="bottom">
              <van-picker show-toolbar :columns="depts" value-key="deptName" @confirm="onConfirm"
                default-index="0" @cancel="showPicker = false"/>
            </van-popup>
            <div class="right"/>
          </van-col>
        </van-row>
      </div>
      <div class="password">
        <van-row class="hidden" v-show="showOrHidden.password.flag">
          <van-col class="left">*</van-col>
          <van-col class="right">&nbsp;密码</van-col>
        </van-row>
        <van-row class="input">
          <van-col class="left">{{showOrHidden.password.text}}</van-col>
          <van-col>
            <van-field v-model="userInfo.password" type="password" placeholder="请输入密码(至少8位)"
            :rules="[{ required: true}]" @focus="getFocus('password')" @blur="loseFocus('password')"/>
            <div class="right">
              <span v-show="showOrHidden.password.msgFlag">{{showOrHidden.password.errorMsg}}</span>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="confirmPWD">
        <van-row class="hidden" v-show="showOrHidden.confirmPWD.flag">
          <van-col class="left">*</van-col>
          <van-col class="right">&nbsp;确认密码</van-col>
        </van-row>
        <van-row class="input">
          <van-col class="left">{{showOrHidden.confirmPWD.text}}</van-col>
          <van-col>
            <van-field v-model="userInfo.confirmPWD" type="password" placeholder="请再次确认密码"
            :rules="[{ required: true}]" @focus="getFocus('confirmPWD')" @blur="loseFocus('confirmPWD')"/>
            <div class="right">
              <span v-show="showOrHidden.confirmPWD.msgFlag">{{showOrHidden.confirmPWD.errorMsg}}</span>
            </div>
          </van-col>
        </van-row>
      </div>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">下一步</van-button>
      </div>
      <div class="bottom">&nbsp;</div>
    </van-form>
  </div>
</template>
<script>
import ucenterApi from '@/api/ucenter'
export default {
  data () {
    return {
      beforeRoute: '',
      showOrHidden: {
        loginName: { text: '*', flag: false, errorMsg: '', msgFlag: false },
        workNum: { text: '*', flag: false, errorMsg: '', msgFlag: false },
        realName: { text: '*', flag: false, errorMsg: '', msgFlag: false },
        password: { text: '*', flag: false, errorMsg: '', msgFlag: false },
        confirmPWD: { text: '*', flag: false, errorMsg: '', msgFlag: false }
      },
      userInfo: {
        loginName: '',
        workNum: '',
        realName: '',
        departmentId: '',
        password: '',
        confirmPWD: ''
      },
      depts: [],
      showDepart: '',
      showPicker: false
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.beforeRoute = from.path
    })
  },
  created () {
    this.getdepartList()
  },
  methods: {
    // 函数校验
    validateForm () {
      var flag = /^[a-zA-Z0-9_]{6,18}$/.test(this.userInfo.loginName)
      if (!flag) {
        this.showOrHidden.loginName.msgFlag = true
        this.showOrHidden.loginName.errorMsg = '用户名无效'
        return
      }
      flag = /^[0-2][0-9][0-9][0-9]/.test(this.userInfo.workNum)
      if (!flag) {
        this.showOrHidden.workNum.msgFlag = true
        this.showOrHidden.workNum.errorMsg = '无效工号'
        return
      }
      flag = /^[\u4e00-\u9fa5]{2,7}$/.test(this.userInfo.realName)
      if (!flag) {
        this.showOrHidden.realName.msgFlag = true
        this.showOrHidden.realName.errorMsg = '姓名无效'
        return
      }
      flag = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/.test(this.userInfo.password)
      if (!flag) {
        this.showOrHidden.password.msgFlag = true
        this.showOrHidden.password.errorMsg = '以字母开头包含一个大写字母'
        return
      }
      flag = this.userInfo.confirmPWD === this.userInfo.password
      if (!flag) {
        this.showOrHidden.confirmPWD.msgFlag = true
        this.showOrHidden.confirmPWD.errorMsg = '两次输入不一致'
      }
      return flag
    },
    // 获取部门列表
    getdepartList () {
      ucenterApi.getdepartList().then(response => {
        if (response.data.succ) {
          this.depts = response.data.data
        }
      })
    },
    // 表单提交
    onSubmit () {
      var flag = this.validateForm()
      if (flag) {
        // 发送异步请求注册用户
        ucenterApi.registUser(this.userInfo).then(response => {
          if (response.data.succ) {
            // 注册成功，跳转到登录页面
            this.$toast.success({
              message: '注册成功，即将跳转到登录页面',
              duration: 1800,
              onOpened: this.onClose()
            })
          } else {
            this.$toast.fail(response.data.msg)
          }
        })
      }
    },
    // 跳转到登录页面
    onClose () {
      this.$router.push({
        name: 'login'
      })
    },
    // 部门栏确认方法
    onConfirm (value) {
      this.showDepart = value.deptName
      this.userInfo.departmentId = value.id
      this.userInfo.departmentName = value.deptName
      this.showPicker = false
    },
    getFocus (param) {
      if (param === 'loginName') {
        this.showOrHidden.loginName.flag = true
        this.showOrHidden.loginName.text = ' '
        this.showOrHidden.loginName.errorMsg = ''
      }
      if (param === 'workNum') {
        this.showOrHidden.workNum.flag = true
        this.showOrHidden.workNum.text = ' '
        this.showOrHidden.workNum.errorMsg = ''
      }
      if (param === 'realName') {
        this.showOrHidden.realName.flag = true
        this.showOrHidden.realName.text = ' '
        this.showOrHidden.realName.errorMsg = ''
      }
      if (param === 'password') {
        this.showOrHidden.password.flag = true
        this.showOrHidden.password.text = ' '
        this.showOrHidden.password.errorMsg = ''
      }
      if (param === 'confirmPWD') {
        this.showOrHidden.confirmPWD.flag = true
        this.showOrHidden.confirmPWD.text = ' '
        this.showOrHidden.confirmPWD.errorMsg = ''
      }
    },
    loseFocus (param, value) {
      if (param === 'loginName') {
        this.showOrHidden.loginName.flag = false
        this.showOrHidden.loginName.text = '*'
      }
      if (param === 'workNum') {
        this.showOrHidden.workNum.flag = false
        this.showOrHidden.workNum.text = '*'
      }
      if (param === 'realName') {
        this.showOrHidden.realName.flag = false
        this.showOrHidden.realName.text = '*'
      }
      if (param === 'password') {
        this.showOrHidden.password.flag = false
        this.showOrHidden.password.text = '*'
      }
      if (param === 'confirmPWD') {
        this.showOrHidden.confirmPWD.flag = false
        this.showOrHidden.confirmPWD.text = '*'
      }
    }
  }
}
</script>
<style lang="scss" scoped src="./style.scss"></style>
