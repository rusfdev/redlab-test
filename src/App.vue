<template>
  <div class="app-wrapper">
    <router-view />
  </div>
</template>

<script setup>
import { gsap, sDur } from 'src/assets/js/animation'
import { usePreloader } from 'src/composables/preloader'

const { onPreloaderComplete } = usePreloader()

function showApp() {
  const $wrapper = document.querySelector('#q-app')

  gsap.to($wrapper, { autoAlpha: 1, duration: sDur[3],
    onComplete: () => {
      gsap.set($wrapper, { clearProps: 'all' })
    }
  })

  document.body.style.overflow = 'auto'
}

onPreloaderComplete(() => {
  showApp()
})
</script>

<style lang="scss" scoped>
.app-wrapper {
  width: 100%;
}
</style>
