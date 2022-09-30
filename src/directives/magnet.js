import Magnet from 'src/assets/js/magnet'

export default {
  mounted(el, binding, vnode, prevVnode) {
    if (!binding.value) return
    el.magnetInstance = new Magnet(el)
  },
  unmounted(el, binding, vnode, prevVnode) {
    if (el.magnetInstance) {
      el.magnetInstance.destroy()
    }
  }
}
