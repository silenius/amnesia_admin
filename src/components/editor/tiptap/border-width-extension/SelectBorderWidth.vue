<template>


</template>

<script setup>
import { computed } from 'vue'
import { getSelectedAttrs } from '@/components/editor/tiptap/utils'

const props = defineProps({
  breakpoint: String,
  extension: Object,
  editor: Object,
  selected: Object
})

const emits = defineEmits(['select-border-width'])

const width = computed({

  get() { 
    try {
      return getSelectedAttrs(props, 'borderWidth')
    } catch (e) {
      return undefined
    }
  },
  
  set(value) { 
    return emits('select-border-width', {
      width: value, 
      breakpoint: props.breakpoint
    })
  }

})
</script>
