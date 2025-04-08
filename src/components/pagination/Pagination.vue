<script setup>
import { computed } from 'vue'
import { range } from '../../services/utils.js'

const props = defineProps({
  limit: {
    type: Number,
    required: false,
    default: 10
  },
  size: {
    type: Number,
    required: false,
    default: 5
  },
  offset: {
    type: Number,
    required: false,
    default: 0
  },
  total: {
    type: Number,
    required: true,
    default: 0
  },
  boundary_numbers: {
    type: Boolean,
    required: false,
    default: false
  },
  fast_forward: {
    type: Boolean,
    required: false,
    default: true
  },
  fast_backward: {
    type: Boolean,
    required: false,
    default: true
  },
  fast_first: {
    type: Boolean,
    required: false,
    default: true
  },
  fast_last: {
    type: Boolean,
    required: false,
    default: true
  }
})

const current_page = computed(
  () => Math.floor(props.offset / props.limit) + 1
)

const upper_bound = computed(
  () => Math.min(current_page.value + Math.ceil(props.size), total_pages.value)
)

const lower_bound = computed(
  () => Math.max(current_page.value - Math.ceil(props.size), 1)
)

const page_fast_forward = computed(
  () => Math.min(upper_bound.value, current_page.value + props.size)
)

const page_fast_backward = computed(
  () => Math.max(lower_bound.value, current_page.value - props.size)
)

const page_range = computed(
  () => range(lower_bound.value, upper_bound.value + 1, 1)
)

const total_pages = computed(
  () => Math.ceil(props.total / props.limit)
)

const emit = defineEmits(['goto-page'])

defineOptions({
  inheritAttrs: false
})

</script>

<template>
  <nav aria-label="Page navigation">
    <ol v-bind="$attrs" class="flex">
      <li v-if="fast_first">
        <a @click="$emit('goto-page', 1)" href="#">
          <font-awesome-icon icon="fa-solid fa-backward-step" />
        </a>
      </li>
      <li v-if="fast_backward">
        <a @click="$emit('goto-page', page_fast_backward)">
          <font-awesome-icon icon="fa-solid fa-backward" />
        </a>
      </li>
      <li v-if="boundary_numbers">
        <a @click="$emit('goto-page', 1)" href="#">1</a>
        <span>...</span>
      </li>
      <template v-for="page in page_range">
        <li class="px-1" :class="[page == current_page ? 'font-bold rounded-full px-4 flex bg-slate-800 text-slate-100': 'hover:animate-ping ']">
          <a @click="$emit('goto-page', page)" href="#">{{ page }}</a>
        </li>
      </template>
      <li v-if="boundary_numbers">
        <span>...</span>
        <a @click="$emit('goto-page', total_pages)" href="#">{{ total_pages }}</a>
      </li>
      <li v-if="fast_forward">
        <a @click="$emit('goto-page', page_fast_forward)">
          <font-awesome-icon icon="fa-solid fa-forward" />
        </a>
      </li>
      <li v-if="fast_last">
        <a @click="$emit('goto-page', total_pages)" href="#">
          <font-awesome-icon icon="fa-solid fa-forward-step" />
        </a>
      </li>
    </ol>
  </nav>
</template>
