<template>
  <div class="flex w-full rounded-full border-slate-500 p-1 border gap-1 justify-center">
    <button @click="change_breakpoint(bp)" class="p-2" :class="[bp == selected
      ? 'bg-slate-100 text-slate-700 rounded-full' : '']" v-for="bp in breakpoints">{{ bp }}</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  breakpoints: {
    type: Array,
    default: ['all', 'sm', 'md', 'lg', 'xl', '2xl']
  }
})

const emits = defineEmits(['select-breakpoint'])

const selected = ref(props.breakpoints[0])

const change_breakpoint = (value) => {
  selected.value = value
  emits('select-breakpoint', value !== 'all' ? value : null)
}
</script>
