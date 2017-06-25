import Vue from 'vue'
import Config from 'config/config'
import axios from 'axios'
import {Loading, MessageBox} from 'element-ui'

export {httpGet, httpPost, setCookie, getCookie}

const loadingConfig = {
  text: 'Loading...'
}

/**
 * 发起HTTP POST请求
 * @param system 请求系统
 * @param serviceCode 服务编码
 * @param param 请求参数
 * @returns {Promise}
 */
function httpPost (system, serviceCode, param) {
    let loading = Loading.service(loadingConfig)
    let url = Config.proxyPath[system] + serviceCode
    param['header'] = getHeader()
  if (Config.isTestJson) {
      return new Promise((resolve, reject) => {
          axios.get(url).then((response) => {
              let responseCode = response.data.header.responseCode
              if (responseCode === Config.successCode) {
                  resolve(response.data)
              } else if (responseCode === Config.timeOutCode) {
                  MessageBox.alert('請先登錄, 才能操作。', {
                      confirmButtonText: '確定',
                      type: 'info'
                  }).then(action => {
                      window.location = '/index'
                  })
              } else {
                  reject(response.data.header.responseMessage)
              }
              loading.close()
          }, (response) => {
              console.log('error' + serviceCode)
              reject(response.data)
              loading.close()
          })
      })
  }

  return new Promise((resolve, reject) => {
      axios.post(url, JSON.stringify(param)).then((response) => {
      let responseCode = response.data.header.responseCode
      if (responseCode === Config.successCode) {
        resolve(response.data)
      } else if (responseCode === Config.timeOutCode) {
        MessageBox.alert('請先登錄, 才能操作。', {
          confirmButtonText: '確定',
          type: 'info'
        }).then(action => {
          window.location = '/index'
        })
      } else {
        reject(response.data.header.responseMessage)
      }
      loading.close()
    }, (response) => {
      console.log('error' + serviceCode)
      reject(response.data)
      loading.close()
    })
  })
}

/**
 * 发起HTTP GET请求
 * @param system 请求系统
 * @param serviceCode 服务编码
 * @param param 请求参数
 * @returns {Promise}
 */
function httpGet (system, serviceCode, param) {
  let loading = Loading.service(loadingConfig)
  let url = Config.proxyPath[system] + serviceCode
  param['header'] = getHeader()
  return new Promise((resolve, reject) => {
    Vue.http.get(url, JSON.stringify(param)).then((response) => {
      let responseCode = response.data.header.responseCode
      if (responseCode === Config.successCode) {
        resolve(response.data)
      } else if (responseCode === Config.timeOutCode) {
        MessageBox.alert('請先登錄, 才能操作。', {
          confirmButtonText: '確定',
          type: 'info'
        }).then(action => {
          window.location = '/index'
        })
      } else {
        reject(response.data.header.responseMessage)
      }
      loading.close()
    }, (response) => {
      reject(response.data)
      loading.close()
    })
  })
}

/**
 * 请求报文头
 * @returns {{appId: string, locale: string}}
 */
function getHeader () {
  return {
    appId: Config.appId,
    locale: Config.defaultLocale
  }
}

/**
 * 设置cookie
 * @param name key
 * @param value token
 */
function setCookie (name, value) {
  if (value === '') {
    document.cookie = name + '='
    console.log('delCookie')
  } else {
    let cookieStr = ''
    cookieStr += name + '=' + value
    let date = new Date()
    date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000))
    let expires = '; expires=' + date.toGMTString()
    document.cookie = cookieStr + expires + '; path=/'
  }
}

/**
 * 获取cookie
 * @param name key
 */
function getCookie (name) {
  let v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  return v ? v[2] : null
}

/**
 * 获取图形验证码
 * @returns {{url: string}
 */
function getCaptcha (system) {
  let url = Config.proxyPath[system] + 'verifyCode?update=' + Math.random()
  console.log('url:' + url)
  return url
}
