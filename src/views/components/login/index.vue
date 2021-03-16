<template>
  <div class="entry">
    <div class="header-title">登录注册</div>
    <div class="logo">
      <van-image src="https://lovbe-lvyiclub.oss-cn-beijing.aliyuncs.com/exam/logo.png"
      height="140px" width="140px"/>
    </div>
    <div class="errorMsg">{{errorMsg}}</div>
    <van-form @submit="onSubmit">
      <div class="default" v-if="defaultLogin">
        <div class="loginName">
          <van-row class="hidden" v-show="showOrHidden.loginName.flag">
            <van-col class="text">请输入用户名</van-col>
          </van-row>
          <van-row class="input">
              <van-field v-model="loginName" name="loginName"
              :placeholder="showOrHidden.loginName.placeholder"
              @blur="loseFocus('loginName')" @focus="getFocus('loginName')" @input="inputing()"/>
          </van-row>
          <div class="line" :style="showOrHidden.loginName.lineColor"></div>
        </div>

        <div class="password">
          <van-row class="hidden" v-show="showOrHidden.password.flag">
            <van-col class="text">请输入密码</van-col>
          </van-row>
          <van-row class="input">
              <van-field v-model="password" type="password" name="password"
              :placeholder="showOrHidden.password.placeholder"
              @blur="loseFocus('password')" @focus="getFocus('password')" @input="inputing()"/>
          </van-row>
          <div class="line" :style="showOrHidden.password.lineColor"></div>
        </div>
      </div>
      <div class="veryfyCode" v-if="!defaultLogin">
        <div class="phone">
          <van-row class="hidden" v-show="showOrHidden.loginName.flag">
            <van-col class="text">请输入手机号</van-col>
          </van-row>
          <van-row class="input">
              <van-field v-model="loginName" name="loginName"
              :placeholder="showOrHidden.loginName.placeholder"
              @blur="loseFocus('loginName')" @focus="getFocus('loginName')" @input="inputing()"/>
          </van-row>
          <div class="line" :style="showOrHidden.loginName.lineColor"></div>
        </div>

        <div class="code">
          <van-row class="hidden" v-show="showOrHidden.password.flag">
            <van-col class="text">请输入验证码</van-col>
          </van-row>
          <van-row class="input">
              <van-col span="17">
                <van-field v-model="password" name="password"
                :placeholder="showOrHidden.password.placeholder"
                @blur="loseFocus('password')" @focus="getFocus('password')" @input="inputing()"/>
              </van-col>
              <van-col span="7" v-show="!showCountdown" class="text" @click="sendCode()">获取验证码</van-col>
              <van-col span="7" v-show="showCountdown" class="text">
                <van-count-down ref="countDown" format="sss后获取"
                :time="120000" :auto-start="false" @finish="finish"/>
              </van-col>
          </van-row>
          <div class="line" :style="showOrHidden.password.lineColor"></div>
        </div>
      </div>
      <van-row>
        <van-col class="forgetpwd" @click="forgetPwd()">忘记密码</van-col>
        <van-col class="regist" @click="regist()">注册账号</van-col>
      </van-row>
      <div class="sumitBtn" >
        <van-button round block type="info" native-type="submit" :disabled="loginBtn">登录</van-button>
      </div>
    </van-form>
    <van-divider :style="{ color: '#B4B6BD', borderColor: '#B4B6BD', padding: '0 16px' }">其他登陆方式</van-divider>
    <van-row>
      <van-col class="ph" @click="veryfyCodeLogin()" v-if="defaultLogin">
        <van-icon name="https://lovbe-lvyiclub.oss-cn-beijing.aliyuncs.com/exam/icon/icon_phone.png"
       size="25px"/>
       <span class="text">手机验证码登录</span>
      </van-col>
      <van-col class="ph" @click="accountPwdLogin()" v-else>
        <van-icon name="user-o" color="#1A8CFE" size="18"/>
        <span class="text">账号密码登录</span>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import ucenterApi from '@/api/ucenter'
