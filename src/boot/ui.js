import { boot } from 'quasar/wrappers'
import components from 'components/ui'

export default boot(({ app }) => {
  components.forEach(component => {
    app.component(component.name, component)
  })
})
