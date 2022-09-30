<template>
  <button class="app-tooltip-dot">
    <span class="app-tooltip-dot__pulse"></span>
    <span class="app-tooltip-dot__inner"></span>
    <app-tooltip>{{ text }}</app-tooltip>
  </button>
</template>

<script>
export default {
  name: 'AppTooltipDot'
}
</script>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss">
//$
.app-tooltip-dot {
  --app-tooltip-dot-size: 30px;
  width: var(--app-tooltip-dot-size);
  height: var(--app-tooltip-dot-size);
  border-radius: 50%;
  transition: transform var(--trs-1);
  position: relative;
  &__inner {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    top: 0;
    left: 0;
    background-color: $accent;
    color: $light;
    &::before, &:after {
      content: '';
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: currentColor;
    }
    &::before {
      width: 2px;
      height: 12px;
    }
    &:after {
      width: 12px;
      height: 2px;
    }
  }
  &__pulse {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    transition: opacity var(--trs-1);
    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      position: absolute;
      background-color: $accent;
      animation: pulse 1.5s linear infinite;
      border-radius: 50%;
    }
  }

  body.desktop &:hover {
    transform: rotate(-45deg);
    .app-tooltip-dot__pulse {
      opacity: 0;
      &::before {
        animation-play-state: paused;
      }
    }
  }

}

@keyframes pulse {
	from {
		opacity: 0.9;
		transform: scale(1);
	}
	to {
		opacity: 0;
		transform: scale(2);
	}
}
</style>
