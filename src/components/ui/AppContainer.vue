<template>
  <div class="app-container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AppContainer'
}
</script>

<script setup>

</script>

<style lang="scss" scoped>
.app-container {
  --app-container-px: 20px;
  --app-container-xl-max: calc(1320px + var(--app-container-px) * 2);
  --app-container-lg-max: 1200px;
  --app-container-md-max: 992px;
  --app-container-sm-max: 720px;
  --app-container-xs-max: 480px;
  --app-container-width: var(--app-container-xl-max);
  --app-container-inner-width: calc(var(--app-container-width) - var(--app-container-px) * 2);

  width: 100%;
  max-width: var(--app-container-width);
  margin-right: auto;
  margin-left: auto;
  padding-left: var(--app-container-px);
  padding-right: var(--app-container-px);

  @media (max-width: $breakpoint-lg-max) {
    --app-container-width: var(--app-container-lg-max);
  }

  @media (max-width: $breakpoint-md-max) {
    --app-container-width: var(--app-container-md-max);
  }

  @media (max-width: $breakpoint-sm-max) {
    --app-container-px: var(--sm);
    --app-container-width: var(--app-container-sm-max);
  }

  @media (max-width: $breakpoint-xs-max) {
    --app-container-width: var(--app-container-xs-max);
  }
}
</style>
