<template>
  <div id="mineSetting">
    <div class="header-title">个人信息</div>
    <van-cell-group class="top-cell-group">
      <van-uploader
        max-count="1" name="file" :max-size="1024 * 1024 * 1024"
        :after-read="afterRead"
        :before-read="beforeRead"
        @oversize="onOversize"
      >
        <van-row class="avatar">
          <van-col span="7" class="text">
            <van-field label="头像" />
          </van-col>
          <van-col span="4" class="img">
            <img style="width: 65px; height: 65" :src="userInfo.avatarUrl" />
          </van-col>
          <van-col>
            <van-icon class="icon" name="photograph" size="20"/>
          </van-col>
        </van-row>
      </van-uploader>
      <van-field
        v-model="userInfo.realName"
        label="姓名"
        :value="userInfo.realName"
        input-align="center"
      />
      <van-field
        v-model="userInfo.workNum"
        label="工号"
        :value="userInfo.workNum"
        input-align="center"
      />
      <van-row class="input">
        <van-col>
          <van-field
            readonly
            input-align="center"
            label="部门"
            clickable
            :value="'                    ' + showDepart"
            @click="showPicker = true"
            :rules="[{ required: true }]"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="depts"
              value-key="deptName"
              @confirm="onConfirm"
              default-index="0"
              @cancel="showPicker = false"
            />
          </van-popup>
          <div class="right" />
        </van-col>
      </van-row>
    </van-cell-group>
    <van-cell-group class="help-cell-group">
      <van-cell icon="question" title="联系维护" size="large" is-link>
        +86 1537998xxxx
      </van-cell>
      <van-cell
        icon="question"
        title="问答中心"
        size="large"
        is-link
      ></van-cell>
      <van-cell
        icon="question"
        title="关于我们"
        size="large"
        is-link
      ></van-cell>
    </van-cell-group>
    <van-button
      class="returnBtn"
      round
      type="default"
      size="large"
      @click="returnBtn"
      >返回</van-button
    >
    <van-button
      :disabled="flag"
      class="confirmBtn"
      round
      type="info"
      size="large"
      @click="updateBtn"
      >确认修改</van-button
    >
  </div>
</template>

<script>
import axios from 'axios'
import ucenterApi from '@/api/ucenter'
export default {
  data () {
    return {
      userInfo: {
        workNum: '',
        realName: '',
        departmentId: '',
        avatarUrl: ''
      },
      gender: true,
      depts: [],
      showDepart: '',
      showPicker: false,
      flag: false
    }
  },
  created () {
    this.getdepartList()
    this.getUserInfo(this.$route.query.userId)
  },
  methods: {
    getdepartList () {
      ucenterApi.getdepartList().then((response) => {
        if (response.data.succ) {
          this.depts = response.data.data
        }
      })
    },
    // 部门栏确认方法
    onConfirm (value) {
      this.showDepart = value.deptName
      this.userInfo.departmentId = value.id
      this.userInfo.departmentName = value.deptName
      this.showPicker = false
    },
    getUserInfo (userId) {
      ucenterApi.getUserById(userId).then((response) => {
        if (response.data.succ) {
          this.userInfo = response.data.data
          this.showDepart = this.userInfo.departmentName
        }
      })
    },
    afterRead (file) {
      file.status = 'uploading'
      file.message = '上传中...'
      // 此时可以自行将文件上传至服务器
      let content = file.file
      let data = new FormData()
      data.append('file', content)
      axios({
        method: 'Post',
        url: 'http://47.108.169.157:9527/ucenter/fileUpload',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: data
      }).then(response => {
        if (response.data.succ) {
          file.status = ''
          file.message = ''
          this.userInfo.avatarUrl = response.data.data
        } else {
          file.status = 'failed'
          file.message = '上传失败'
        }
      })
    },
    beforeRead (file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        this.$toast('请上传 jpg/png 格式图片')
        return false
      }
      return true
    },
    onOversize (file) {
      this.$toast('文件大小不能超过 10MB')
    },
    returnBtn () {
      this.$router.push('/mine/entry')
    },
    updateBtn () {
      ucenterApi.updateUserInfo(this.userInfo).then((response) => {
        if (response.data.succ) {
          this.$toast.success('个人信息修改成功')
        }
      })
    }
  }
}
</script>
<style lang='scss' src='./index.scss'></style>
