import { boot } from 'quasar/wrappers'
import Magnet from 'src/directives/magnet'

export default boot(({ app }) => {
  app.directive('magnet', Magnet)
})
