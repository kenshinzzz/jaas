import {Validator} from 'vee-validate'
import messages from 'assets/js/zh_CN'
import * as constants from 'common/const/constants'
Validator.updateDictionary({
  zh_CN: {
    messages
  }
})
const config = {
  errorBagName: 'errors', // change if property conflicts.
  delay: 0,
  locale: constants.SYSTEM.locale,
  messages: null,
  strict: true
}

const xmConfirmed = {
  getMessage (field, [confirmedField]) {
    debugger
    let name = confirmedField
    let el = document.querySelector(`*[data-vv-name='${confirmedField}']`)
    if (el) {
      name = el.dataset.vvAs
      if (!name) {
        name = el.dataset.vvName
      }
    }
    return `${field} ²»ÄÜºÍ${name}Æ¥Åä.`
  },
  validate (value, [confirmedField], validatingField) {
    let field = confirmedField
      ? document.querySelector(`input[name='${confirmedField}']`)
      : document.querySelector(`input[name='${validatingField}_confirmation']`)
    if (field == null) {
      field = document.querySelector(`a[name='${confirmedField}'] input`)
    }
    debugger
    return !!(field && String(value) === field.value)
  }
}
Validator.extend('xmConfirmed', xmConfirmed)

export default config
