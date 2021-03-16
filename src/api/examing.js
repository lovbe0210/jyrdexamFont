import request from '@/utils/request'
export default {

  // 获取考试用户信息和试题
  getExamUserInfo (params) {
    return request({
      url: '/exam/getExamUserInfo',
      method: 'post',
      data: params
    })
  },
  getExamQuestionList (examUserId) {
    return request({
      url: '/exam/getExamQuestionList?examUserId=' + examUserId,
      method: 'post'
    })
  },
  saveCurrentAnswer (examUserQuestionId, answer) {
    return request({
      url: '/exam/saveCurrentAnswer?id=' + examUserQuestionId + '&answer=' + answer,
      method: 'post'
    })
  },
  submitExam (examUserId) {
    return request({
      url: '/exam/submitExam?id=' + examUserId,
      method: 'post'
    })
  },
  getExamUserById (examUserId) {
    return request({
      url: '/exam/getExamUserById?id=' + examUserId,
      method: 'post'
    })
  },
  getMyExamList (userId) {
    return request({
      url: '/exam/getMyExamList?userId=' + userId,
      method: 'post'
    })
  }
}
