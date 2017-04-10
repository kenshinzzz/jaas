import * as acConfig from './account/router'
import * as userConfig from './user/router'
import * as todoConfig from './todo/router'

var routes = []
const registerRoute = (config) => {
  // console.log(config)
  let pre = config.pre
  let path = config.path
  for (var obj of config.list) {
    // console.log(obj)
    if (obj.name) {
      obj.name = `${pre}${obj.name}`
    }
    if (obj.path) {
      obj.path = `${path}${obj.path}`
    }
    routes.push(obj)
  }
}

registerRoute(acConfig.routes)
registerRoute(userConfig.routes)
registerRoute(todoConfig.routes)

routes.push(
  {
    path: '*',
    redirect: '/user/home'
  }
)
export default routes
