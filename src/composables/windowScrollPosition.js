import { onMounted, onUnmounted, onBeforeMount, ref } from 'vue'
import { throttle, debounce } from 'quasar'

export function useWindowScrollPosition() {
  const x = ref(0)
  const y = ref(0)

  function setScrollPos() {
    x.value = window.pageXOffset
    y.value = window.pageYOffset
  }

  const onScrollThrottle = throttle(setScrollPos, 100)
  const onScrollDebounce = debounce(setScrollPos, 100)

  onBeforeMount(() => {
    setScrollPos()
  })

  onMounted(() => {
    window.addEventListener('scroll', onScrollThrottle)
    window.addEventListener('scroll', onScrollDebounce)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScrollThrottle)
    window.removeEventListener('scroll', onScrollDebounce)
  })

  return { x, y }
}
