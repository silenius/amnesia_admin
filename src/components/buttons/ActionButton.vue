<script setup>

import { ref, computed } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: 'slate',
    required: true
  },
  label: {
    type: String,
    default: 'enter'
  }
})

const classObj = ref({
    [`bg-${props.color}-200`]: true,
    [`text-${props.color}-600`]: true,
    [`hover:text-${props.color}-700`]: true,
    [`hover:bg-${props.color}-300`]: true
  }
)

</script>

<template>
  <button class="w-full p-1 rounded" :class="classObj">
    {{ label }}
  </button>
</template>
