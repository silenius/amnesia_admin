<template>
  <ul>
    <li v-for="(page, idx) in page_total">
      {{ idx }} {{ page }}
    </li>
  </ul>

</template>


<script setup>

import { ref, computed } from 'vue'

const props = defineProps({
  limit: {
    type: Number,
    default: 50
  },
  offset: {
    type: Number,
    default: 0
  },
  total: {
    type: Number
  }
})

const page_total = computed( () => Math.ceil(props.total / props.limit ))
const page_current = computed( () => props.offset / props.limit + 1)
</script>
