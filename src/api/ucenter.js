import request from '@/utils/request'

export default {
  getMyExam (userId) {
    return request({
      url: '/ucenter/getMyExam?userId=' + userId,
      method: 'post'
    })
  },
  getUserById (userId) {
    return request({
      url: '/ucenter/getUserById?id=' + userId,
      method: 'post'
    })
  },
  getdepartList () {
    return request({
      url: '/admin/getdepartList',
      method: 'post'
    })
  },
  registUser (userInfo) {
    return request({
      url: '/ucenter/registUser',
      method: 'post',
      data: userInfo
    })
  },
  login (userInfo) {
    return request({
      url: '/ucenter/login',
      method: 'post',
      data: userInfo
    })
  },
  mobileLogin (userInfo) {
    return request({
      url: '/ucenter/mobileLogin',
      method: 'post',
      data: userInfo
    })
  },
  isLogin () {
    return request({
      url: '/ucenter/isLogin',
      method: 'post'
    })
  },
  loginOut () {
    return request({
      url: '/ucenter/loginOut',
      method: 'post'
    })
  },
  updatePwd (passwordInfo) {
    return request({
      url: '/ucenter/updatePwd',
      method: 'post',
      data: passwordInfo
    })
  },
  updateUserInfo (userInfo) {
    return request({
      url: '/ucenter/updateUserInfo',
      method: 'post',
      data: userInfo
    })
  },
  isBindPhone (phoneNum) {
    return request({
      url: '/ucenter/isBindPhone?phoneNum=' + phoneNum,
      method: 'post'
    })
  },
  sendCode (phoneNum) {
    return request({
      url: '/ucenter/sendCode?phoneNum=' + phoneNum,
      method: 'post'
    })
  },
  fileupload (file) {
    return request({
      url: '/ucenter/fileUpload',
      method: 'post',
      data: file
    })
  }
}
