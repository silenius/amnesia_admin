<template>
  <div v-if="pages.length > 0">
    <nav class="isolate gap-2 inline-flex rounded-md shadow p-2" aria-label="Pagination">
      <a class="px-2" @click.prevent="$emit('goto-page', page)" href="" v-for="page in pages">
        <span class="font-bold" v-if="page == page_current">{{ page }}</span>
        <span v-else>{{ page }}</span>
      </a>
    </nav>
  </div>
</template>


<script setup>

import { ref, watch, computed } from 'vue'

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
  },
  max_pages: {
    type: Number,
    default: 8
  }

})

const page_total = computed( () => Math.ceil(props.total / props.limit ))
const page_current = computed( () => (props.offset / props.limit) + 1)

const range = (start, stop, step) => Array.from({ 
    length: (stop - start) / step + 1 
  },
    (value, index) => start + index * step
  )

const pages = computed( () => {
  if (page_total.value <= 1) {
    return []
  } 

  let start = 1
  let stop = start + props.max_pages

  if (page_current.value > parseInt(stop / 2)) {
    start = page_current.value - parseInt(props.max_pages / 2)
    stop = start + props.max_pages 

    if (stop > page_total.value) {
      stop = page_total.value
      start = stop - props.max_pages
    }
  }

  return range(start, stop, 1)

})


</script>
