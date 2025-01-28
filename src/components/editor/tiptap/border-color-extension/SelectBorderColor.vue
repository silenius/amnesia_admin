<template>
  <div>
    <button @click.prevent="open=!open" class="font-bold border rounded-full p-2 w-full">
      {{ borderColor !== undefined ? borderColor : 'none' }}
    </button> 
    <SelectColor 
      @select-color="doSelectColor" 
      @close="open=false"
      :open="open"
      class="z-20 relative"
    />
  </div>

</template>

<script setup>
import { ref, computed } from 'vue'
import SelectColor from '@/components/editor/tiptap/colors/SelectColor.vue'
import { getSelectedAttrs } from '@/components/editor/tiptap/utils'

const props = defineProps({
  breakpoint: String,
  extension: Object,
  editor: Object,
  selected: Object
})

const emits = defineEmits(['select-border-color'])
const open = ref(false)

const borderColor = computed({
  get() {
    // FIXME
    try {
      return getSelectedAttrs(props, 'borderColor')
    } catch(e) {
      return 'none'
    }
  },

  set({color, shade}) {
    return emits('select-border-color', {
      color: color,
      shade: shade,
      breakpoint: props.breakpoint
    })

  }
})

const doSelectColor = (color, shade) => borderColor.value = {
  color: color, 
  shade: shade, 
}

</script>
