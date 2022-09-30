<template>
  <header :class="['header', { 'header--fixed': y > 0, 'header--hidden': isFullScreen }]">
    <app-container class="header__container">
      <div class="header__left-side">
        <app-logo class="header__logo" />

        <div class="header-toggle header__toggle">
          <button class="header-toggle__button header-toggle__button--active">Дом</button>
          <button class="header-toggle__button">Офис</button>
        </div>
      </div>

      <nav class="header-nav header__nav">
        <li v-for="(item, index) in nav" :key="index" class="header-nav__item">
          <a class="header-nav__link link" href="#">{{ item }}</a>
        </li>
      </nav>

      <div class="header__right-side">
        <div class="header-contact header__contact">
          <a class="header-contact__phone link" href="tel:380674016977">+380 67 401 69 77</a>
          <span class="header-contact__time">24/7</span>
        </div>

        <button class="header-burger-button"></button>
      </div>
    </app-container>
    <slot></slot>
  </header>
</template>


<script setup>
import { storeToRefs } from 'pinia'
import { useWindowScrollPosition } from 'src/composables/windowScrollPosition'
import { useStore } from 'src/stores/store'

const store = useStore()
const { isFullScreen } = storeToRefs(store)

const nav = [
  'После ремонта',
  'Генеральная уборка',
  'Регулярная уборка',
  'Мойка окон'
]

const { y } = useWindowScrollPosition()
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  transition-duration: var(--animation-duration-1);
  transition-timing-function: ease-in-out;
  transition-property: background-color, box-shadow, transform;

  &--fixed {
    transition-duration: var(--animation-duration-2);
    background-color: $light;
    box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.075);
  }

  &--hidden {
    transform: translateY(-100%);
  }

  &__container {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__left-side, &__right-side {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
  }
  &__logo {
    width: 92px;
    color: $dark;
    margin-right: 22px;
  }
  @media (max-width: $breakpoint-lg-max) {
    &__nav {
      display: none !important;
    }
  }
  @media (max-width: $breakpoint-xs-max) {
    &__toggle, &__contact {
      display: none !important;
    }
  }
}

.header-toggle {
  --h: 36px;
  --pa: 2px;
  --gap: 4px;
  display: flex;
  padding: var(--pa);
  gap: var(--gap);
  height: calc(var(--h) + 2px);
  background-color: $light;
  border-radius: calc(var(--h) / 2);
  border: 1px solid transparent;
  transition: border-color var(--trs-2);

  .header--fixed & {
    border-color: #E2E8F0;
  }

  &__button {
    --bh: calc(var(--h) - var(--pa) * 2);
    height: var(--bh);
    border-radius: calc(var(--bh) / 2);
    color: $secondary;
    font-size: 14px;
    font-weight: 600;
    padding: 0 12px;
    transition: color var(--trs-1), background-color var(--trs-1);
    &--active {
      background-color: $accent;
      color: $light;
      cursor: default;
    }
    body.desktop &:not(.header-toggle__button--active):hover {
      color: $dark;
    }
  }
}

.header-nav {
  display: flex;
  justify-content: center;
  gap: var(--md);
  font-size: 16px;
  font-weight: 500;
}

.header-contact {
  font-weight: 600;
  font-size: 16px;
  display: flex;
  transform: translateY(4%);
  &__phone {
    margin-right: var(--sm);
  }
  &__time {
    &::before {
      content: '|';
      display: inline-block;
      margin-right: var(--sm);
      transform: translateY(-8%);
    }
  }
}

.header-burger-button {
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: var(--md);
  transition: color var(--trs-1);
  border-radius: 50%;
  &::before, &::after {
    content: '';
    display: block;
    width: 20px;
    height: 2px;
    border-radius: 1px;
    background-color: currentColor;
  }
  &::before {
    margin-bottom: 6px;
  }
  body.desktop &:hover {
    color: $accent;
  }
}
</style>
