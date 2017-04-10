const modules = [
  'common'
]

let locales = {
  'zh-CN': {},
  'en': {}
}

modules.forEach((item) => {
  Object.keys(locales).forEach((lang) => {
    locales[lang][item] = require(`./${item}/locale/${lang}.json`)
  })
})

export default locales
