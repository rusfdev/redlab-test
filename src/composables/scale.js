import { reactive, computed, ref } from 'vue'

export function useScale(ratio) {

  const outerSize = reactive({
    width: 0,
    height: 0
  })

  const width = computed(() => {
    return outerSize.width / outerSize.height < ratio
      ? outerSize.height * ratio
      : outerSize.width
  })

  const height = computed(() => {
    return width.value / ratio
  })

  function onResize(size) {
    outerSize.width = size.width
    outerSize.height = size.height
  }

  return { width, height, onResize }
}

