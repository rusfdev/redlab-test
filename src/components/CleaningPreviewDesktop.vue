<template>
  <div class="cleaning-preview" :style="styles">

    <app-container class="cleaning-preview-image-container">
      <div class="cleaning-preview-image" ref="imageRef">
        <q-responsive ratio="1.75" />
      </div>
    </app-container>

    <div class="cleaning-preview-content">

      <div class="cleaning-preview-nav" ref="navRef">
        <h6 class="cleaning-preview-nav__head">Как мы убираем</h6>

        <ul class="cleaning-preview-nav__list">
          <li v-for="(category, index) in categories" :key="index" ref="navItemsRef" class="cleaning-preview-nav__item">
            <button
              :class="[
                'cleaning-preview-nav__button',
                { 'cleaning-preview-nav__button--active': activeIndex === index },
                { 'cleaning-preview-nav__button--progress': animationInProgress }
              ]"
              @click="onChange(index)"
            >
              <span>{{ category.name }}</span>
            </button>
          </li>
        </ul>
      </div>

      <div class="cleaning-preview-slider-wrapper" ref="sliderWrapperRef">

        <div
          :class="[
            'cleaning-preview-slider',
            { 'cleaning-preview-slider--progress': animationInProgress }
          ]"
          ref="sliderRef"
        >

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

      </div>
    </div>

  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useScale } from 'src/composables/scale'
import { gsap, ScrollTrigger, sDur, msDur } from 'src/assets/js/animation'
import { debounce } from 'quasar'
import { useStore } from 'src/stores/store'

const props = defineProps({
  categories: {
    type: Object,
    required: true
  }
})

const RATIO = 1.5

const store = useStore()
const { width, height, onResize } = useScale(RATIO)

const styles = computed(() => {
  return {
  '--image-width': `${width.value}px`,
  '--image-height': `${height.value}px`
  }
})

const imageRef = ref(null)
const navRef = ref(null)
const navItemsRef = ref(null)
const sliderWrapperRef = ref(null)
const sliderRef = ref(null)
const slidesRef = ref([])
const activeIndex = ref(0)
const animationInProgress = ref(false)
const progress = ref(0)
const isMounted = ref(false)

const isReady = computed(() => {
  return progress.value >= 0.25 && progress.value <= 0.75
})

let scrollAnimation
let scrollTrigger

