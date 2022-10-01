<template>
  <div class="action-button-wrapper" ref="parentEl">

    <div class="action-button-outer" ref="outerEl">

      <div :class="['action-button-inner', { 'action-button-inner--hidden': isFullScreen }]">
        <button
          class="action-button"
          @mouseenter="onMouseenter"
          @mouseleave="onMouseleave"
          v-magnet="$q.platform.is.desktop"
        >
          <span class="action-button__inner">
            <span class="action-button__text">Заказать <br> уборку</span>
          </span>
        </button>
      </div>

    </div>

    <q-resize-observer @resize="onResize" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap, sDur } from 'src/assets/js/animation'
import { useStore } from 'src/stores/store'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { usePreloader } from 'src/composables/preloader'

const { onPreloaderComplete } = usePreloader()

const SLIDE_SCROLL_DISTANCE = 400
const SCALE = 0.75
const SLIDE_DISTANCE = 0.33

const $q = useQuasar()
const store = useStore()
const { isFullScreen } = storeToRefs(store)

const parentEl = ref(null)
const outerEl = ref(null)
const hover = ref(false)
const progress = ref(0)

const animations = {
  show: null,
  slide: null,
  leave: null,
  enter: null
}

function onResize(size) {
  createSlideAnimation(size)
}

function playShowAnimation() {
  const $el = parentEl.value
  const height = $el.getBoundingClientRect().height
  const scale = 0.1
  const slideDistance = height * scale * (0.5 / scale) + 20

  animations.show = gsap.timeline()
    .fromTo(parentEl.value,
      { scale, y: slideDistance, rotation: -45 },
      { scale: 1, y: 0, rotation: 0, ease: 'power2.out' }, `+=${sDur[4]}`
    )
    .fromTo(parentEl.value,
      { autoAlpha: 0 },
      { autoAlpha: 1, ease: 'power2.out', duration: sDur[2] }, '<'
    )
}

function createSlideAnimation(size) {
  const slideDistance = size.height * SCALE * (SLIDE_DISTANCE / SCALE) + 20

  if (animations.slide) animations.slide.kill()

  animations.slide = gsap.timeline({ paused: true })
    .to(outerEl.value, { scale: SCALE, y: slideDistance, ease: 'power1.inOut' })
}

function updateAnimation() {
  progress.value = Math.min(1, window.pageYOffset / SLIDE_SCROLL_DISTANCE)

  if (!animations.slide || hover.value) return

  animations.slide.progress(progress.value)
}

function onMouseenter() {
  if (!$q.platform.is.desktop) return

  hover.value = true

  if (animations.leave) animations.leave.pause()

  const enterAnimationProgress = { value: animations.slide?.progress() || 0 }

  animations.enter = gsap.to(enterAnimationProgress, { value: 0, duration: sDur[3], ease: 'power2.out',
    onUpdate: function() {
      if (animations.slide) animations.slide.progress(enterAnimationProgress.value)
    }
  })
}

function onMouseleave() {
  if (!$q.platform.is.desktop) return

  animations.enter.pause()

  const startProgress = animations.slide.progress() / progress.value
  const leaveAnimationProgress = { value: startProgress }

  animations.leave = gsap.to(leaveAnimationProgress, { value: 1, duration: sDur[3], ease: 'power2.out',
    onUpdate: function() {
      if (animations.slide) {
        const val = progress.value * leaveAnimationProgress.value
        animations.slide.progress(val)
      }
    },
    onComplete: function() {
      hover.value = false
    }
  })
}

function killAnimations() {
  for (const animation of Object.values(animations)) {
    if (animation) {
      animation.kill()
      animation = null
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateAnimation)
})

onUnmounted(() => {
  killAnimations()
  window.removeEventListener('scroll', updateAnimation)
})

onPreloaderComplete(() => {
  playShowAnimation()
})
</script>

<style lang="scss" scoped>
.action-button-wrapper {
  --size: 195px;
  position: fixed;
  bottom: 20px;
  left: calc(50% - var(--size) / 2);
  pointer-events: none;

  @media (max-width: $breakpoint-sm-max) {
    --size: 120px;
    bottom: var(--sm);
  }
  @media (max-width: $breakpoint-xs-max) {
    --size: 120px;
    bottom: var(--sm);
  }
}

.action-button-outer {
  pointer-events: none;
}

.action-button-inner {
  pointer-events: none;
  transition: opacity var(--trs-2), visibility var(--trs-2), transform var(--trs-2);
  &--hidden {
    opacity: 0;
    visibility: hidden;
    transform: scale(0) !important;
  }
}

.action-button {
  pointer-events: all;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  color: $light;
  font-weight: 600;
  text-transform: uppercase;

  &::before, &::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: inherit;
    transition: transform var(--trs-2);
  }

  &::before {
    background-color: $accent;
    transition: transform var(--trs-2);
  }

  &::after {
    border: 1px solid rgba($light, 0.5);
    opacity: 0;
    transition: transform var(--trs-2), opacity var(--trs-1);
    pointer-events: none;
  }

  &__inner {
    display: block;
    position: relative;
    z-index: 2;
    transform: translate3d(calc(var(--magnet-tx) * 0.33), calc(var(--magnet-ty) * 0.33), 0);
  }
  &__text {
    display: block;
    text-align: center;
    animation: 30s linear rotation infinite;
  }

  body.desktop &:hover {
    &::before {
      transform: scale(1.2);
    }
    &:after {
      transform: scale(1.75);
      opacity: 1;
    }
  }

  @media (max-width: $breakpoint-sm-max) {
    font-size: 14px;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
