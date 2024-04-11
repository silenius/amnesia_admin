<template>
  <div class="relative">
    <button @click.prevent="open=!open" :class="[`bg-${textColor}`,
      'font-bold rounded-full p-2']">
      {{ textColor }}
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

const props = defineProps({
  breakpoint: String,
  extension: Object,
  transaction: Object,
  editor: Object
})

const emits = defineEmits(['select-text-color'])
const open = ref(false)

const textColor = computed({
  get() {
    const v = props.editor.getAttributes('textClass')?.textColor?.find(
      (x) => x.breakpoint == props.breakpoint
    )
    return v !== undefined ? `${v.color}${v.shade ? `-${v.shade}` : ''}` : ''
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
