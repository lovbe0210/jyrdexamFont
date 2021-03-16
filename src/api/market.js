import request from '@/utils/request'

export default {

  // 查找所有考试列表
  getExamList (params) {
    return request({
      url: '/exam/getExamList',
      method: 'post',
      data: params
    })
  },
  // 后台组卷
  initUserExam (params) {
    return request({
      url: '/exam/initUserExam',
      method: 'post',
      data: params
    })
  }
}
