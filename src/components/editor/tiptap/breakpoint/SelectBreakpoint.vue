<template>
  <div class="flex flex-col items-center">
    <span>Breakpoint</span>
    <div class="flex w-full rounded-full outline p-1 outline-1 outline-slate-500
      text-sm gap-1 justify-center">
      <button @click="change_breakpoint(bp)" class="p-1" :class="[bp == selected
        ? 'bg-slate-100 text-slate-700 rounded-full' : '']" v-for="bp in breakpoints">{{ bp }}</button>
    </div>
    <span class="text-xs">{{ txt_selected }}</span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  breakpoints: {
    type: Array,
    default: ['all', 'sm', 'md', 'lg', 'xl', '2xl']
  }
})

const emits = defineEmits(['select-breakpoint'])

const selected = ref(props.breakpoints[0])
const txt_selected = computed(() => {
  switch(selected.value) {
    case 'sm': return 'small: 640px'
    case 'md': return 'medium: 768px'
    case 'lg': return 'large: 1024px'
    case 'xl': return 'extra large: 1280px'
    case '2xl': return 'extra extra large: 1536px'
    default: return 'all screen sizes'
  }
})

const change_breakpoint = (value) => {
  selected.value = value
  emits('select-breakpoint', value !== 'all' ? value : null)
}

</script>
