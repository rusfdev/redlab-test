const endEvent = new CustomEvent('preloaderComplete')

window.addEventListener('load', () => {
  setTimeout(() => {
    window.dispatchEvent(endEvent)
  }, 500)
})
