import Vue from 'vue'

export default {
  /**
   * 金额格式化
   * @param value
   * @param currency
   * @returns {*}
   */
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
        'value': key,
        'label': dict[key]
      })
    })
    return items
  },
  getDictValue (dictType, key) {
    let lang = Vue.config.lang.toLowerCase()
    let dict = require(`config/dict/${lang}/${dictType}.json`)
    return dict[key]
  },
  /**
   * date转为通讯日期类型YYYY-MM-DD
   * @param v 日期
   * @param split 分隔符
   * @returns
   */
  getDateNormal (v, split) {
    let year = v.getFullYear()
    let month = v.getMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    var date = v.getDate()
    if (date < 10) {
      date = '0' + date
    }
    return year + split + month + split + date
  },
  /**
   * 去掉空格
   * @param v
   * @returns
   */
  trim (v) {
    return v.replace(/(^\s*)|(\s*$)/g, '')
  },
  /**
   * 字符串判空
   * @param v
   * @returns
   */
  isEmpty (v) {
    // this.trim(v).length === 0
    if (v == null || v.length === 0 || v === 'null') {
      return true
    } else {
      return false
    }
  },
  /**
   * 将上送的日期YYYY-MM-DD转换成YYYYMMDD格式，去掉日期中的-
   * @param v
   * @returns
   */
  deleteDateFormat (v) {
    try {
      var myreg = /[a\-z]/
      var str = v.replace(myreg, '')
      v = str.replace(myreg, '')
      return v
    } catch (e) {
      return v
    }
  },
  /**
   * 格式化日期
   * @param v YYYYDDMMHHmmss
   * @returns
   */
  formatDateTime (v) {
    if (this.isEmpty(v)) {
      return '1998-01-01'
    } else {
      if (v.length > 0 && v.length < 9) {
        return v.substring(0, 4) + '-' + v.substring(4, 6) + '-' + v.substring(6, 8)
      }
      if (v.length > 8 && v.length < 15) {
        return v.substring(0, 4) + '-' + v.substring(4, 6) + '-' + v.substring(6, 8) + ' ' + v.substring(8, 10) + ':' + v.substring(10, 12) + ':' + v.substring(12, 14)
      }
    }
  },
  /**
   * 獲得哈希碼
   * @param v 字符串
   * @returns
   */
  hashCode (v) {
    var hash = 0
    if (v.length === 0) {
      return hash
    }
    for (var i = 0; i < v.length; i++) {
      let char = v.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
      // Convert to 32bit integer
    }
    return hash
  },
  /**
   * 對象複製
   * @param obj
   * @returns
   */
  clone (obj) {
  // Handle the 3 simple types, and null or undefined
    if (obj === null || typeof obj !== 'object') {
      return obj
    }
    // Handle Date
    if (obj instanceof Date) {
      let copy = new Date()
      copy.setTime(obj.getTime())
      return copy
    }
    // Handle Array
    if (obj instanceof Array) {
      let copy = []
      let len = obj.length
      for (let i = 0; i < len; ++i) {
        copy[i] = this.clone(obj[i])
      }
      return copy
    }
    // Handle Object
    if (obj instanceof Object) {
      var copy = {}
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr])
      }
      return copy
    }
    throw new Error('Unable to copy obj! Its type isnt supported.')
  },
  /**
   * 日期修改
   * @param
   * @returns
   */
  dateModify (date, year, month, day) {
    let mYear = date.getFullYear() + year
    let mMonth = date.getMonth() + month + 1
    if (mMonth < 10 && mMonth > 0) {
      mMonth = '0' + mMonth
    } else if (mMonth <= 0) {
      mYear = mYear - 1
      mMonth = 12 + mMonth
    }
    let mDate = new Date(mYear + '-' + mMonth + '-' + date.getDate())
    mDate.setDate(mDate.getDate() + day)
    return mDate
  },
  /**
   * 计算天数差
   * @param 日期
   * @param 日期
   * @returns
   */
  daysBetween (startDate, endDate) {    // sDate1和sDate2是2002-12-18格式
    // var aDate, oDate1, oDate2, iDays
    // aDate = sDate1.split('-')
    // oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])    // 转换为12-18-2002格式
    // aDate = sDate2.split('-')
    // oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
    // iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)    // 把相差的毫秒数转换为天数
    // return iDays
    let date1 = new Date(startDate).getTime()
    let date2 = new Date(endDate).getTime()
    return parseInt(Math.abs(date2 - date1) / 1000 / 60 / 60 / 24)
  }
}
