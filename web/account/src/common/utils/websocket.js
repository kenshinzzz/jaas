/**
 * WEBSOCKET服务请求封装
 */
// XSocket.prototype = {
export default {
  websocket: null,
  isOpen: false,
  sendMsg: function (message) {
    this.websocket.send(message)
  },
  close: function () {
    this.websocket.close()
  },
  init: function () {
    // 判断当前浏览器是否支持WebSocket
    if ('WebSocket' in window) {
      /* eslint-disable */
      if (this.websocket == null) {
        this.websocket = new WebSocket('ws://localhost:8080/jas/websocket')
      }
      /* eslint-enable */
    } else {
      log('Not support websocket')
    }

    // 连接发生错误的回调方法
    this.websocket.onerror = function () {
      log('error')
    }

    // 连接成功建立的回调方法
    this.websocket.onopen = function (event) {
      log('open')
      this.isOpen = true
    }

    // 接收到消息的回调方法
    this.websocket.onmessage = function (event) {
      log(event.data)
    }

    // 连接关闭的回调方法
    this.websocket.onclose = function () {
      log('close')
      this.isOpen = false
      this.websocket = null
    }

    let that = this
    // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function () {
      that.websocket.close()
    }
  }
}

// 将消息显示在网页上
function log (msg) {
  console.log(msg)
}

// export default XSocket
