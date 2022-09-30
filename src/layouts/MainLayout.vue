<template>
  <div
    class="main-layout"
    :style="{ '--main-layout-header-height': `${headerHeight}px` }"
  >
    <the-header class="main-layout__header">
      <q-resize-observer @resize="size => headerHeight = size.height" />
    </the-header>

    <main class="main-layout__content">
      <router-view />
    </main>

    <the-action-button class="main-layout__action-button" />
  </div>
</template>

<script setup>
import TheHeader from 'components/TheHeader.vue'
import TheActionButton from 'components/TheActionButton.vue'
import { ref } from 'vue'

const headerHeight = ref(0)
</script>

<style lang="scss" scoped>
.main-layout {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  &__header {
    z-index: 2;
  }
  &__content {
    position: relative;
    z-index: 1;
    flex: 1 1 auto;
  }
  &__action-button {
    z-index: 3;
  }
}
</style>
