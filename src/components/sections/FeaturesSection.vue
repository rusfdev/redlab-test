<template>
  <app-section class="features-section">
    <app-container class="features-section__container">
      <feature-block
        v-for="(feature, index) in features"
        :key="index"
        class="features-section__block"
        :feature="feature"
        data-aos="fade-up"
        :data-aos-delay="$q.screen.gt.xs ? 50 * index : 0"
      />
    </app-container>
  </app-section>
</template>

<script setup>
import FeatureBlock from 'src/components/FeatureBlock.vue'

const features = [
  {
    title: 'Тщательно отобранный персонал',
    description: 'Не нужно тратить время, силы и ресурсы на разме- щение вакансий, проведе- ние собеседований, про- верку кандидатов на должность уборщицы. За счет больших объемов мы можем сделать это эффективнее.',
    images: [
      '/img/features/Feature01.png',
      '/img/features/Feature01@2x.png 2x'
    ]
  },
  {
    title: 'Качественная эко-химия',
    description: 'Не нужно тратить время, силы и ресурсы на разме- щение вакансий.',
    images: [
      '/img/features/Feature02.png',
      '/img/features/Feature02@2x.png 2x'
    ]
  },
  {
    title: 'Контролируем качество',
    description: 'Не нужно тратить время, силы и ресурсы на разме- щение вакансий, проведе- ние собеседований, про- верку кандидатов на должность уборщицы.',
    images: [
      '/img/features/Feature03.png',
      '/img/features/Feature03@2x.png 2x'
    ]
  },
  {
    title: 'Работаем круглосуточно',
    description: 'Проведе- ние собеседований, про- верку кандидатов на должность уборщицы. За счет больших объемов мы можем сделать это эффективнее.',
    images: [
      '/img/features/Feature04.png',
      '/img/features/Feature04@2x.png 2x'
    ]
  },
]
</script>

<style lang="scss" scoped>
.features-section {
  &__container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
  }
  @media (max-width: $breakpoint-lg-max) {
    &__container {
      gap: var(--lg);
    }
  }
  @media (max-width: $breakpoint-md-max) {
    &__container {
      gap: var(--md);
    }
  }
  @media (max-width: $breakpoint-sm-max) {
    &__container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: $breakpoint-xs-max) {
    &__container {
      gap: var(--sm);
      grid-template-columns: 1fr;
    }
  }
}
</style>