export default {
  data () {
    return {
      beforeRoute: '',
      showOrHidden: {
        loginName: { placeholder: '请输入用户名', lineColor: 'border-bottom-color:#DCDFE6;', flag: false, msgFlag: false },
        password: { placeholder: '请输入密码', lineColor: 'border-bottom-color:#DCDFE6;', flag: false, msgFlag: false }
      },
      loginName: '',
      password: '',
      loginBtn: true,
      defaultLogin: true,
      showCountdown: false,
      text1: '请输入用户名',
      text2: '请输入密码',
      errorMsg: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.beforeRoute = from.path
    })
  },
  methods: {
    onSubmit (values) {
      // 判断是用户名密码登录还是手机验证码登录
      if (this.defaultLogin) {
        // 用户名密码登录
        ucenterApi.login(values).then(response => {
          if (response.data.succ) {
          // 登录成功，返回之前登录页面
            if (this.beforeRoute === '/regist') {
              this.beforeRoute = '/'
            }
            this.$router.push({
              path: this.beforeRoute
            })
          } else {
            this.$toast.fail(response.data.msg)
          }
        })
      } else {
        // 验证码登录
        ucenterApi.mobileLogin(values).then(response => {
          if (response.data.succ) {
          // 登录成功，返回之前登录页面
            if (this.beforeRoute === '/regist' || this.beforeRoute === '/login') {
              this.beforeRoute = '/'
            }
            this.$router.push({
              path: this.beforeRoute
            })
          } else {
            this.$toast.fail(response.data.msg)
          }
        })
      }
    },
    getFocus (value) {
      if (value === 'loginName') {
        this.showOrHidden.loginName.flag = true
        this.showOrHidden.loginName.lineColor = 'border-bottom-color:#03A9F4;'
        this.showOrHidden.loginName.placeholder = ''
      } else {
        this.showOrHidden.password.flag = true
        this.showOrHidden.password.lineColor = 'border-bottom-color:#03A9F4;'
        this.showOrHidden.password.placeholder = ''
      }
    },
    loseFocus (value) {
      if (value === 'loginName') {
        this.showOrHidden.loginName.placeholder = this.text1
        this.showOrHidden.loginName.lineColor = 'border-bottom-color:#DCDFE6;'
        if (this.loginName.length > 0) {
          this.showOrHidden.loginName.flag = true
        } else {
          this.showOrHidden.loginName.flag = false
        }
      } else {
        this.showOrHidden.password.placeholder = this.text2
        this.showOrHidden.password.lineColor = 'border-bottom-color:#DCDFE6;'
        if (this.password.length > 0) {
          this.showOrHidden.password.flag = true
        } else {
          this.showOrHidden.password.flag = false
        }
      }
      if (this.loginName.length > 0 && this.password.length > 0) {
        this.loginBtn = false
      } else {
        this.loginBtn = true
      }
    },
    inputing () {
      if (this.loginName.length > 0 && this.password.length > 0) {
        this.loginBtn = false
      } else {
        this.loginBtn = true
      }
    },
    forgetPwd () {
      this.$router.push('/regist')
    },
    regist () {
      this.$router.push('/regist')
    },
    veryfyCodeLogin () {
      this.defaultLogin = false
      this.text1 = '请输入手机号码'
      this.text2 = '请输入验证码'
      this.showOrHidden.loginName.placeholder = this.text1
      this.showOrHidden.password.placeholder = this.text2
    },
    sendCode () {
      // 验证手机号码是否正确同时后台验证
      var flag = /^1[0-9]{10}$/.test(this.loginName)
      if (!flag) {
        this.errorMsg = '请输入正确的手机号码'
      } else {
        // 后台查询是否绑定了手机号码
        ucenterApi.isBindPhone(this.loginName).then(response => {
          if (response.data.succ) {
            this.errorMsg = ''
            // 已绑定，发送验证码
            ucenterApi.sendCode(this.loginName).then(response => {
              if (response.data.succ) {
                // 显示倒计时
                this.showCountdown = true
                this.$refs.countDown.start()
              } else {
                this.errorMsg = response.data.msg
              }
            })
          } else {
            // 暂未绑定
            this.errorMsg = response.data.msg
          }
        })
      }
    },
    accountPwdLogin () {
      this.defaultLogin = true
      this.text1 = '请输入用户名'
      this.text2 = '请输入密码'
      this.showOrHidden.loginName.placeholder = this.text1
      this.showOrHidden.password.placeholder = this.text2
      this.errorMsg = ''
    },
    finish () {
      this.showCountdown = false
    }

  }
}
</script>
<style lang="scss" scoped src="./style.scss"></style>
