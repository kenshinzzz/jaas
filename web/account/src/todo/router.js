export const routes =
  {
    pre: '',
    path: '/todo',
    list: [
      {
        name: 'history-detail',
        path: '/history-detail',
        component: (resolve) => require(['./views/history-detail'], resolve),
        meta: {auth: true}
      },
      {
        name: 'todoindex',
        path: '/index',
        component: (resolve) => require(['./views/index'], resolve),
        meta: {auth: true}
      },
      {
        name: 'history',
        path: '/history',
        component: (resolve) => require(['./views/history'], resolve),
        meta: {auth: true}
      }
    ]
  }
