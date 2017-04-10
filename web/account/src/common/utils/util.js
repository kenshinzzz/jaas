import Vue from 'vue'
import { Toast } from 'mint-ui'
export default {
  formatAmt (value, currency) {
    value = currency === 'JPY' ? parseFloat(value).toFixed(0) : parseFloat(value).toFixed(2)
    if (isNaN(value)) {
      return ''
    }
    let re = /(-?\d+)(\d{3})/
    while (re.test(value)) {
      value = value.replace(re, '$1,$2')
    }
    return value
  },
  /**
   * 获取字典
   * @param dictType
   * @returns {Array}
   */
  getDict (dictType) {
    let items = []
    let lang = Vue.config.lang.toLowerCase()
    let dict = require(`config/dict/${lang}/${dictType}.json`)
    Object.keys(dict).forEach(key => {
      items.push({
        'key': key,
        'desc': dict[key]
      })
    })
    return items
  },
  showValidate: function (msg) {
    Toast({
      message: msg,
      position: 'bottom',
      duration: 3000
    })
  }
}
