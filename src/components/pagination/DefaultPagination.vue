<template>
  <div v-if="pages.length > 0">
    <nav class="isolate gap-2 inline-flex rounded-md shadow p-2" aria-label="Pagination">
      <a class="px-2" @click.prevent="change_page(1)" href="">
        <font-awesome-icon :icon="['fas', 'angles-left']" class="h-4 w-4" />
      </a>
      <a class="px-2" @click.prevent="change_page(page)" href="" v-for="page in pages">
        <span class="font-bold" v-if="page == page_current">{{ page }}</span>
        <span v-else>{{ page }}</span>
      </a>
      <a class="px-2" @click.prevent="change_page(page_total)" href="">
        <font-awesome-icon :icon="['fas', 'angles-right']" class="h-4 w-4" />
      </a>
    </nav>
  </div>
</template>

<script setup>

import { computed } from 'vue'

const emit = defineEmits(['change'])

const change_page = (p) => {
  emit('change', {
    page: p,
    offset: (p-1) * (props.limit)
  })
}

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
    default: 9
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
  let stop = Math.min(props.max_pages, page_total.value)

  if (page_current.value > parseInt(stop / 2)) {
    start = page_current.value - parseInt(props.max_pages / 2)
    stop = start + props.max_pages - 1

    if (stop > page_total.value) {
      stop = page_total.value
    }
  }

  if (start <= 0) {
    start = 1
  }

  return range(start, stop, 1)

})

</script>