function onChange(index) {
  if (animationInProgress.value || index === activeIndex.value || !isReady.value) return
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
    if (isReady.value) showTooltipsOfSlide($slide)
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

function createScrollAnimation() {
  if (!isMounted.value) return

  const $image = imageRef.value
  const $wrapper = sliderWrapperRef.value
  const $slider = sliderRef.value
  const $nav = navRef.value
  const $navItems = navItemsRef.value
  const imageRect = $image.getBoundingClientRect()
  const wrapperRect = $wrapper.getBoundingClientRect()
  const navRect = $nav.getBoundingClientRect()


  const iw = imageRect.width
  const ih = imageRect.height
  const ww = wrapperRect.width
  const wh = wrapperRect.height
  const tx = imageRect.left - wrapperRect.left
  const ty = wh - ih
  const ntx = Math.min(imageRect.left - navRect.width, -100)


  scrollAnimation = gsap.timeline({
    paused: true,
    defaults: {
      ease: 'power1.inOut'
    }
  })
    .fromTo($slider,
      { css: { width: iw, height: ih, borderRadius: 8 } },
      { css: { width: ww, height: wh, borderRadius: 0 } }
    )
    .fromTo($slider, { x: tx }, { x: 0 }, '<')
    .fromTo($nav, { x: ntx, autoAlpha: 0 }, { x: 0, autoAlpha: 1 }, '<')
    .fromTo($navItems,
      { xPercent: -25, autoAlpha: 0 },
      { xPercent: 0, autoAlpha: 1, duration: sDur[4] * 0.7, stagger: { amount: sDur[4] * 0.3 } }, '<'
    )
    .to($slider, { css: { width: iw, height: ih, borderRadius: 8 } })
    .to($slider, { x: tx, y: ty }, '<')
    .to($nav, { x: ntx, autoAlpha: 0 }, '<')


  scrollAnimation.progress(progress.value)
}

function createScrollTrigger() {
  const $wrapper = sliderWrapperRef.value

  scrollTrigger = ScrollTrigger.create({
    trigger: $wrapper,
    start: 'top+=25% bottom',
    end: 'bottom-=25% top',
    pin: false,
    snap: {
      snapTo: [0.5],
      duration: sDur[4],
      delay: 0.1,
      ease: 'power1.inOut'
    },
    onUpdate: self => {
      progress.value = self.progress
      scrollAnimation.progress(progress.value)
    }
  })
}

function showTooltipsOfSlide($slide) {
  if ($slide.tooltipsAnimation) {
    $slide.tooltipsAnimation.timeScale(1).play()
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
  $slide.tooltipsAnimation.timeScale(2).reverse()
}

watch(isReady, (value) => {
  const $slide = slidesRef.value[activeIndex.value]

  if (value) {
    store.setFullScreen()
    showTooltipsOfSlide($slide)
  } else {
    store.resetFullScreen()
    hideTooltipsOfSlide($slide)
  }
})

const onResizeDebounce = debounce(createScrollAnimation, 100)

onMounted(() => {
  isMounted.value = true

  createScrollAnimation()
  createScrollTrigger()
  hideInactiveSlides()
  window.addEventListener('resize', onResizeDebounce)
})

onUnmounted(() => {
  isMounted.value = false

  window.removeEventListener('resize', onResizeDebounce)

  if (scrollTrigger) scrollTrigger.kill()

  if (isReady.value) store.resetFullScreen()
})
</script>

<style lang="scss" scoped>
.cleaning-preview-image-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.cleaning-preview-image {
  grid-column: 2 / 12;
  /* background-color: rgba(255, 0, 0, 0.5); */
  @media (max-width: $breakpoint-lg-max) {
    grid-column: 1 / 13;
  }
}

.cleaning-preview-content {
  position: relative;
  z-index: 2;
  height: 100vh;
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 380px 1fr;
  /* &::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    background-color: rgba(0, 255, 255, 0.5);
  } */
}

.cleaning-preview-nav {
  background-color: $accent;
  color: $light;
  padding: 35px 0px 35px 60px;
  display: flex;
  flex-direction: column;
  &__head {
    flex: 0 0 auto;
    margin: 0;
  }
  &__list {
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1 1 auto;
  }
  &__item {
    &:not(:last-child) {
      margin-bottom: 22px;
    }
  }
  &__button {
    width: 100%;
    position: relative;
    display: flex;
    text-align: left;
    font-size: var(--t-h2);
    font-weight: 400;
    line-height: 1.2;
    opacity: 0.7;
    transition: opacity var(--trs-2);
    overflow: hidden;
    pointer-events: none;
    &::before {
      content: '→';
      display: block;
      position: absolute;
      bottom: 0.05em;
      right: calc(100% + 0.25em);
      will-change: transform;
      transition: transform var(--trs-2);
    }
    span {
      display: block;
      pointer-events: all;
      will-change: transform;
      transition: transform var(--trs-2);
    }

    &:hover:not(.cleaning-preview-nav__button--active) {
      opacity: 1;
      span {
        transform: translateX(0.1em) skewX(-6deg);
      }
    }

    &--progress {
      cursor: progress;
    }

    &--active {
      cursor: default;
      opacity: 1;
      span {
        transform: translateX(1.25em) skewX(-12deg);
      }
      &::before {
        transform: translateX(1.25em);
      }
    }
  }
}

.cleaning-preview-slider-wrapper {
  position: relative;
}

.cleaning-preview-slider {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  &--progress {
    cursor: progress;
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
