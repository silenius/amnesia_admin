<template>
  <SelectBreakpoint @select-breakpoint="change_breakpoint" />
  <div class="flex">
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SelectBreakpoint from '../breakpoint/SelectBreakpoint.vue'

const props = defineProps({
  extension: Object,
  transaction: Object,
  editor: Object
})

const emits = defineEmits(['select-padding'])

const breakpoint = ref(null)

const change_breakpoint = (value) => {
  breakpoint.value = value
}
</script>
