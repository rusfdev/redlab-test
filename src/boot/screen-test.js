import { boot } from 'quasar/wrappers'
import { testScrollbarWidth, testScreenHeight } from 'assets/js/screen-test'

export default boot(() => {
  testScrollbarWidth()
  testScreenHeight()
})
