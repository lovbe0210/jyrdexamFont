import _import from './_import'
// 考试结果
export default [
  {
    name: 'examResult',
    path: '/examResult/:examUserId',
    component: _import('components/examResult'),
    meta: {
      title: '考试结果'
    }
  }
]
