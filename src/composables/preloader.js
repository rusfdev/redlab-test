import { onMounted, onUnmounted } from 'vue'

export function usePreloader() {

  function onPreloaderComplete(callback) {
    const _callback = function() {
      if (typeof callback === 'function') callback()
    }

    onMounted(() => {
      window.addEventListener('preloaderComplete', _callback)
    })

    onUnmounted(() => {
      window.removeEventListener('preloaderComplete', _callback)
    })
  }

  return { onPreloaderComplete }
}

