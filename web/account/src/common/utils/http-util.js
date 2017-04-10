/**
 * HTTP服务请求封装
 */
import Vue from 'vue'
import Config from 'config/config'

export {httpGet, httpPost}

/**
 * 发起HTTP POST请求
 * @param system 请求系统
 * @param serviceCode 服务编码
 * @param param 请求参数
 * @returns {Promise}
 */
function httpPost (system, serviceCode, param) {
  if (process.env.NODE_ENV === 'development' && Config.isTestJson) {
    return new Promise((resolve, reject) => {
      Vue.http.get(serviceCode + '.json').then((response) => {
        if (response.data.code === Config.successCode) {
          resolve(response.data.data)
        } else {
          if (response.data.code === Config.errorCode.NOT_LOGIN) {
            Vue.router.push({'path': '/user/login'})
          } else {
            reject(response.data.msg)
          }
        }
      }, (response) => {
        console.log('error' + serviceCode)
        reject(response.data)
      })
    })
  } else {
    let url = Config.proxyPath[system] + serviceCode + '.json'
    // param['header'] = getHeader()
    /* eslint-disable */
    return new Promise((resolve, reject) => {
      Vue.http.post(url, JSON.stringify(param)).then((response) => {
        if (response.data.code === Config.successCode) {
        resolve(response.data.data)
        } else {
          reject(response.data.msg)
        }
      }, (response) => {
        console.log('error' + serviceCode)
        reject(response.data)
      })
    })

  }
}

/**
 * 发起HTTP GET请求
 * @param system 请求系统
 * @param serviceCode 服务编码
 * @param param 请求参数
 * @returns {Promise}
 */
function httpGet (system, serviceCode, param) {
  let url = Config.proxyPath[system] + serviceCode
  param['header'] = getHeader()
  if (process.env.NODE_ENV === 'development' && Config.isTestJson) {
    return new Promise((resolve, reject) => {
      Vue.http.get(serviceCode + '.json').then((response) => {
        if (response.data.header.responseCode === Config.successCode) {
          resolve(response.data)
        } else {
          reject(response.data.header.responseMessage)
        }
      }, (response) => {
        console.log('error' + serviceCode)
        reject(response.data)
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      Vue.http.post(url, JSON.stringify(param)).then((response) => {
        if (response.data.header.responseCode === Config.successCode) {
          resolve(response.data)
        } else {
          reject(response.data.header.responseMessage)
        }
      }, (response) => {
        reject(response.data)
      })
    })
  }
}

/**
 * 请求报文头
 * @returns {{AppId: string, Locale: string}}
 */
function getHeader () {
  return {
    AppId: Config.appId,
    Locale: Config.defaultLocale
  }
}
