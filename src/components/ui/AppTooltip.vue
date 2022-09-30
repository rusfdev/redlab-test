<template>
  <q-tooltip
    class="app-tooltip"
    :target="target"
    :anchor="anchor"
    :self="self"
    :offset="offset"
    transition-show="jump-up"
    transition-hide="jump-up"
  >
    <slot></slot>
  </q-tooltip>
</template>

<script>
export default {
  name: 'AppTooltip'
}
</script>

<script setup>
const props = defineProps({
  target: {
    type: [Boolean, String],
    default: true
  },
  anchor: {
    type: String,
    default: 'top middle'
  },
  self: {
    type: String,
    default: 'bottom middle'
  },
  offset: {
    type: Array,
    default() {
      return [10, 10]
    }
  }
})
</script>

<style lang="scss">
//$
.q-tooltip.app-tooltip {
  padding: 8px 10px;
  font-size: 14px;
  border-radius: 2px;
  color: $secondary;
  background-color: $light;
  font-weight: 500;
}
</style>
