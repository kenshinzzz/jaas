export const routes =
  {
    pre: '',
    path: '/acct',
    list: [
      {
        name: 'charts',
        path: '/charts',
        component: (resolve) => require(['./views/charts'], resolve),
        meta: {auth: true}
      },
      {
        name: 'income',
        path: '/income',
        component: (resolve) => require(['./views/income'], resolve),
        meta: {auth: true}
      },
      {
        name: 'incomeAdd',
        path: '/income-add',
        component: (resolve) => require(['./views/income-add'], resolve),
        meta: {auth: true}
      }
    ]
  }
