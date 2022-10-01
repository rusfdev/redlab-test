<template>
  <app-section class="main-section" ref="parentEl">
    <app-container class="main-section__container">
      <div class="main-section__image">
        <div class="main-section__image-wrapper">
          <div class="main-section__image-inner">
            <img
              class="main-section__image-element"
              srcset="img/home.jpg, img/home@2x.jpg 2x"
              src="img/home.jpg"
              alt="image"
            >
          </div>
        </div>
      </div>
      <div class="main-section__content">
        <div class="main-section__text-content">
          <h1 class="text-hero-title">
            <span v-for="(line, index) of ['Уборка', 'квартир', 'в Киеве']" :key="index" class="block overflow-hidden">
              <span class="text-hero-title__line block">{{ line }}</span>
            </span>
          </h1>
          <div class="overflow-hidden">
            <p class="main-section__description">Мы уберем у вас дома или в офисе. <br> Наведем чистоту после ремонта и&nbsp;проведем генеральную уборку.</p>
          </div>
        </div>
      </div>
    </app-container>
  </app-section>
</template>

<script setup>
import { onUnmounted, ref } from 'vue'
import { gsap } from 'src/assets/js/animation'
import { usePreloader } from 'src/composables/preloader'

const { onPreloaderComplete } = usePreloader()

const parentEl = ref(null)

const animations = {
  show: null
}

function playShowAnimation() {
  const $imageInner = parentEl.value.$el.querySelector('.main-section__image-inner')
  const $imageElement = parentEl.value.$el.querySelector('.main-section__image-element')
  const $textElements = parentEl.value.$el.querySelectorAll('.text-hero-title__line, .main-section__description')

  animations.show = gsap.timeline()
    .fromTo($imageInner, { xPercent: -100 }, { xPercent: 0, duration: 1 }, '+=0.25')
    .fromTo($imageElement, { xPercent: 100 }, { xPercent: 0, duration: 1 }, '<')
    .fromTo($imageElement, { scale: 1.5 }, { scale: 1, duration: 2, ease: 'power2.out' }, '<')
    .fromTo($textElements,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.75, ease: 'power2.out', stagger: { amount: 0.25 } }, '<+=1'
    )
}

function killAnimations() {
  for (const animation of Object.values(animations)) {
    if (animation) animation.kill()
  }
}

onPreloaderComplete(() => {
  playShowAnimation()
})

onUnmounted(() => {
  killAnimations()
})
</script>

<style lang="scss" scoped>
.main-section {
  padding: 0px !important;

  &__container {
    min-height: var(--app-screen-height);
    display: flex;
  }
  &__image {
    width: 50%;
    position: relative;
  }
  &__image-wrapper {
    position: absolute;
    height: 100%;
    right: 0;
    width: 50vw;
  }
  &__image-inner {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
  }
  &__image-element {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
  }
  &__content {
    --pt: var(--main-layout-header-height);
    --pb: var(--main-layout-header-height);
    --ps: 150px;
    --pe: 100px;
    width: 50%;
    padding: var(--pt) var(--pe) var(--pb) var(--ps);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__text-content {
    padding-top: 10px;
  }
  @media (max-width: $breakpoint-lg-max) {
    &__content {
      --ps: 120px;
    }
  }
  @media (max-width: $breakpoint-md-max) {
    &__content {
      --pe: 0px;
      --ps: 100px;
    }
  }
  @media (max-width: $breakpoint-sm-max) {
    &__content {
      --ps: 40px;
    }
  }
  @media (max-width: $breakpoint-xs-max) {
    &__container {
      flex-direction: column;
    }
    &__image-wrapper {
      width: var(--app-page-width);
      right: 50%;
      transform: translateX(50%);
    }
    &__content {
      width: 100%;
      --ps: 0px;
      --pb: var(--md);
    }
    &__text-content {
      padding-top: var(--md);
    }
    &__image {
      width: 100%;
      order: 2;
      flex: 1 1 auto;
    }
  }
}
</style>
