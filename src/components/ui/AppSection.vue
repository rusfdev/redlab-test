<template>
  <section class="app-section">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'AppSection'
}
</script>

<script setup>

</script>

<style lang="scss" scoped>
.app-section {
  --app-section-py: 70px;
  padding: var(--app-section-py) 0;
  @media (max-width: $breakpoint-xs-max) {
    --app-section-py: 40px;
  }
}
</style>
