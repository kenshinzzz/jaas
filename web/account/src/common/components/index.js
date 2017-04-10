import xmHeader from './xm-header'
import xmItem from './xm-item'
import xmCard from './xm-card'
import xmModal from './xm-modal'
import xmButtonGroup from './xm-button-group'
import xmRow from './xm-row'
import xmDict from './xm-dict'
import slide from './slide'

const install = function (Vue) {
  if (install.installed) return

  Vue.component(xmHeader.name, xmHeader)
  Vue.component(xmItem.name, xmItem)
  Vue.component(xmCard.name, xmCard)
  Vue.component(xmModal.name, xmModal)
  Vue.component(xmButtonGroup.name, xmButtonGroup)
  Vue.component(xmRow.name, xmRow)
  Vue.component(xmDict.name, xmDict)
  Vue.component(slide.name, slide)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

module.exports = {
  install,
  xmHeader,
  xmItem,
  xmCard,
  xmModal,
  xmButtonGroup,
  xmRow,
  xmDict
}
