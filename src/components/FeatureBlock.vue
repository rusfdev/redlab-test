<template>
  <div class="feature-block">
    <div class="feature-block__content">
      <div class="feature-block__content-inner">
        <p class="text-body2">{{ feature.description }}</p>
      </div>
    </div>
    <div class="feature-block__front">
      <h4 class="feature-block__title">{{ feature.title }}</h4>
      <img
        class="feature-block__image"
        :srcset="feature.images.join(', ')"
        :src="feature.images[0]"
        alt="image"
      >
    </div>
  </div>
</template>


<script setup>
const props = defineProps({
  feature: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.feature-block {
  border-radius: 8px;
  min-height: 320px;
  position: relative;
  &__content {
    padding: 30px;
    background-color: $accent;
    color: $light;
    border-radius: inherit;
    min-height: 100%;
    position: relative;
    transition: opacity var(--trs-2), visibility var(--trs-2);
    opacity: 0;
    visibility: hidden;
  }
  &__content-inner {
    transition: transform var(--animation-duration-2) ease-out;
    transform: translateY(20px);
  }
  &__front {
    padding: 20px 14px;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 2;
    background-color: $light-grey;
    color: $dark;
    border-radius: inherit;
    transition: opacity var(--trs-1);
  }
  &__title {
    text-align: center;
    position: relative;
    z-index: 2;
    transition: transform var(--animation-duration-1) ease-out;
  }
  &__image {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
    max-height: 180px;
    transform-origin: bottom;
    transition: transform var(--animation-duration-1) ease-out;
    object-fit: contain;
    object-position: center bottom;
  }

  &:hover {
    background-color: $accent;
    .feature-block__content {
      opacity: 1;
      visibility: visible;
    }
    .feature-block__content-inner {
      transform: translateY(0);
    }
    .feature-block__front {
      opacity: 0;
    }
    .feature-block__image {
      transform: scale(0.9);
    }
    .feature-block__title {
      transform: translateY(-20px);
    }
  }

  @media (max-width: $breakpoint-md-max) {
    &__content {
      padding: var(--md) var(--sm);
    }
  }
  @media (max-width: $breakpoint-sm-max) {
    min-height: 280px;
  }
  @media (max-width: $breakpoint-xs-max) {
    min-height: 200px;
    &__image {
      max-height: 120px;
    }
    &__front {
      padding: var(--md) var(--sm);
    }
  }
}
</style>
