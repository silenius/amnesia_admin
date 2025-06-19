<template>
  <div>
    <button @click.prevent="open=!open" class="font-bold border rounded-full p-2 w-full">
      {{ textColor !== undefined ? textColor : 'none'}}
    </button> 
    <SelectColor 
      @select-color="doSelectTextColor" 
      @close="open=false"
      :open="open"
      class="z-20 relative"
    />
  </div>

</template>

<script setup>
import { ref, computed } from 'vue'
import SelectColor from '@/components/editor/tiptap/colors/SelectColor.vue'
import { getTypeAttrs } from '@/components/editor/tiptap/utils'
import { props_extension } from '../utils';

const props = defineProps(props_extension)
const emits = defineEmits(['select-text-color'])
const open = ref(false)

const textColor = computed({
  get() {
    try {
      return getTypeAttrs(props, 'textColor')
    } catch (e) {
      return undefined
    }
  },

  set({color, variant}) {
    return emits('select-text-color', {
      color: color,
      variant: variant,
      breakpoint: props.breakpoint
    })
  }
})

const doSelectTextColor = (color, variant) => textColor.value = {
  color: color, 
  variant: variant, 
}

</script>
