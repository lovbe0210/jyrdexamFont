import _import from './_import'
// 考试中
export default [
  {
    name: 'examing',
    path: '/examing/:userId/:examId',
    component: _import('components/examing'),
    meta: {
      title: '正在考试'
    }
  }
]
