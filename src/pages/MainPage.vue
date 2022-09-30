<template>
  <main-section />
  <features-section />
  <about-section />

  <app-section class="last-section">
    <app-container class="last-section__container">
      <h3 class="text-center">The End</h3>
    </app-container>
  </app-section>

</template>

<script setup>
import MainSection from 'src/components/sections/MainSection.vue'
import FeaturesSection from 'src/components/sections/FeaturesSection.vue'
import AboutSection from 'src/components/sections/AboutSection.vue'
</script>

<style lang="scss" scoped>
.last-section {
  padding: 0 !important;
  &__container {
    height: var(--app-screen-height);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
