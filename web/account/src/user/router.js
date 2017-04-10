export const routes =
  {
    pre: '',
    path: '/user',
    list: [
      {
        name: 'login',
        path: '/login',
        component: (resolve) => require(['./views/login'], resolve)
      },
      {
        name: 'register',
        path: '/register',
        component: (resolve) => require(['./views/register'], resolve)
      },
      {
        name: 'home',
        path: '/home',
        component: (resolve) => require(['./views/home'], resolve),
        meta: {auth: false}
      }
    ]
  }
