import _import from './_import'
// 分类
export default [
  {
    path: '/',
    component: _import('layout/index'),
    children: [
      {
        path: '/market',
        component: _import('market'),
        children: [
          {
            path: 'entry',
            component: _import('market/entry'),
            meta: {
              title: '考试任务'
            }
          }
        ]
      }
    ]
  }
]
