<template>
  <div v-if="total">
    <nav class="isolate gap-2 inline-flex rounded-md shadow-sm" aria-label="Pagination">
      <a class="border px-2" @click.prevent="$emit('goto-page', page)" href="" v-for="page in Array(page_total).keys()">
        <span class="text-red-500" v-if="page == page_current">{{ page }}</span>
        <span v-else>{{ page }}</span>
      </a>
    </nav>
  </div>
</template>


<script setup>

import { ref, computed } from 'vue'

const emit = defineEmits(['goto-page'])

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
    type: Number,
    default: 0
  }
})

const page_total = computed( () => Math.ceil(props.total / props.limit ))
const page_current = computed( () => props.offset / props.limit + 1)
</script>
