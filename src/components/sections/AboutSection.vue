<template>
  <app-section class="about-section">
    <app-container class="about-section__head">
      <h2 class="text-h1 about-section__head-title">Как мы убираем</h2>
      <p class="about-section__head-description">Клинер приезжает в назначенное время со всем необходимым и сразу приступает к делу. Вам остаётся только оценить результат.</p>
    </app-container>

    <cleaning-preview-desktop v-if="$q.platform.is.desktop && $q.screen.gt.md" :categories="categories" />
    <cleaning-preview-mobile v-else :categories="categories" />
  </app-section>
</template>

<script setup>
import CleaningPreviewDesktop from 'src/components/CleaningPreviewDesktop.vue'
import CleaningPreviewMobile from 'src/components/CleaningPreviewMobile.vue'

const categories = [
  {
    name: 'Кухня',
    image: 'img/cleaning/1.jpg',
    tooltips: [
      { text: 'Чистим фасад вытяжки', pos: { top: 36, left: 36 } },
      { text: 'Чистим фасад вытяжки', pos: { top: 60, left: 32 } },
      { text: 'Чистим фасад вытяжки', pos: { top: 62, left: 48.5 } },
      { text: 'Чистим фасад вытяжки', pos: { top: 51, left: 62 } },
      { text: 'Чистим фасад вытяжки', pos: { top: 92, left: 33 } },
      { text: 'Чистим фасад вытяжки', pos: { top: 75, left: 57 } },
      { text: 'Чистим фасад вытяжки', pos: { top: 65, left: 78 } }
    ]
  },
  {
    name: 'Ванная',
    image: 'img/cleaning/2.jpg',
    tooltips: [
      { text: 'Чистим фасад вытяжки', pos: { top: 34, left: 34 } },
      { text: 'Чистим фасад вытяжки', pos: { top: 51, left: 65 } },
      { text: 'Чистим фасад вытяжки', pos: { top: 90, left: 39 } },
      { text: 'Чистим фасад вытяжки', pos: { top: 89, left: 60 } },
      { text: 'Чистим фасад вытяжки', pos: { top: 82, left: 80 } },
    ]
  },
  {
    name: 'Кухня',
    image: 'img/cleaning/1.jpg',
    tooltips: [
      { text: 'Чистим фасад вытяжки', pos: { top: 36, left: 36 } },
      { text: 'Чистим фасад вытяжки', pos: { top: 60, left: 32 } },
      { text: 'Чистим фасад вытяжки', pos: { top: 62, left: 48.5 } },
      { text: 'Чистим фасад вытяжки', pos: { top: 51, left: 62 } },
      { text: 'Чистим фасад вытяжки', pos: { top: 92, left: 33 } },
      { text: 'Чистим фасад вытяжки', pos: { top: 75, left: 57 } },
      { text: 'Чистим фасад вытяжки', pos: { top: 65, left: 78 } }
    ]
  },
  {
    name: 'Ванная',
    image: 'img/cleaning/2.jpg',
    tooltips: [
      { text: 'Чистим фасад вытяжки', pos: { top: 34, left: 34 } },
      { text: 'Чистим фасад вытяжки', pos: { top: 51, left: 65 } },
      { text: 'Чистим фасад вытяжки', pos: { top: 90, left: 39 } },
      { text: 'Чистим фасад вытяжки', pos: { top: 89, left: 60 } },
      { text: 'Чистим фасад вытяжки', pos: { top: 82, left: 80 } },
    ]
  }
]
</script>

<style lang="scss" scoped>
.about-section {
  padding-bottom: 0 !important;
  &__head {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 0 20px;
    margin-bottom: var(--xl);
  }
  &__head-title {
    grid-column: 2 / 7;
  }
  &__head-description {
    grid-column: 8 / 12;
  }
  @media (min-width: $breakpoint-sm-min) {
    &__head-title {
      transform: translateY(-0.15em);
      margin-bottom: 0;
    }
  }
  @media (max-width: $breakpoint-lg-max) {
    &__head-title {
      grid-column: 1 / 7;
    }
    &__head-description {
      grid-column: 8 / 13;
    }
  }
  @media (max-width: $breakpoint-sm-max) {
    &__head-title {
      grid-column: 1 / 6;
    }
    &__head-description {
      grid-column: 6 / 13;
    }
  }
  @media (max-width: $breakpoint-xs-max) {
    &__head {
      margin-bottom: var(--lg);
    }
    &__head-title {
      grid-column: 1 / 13;
    }
    &__head-description {
      grid-column: 1 / 13;
    }
  }
}
</style>
