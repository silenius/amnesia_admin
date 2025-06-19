<template>
  <div>
    <button @click.prevent="open=!open" class="font-bold border rounded-full p-2 w-full">
      {{ backgroundColor !== undefined ? backgroundColor : 'none' }}
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
import { props_extension } from '../utils';

const props = defineProps(props_extension)
const emits = defineEmits(['select-background-color'])
const open = ref(false)

const backgroundColor = computed({
  get() {
    // FIXME
    try {
      return getSelectedAttrs(props, 'backgroundColor')
    } catch(e) {
      return 'none'
    }
  },

  set({color, shade}) {
    return emits('select-background-color', {
      color: color,
      shade: shade,
      breakpoint: props.breakpoint
    })

  }
})

const doSelectColor = (color, shade) => backgroundColor.value = {
  color: color, 
  shade: shade, 
}

</script>
