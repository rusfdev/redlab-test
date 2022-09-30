<template>
  <div class="cleaning-preview" :style="styles">

    <div class="cleaning-preview-head">
      <div class="cleaning-preview-head__outer">
        <div class="cleaning-preview-head__inner">
          <app-container class="cleaning-preview-head__container">
            <button
              v-for="(category, index) in categories"
              :key="index"
              :class="[
                'cleaning-preview-tab-button',
                { 'cleaning-preview-tab-button--active': activeIndex === index }
              ]"
              @click="onChange(index)"
            >
              <span>{{ category.name }}</span>
            </button>
          </app-container>
        </div>
      </div>
    </div>

    <q-responsive :ratio="$q.screen.gt.xs ? RATIO : 1.2">

      <div class="cleaning-preview-slider">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="cleaning-preview-slide"
          ref="slidesRef"
        >
          <div class="cleaning-preview-slide__inner">
            <div class="cleaning-preview-slide__image">
              <img :src="category.image" alt="image">

              <app-tooltip-dot
                v-for="(tooltip, index) in category.tooltips"
                :key="index"
                :text="tooltip.text"
                class="cleaning-preview-tooltip-dot"
                :style="{
                  '--top': `${tooltip.pos.top}%`,
                  '--left': `${tooltip.pos.left}%`
                }"
              />
            </div>
          </div>
        </div>

        <q-resize-observer debounce="0" @resize="onResize" />
      </div>

    </q-responsive>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useScale } from 'src/composables/scale'
import { gsap, sDur, msDur } from 'src/assets/js/animation'

const props = defineProps({
  categories: {
    type: Object,
    required: true
  }
})

const RATIO = 1.5

const { width, height, onResize } = useScale(RATIO)

const styles = computed(() => {
  return {
  '--image-width': `${width.value}px`,
  '--image-height': `${height.value}px`
  }
})

const slidesRef = ref([])
const activeIndex = ref(0)
const animationInProgress = ref(false)

function onChange(index) {
  if (animationInProgress.value || index === activeIndex.value) return
  animationInProgress.value = true

  const $slide = slidesRef.value[index]
  const $slideOld = slidesRef.value[activeIndex.value]
  const $inner = $slide.querySelector('.cleaning-preview-slide__inner')

  hideTooltipsOfSlide($slideOld)
  $slideOld.style.zIndex = 0
  $slide.style.zIndex = 1

  const animation = gsap.timeline()
    .set($slide, { autoAlpha: 1 })
    .fromTo($slide,
      { xPercent: 100 },
      { xPercent: 0, ease: 'power4.out' })
    .fromTo($inner,
      { xPercent: -100, scale: 1.25 },
      { xPercent: 0, scale: 1, ease: 'power4.out' }, '<'
    )

  setTimeout(() => {
    showTooltipsOfSlide($slide)
  }, msDur[3])

  animation.eventCallback('onComplete', function() {
    hideInactiveSlides()
    animation.kill()
    animationInProgress.value = false
  })

  activeIndex.value = index
}

function hideInactiveSlides() {
  slidesRef.value.forEach(($slide, index) => {
    if (index !== activeIndex.value) {
      gsap.set($slide, { autoAlpha: 0 })
      gsap.set($slide, { css: { zIndex: 0 } })
    }
  })
}

function showTooltipsOfSlide($slide = slidesRef.value?.[activeIndex.value]) {
  if ($slide.tooltipsAnimation) {
    $slide.tooltipsAnimation.play()
    return
  }

  const $tooltips = $slide.querySelectorAll('.cleaning-preview-tooltip-dot')

  $slide.tooltipsAnimation = gsap.timeline()
    .fromTo($tooltips,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: sDur[3], stagger: { each: 0.05, from: 'random' } })
}

function hideTooltipsOfSlide($slide) {
  if (!$slide.tooltipsAnimation) return
  $slide.tooltipsAnimation.reverse()
}

onMounted(() => {
  hideInactiveSlides()
  showTooltipsOfSlide()
})
</script>

<style lang="scss" scoped>
.cleaning-preview-slider {
  overflow: hidden;
  position: relative;
}

.cleaning-preview-head {
  margin-bottom: var(--lg);
  display: flex;
  overflow: hidden;
  &__outer {
    min-width: 100%;
    display: flex;
    overflow-x: scroll;
    padding-bottom: 20px;
    margin-bottom: calc((20px + var(--app-scrollbar-width)) * -1);
  }
  &__inner {
    min-width: 100%;
    display: flex;
    flex: 0 0 auto;
  }
  &__container {
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    gap: var(--sm);
  }
  @media (max-width: $breakpoint-xs-max) {
    margin-bottom: var(--md);
  }
}

.cleaning-preview-tab-button {
  display: block;
  border-radius: 8px;
  padding: 8px 16px;
  border: 1px solid $light-grey;
  font-weight: 500;
  color: $secondary;
  transition: color var(--trs-1), border-color var(--trs-1), background-color var(--trs-1);
  &--active {
    background-color: $accent;
    border-color: $accent;
    color: $light;
    cursor: default;
  }
}

.cleaning-preview-slide {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  &__inner {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  &__image {
    position: absolute;
    width: var(--image-width, 100%);
    height: var(--image-height, 100%);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: relative;
    }
  }
}

.cleaning-preview-tooltip-dot {
  opacity: 0;
  visibility: hidden;
  position: absolute !important;
  top: calc(var(--top) - var(--app-tooltip-dot-size) / 2);
  left: calc(var(--left) - var(--app-tooltip-dot-size) / 2);
  z-index: 2;
}
</style>
