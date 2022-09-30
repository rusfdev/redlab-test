<template>
  <div :class="['app-wrapper', { 'app-wrapper--loaded': isLoaded }]">
    <router-view />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from 'src/stores/store'

const store = useStore()
const { isLoaded } = storeToRefs(store)

window.addEventListener('load', () => {
  setTimeout(() => isLoaded.value = true, 500)
})
</script>

<style lang="scss" scoped>
.app-wrapper {
  width: 100%;
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--trs-2), visibility var(--trs-2);
  &--loaded {
    opacity: 1;
    visibility: visible;
  }
}
</style>
