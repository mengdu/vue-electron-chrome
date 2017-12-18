import MCenterLayout from './center-layout'
import MCenterLayoutItem from './center-layout-item'

MCenterLayout.install = function (Vue) {
  Vue.component(MCenterLayout.name, MCenterLayout)
  Vue.component(MCenterLayoutItem.name, MCenterLayoutItem)
}

export default MCenterLayout
