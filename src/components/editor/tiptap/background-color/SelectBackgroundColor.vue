<template>
  <div class="relative w-full">
    <button @click.prevent="open=!open" :class="[`bg-${backgroundColor}`,
      'font-bold border rounded-full p-2 w-full']">
      {{ backgroundColor }}
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

const emits = defineEmits(['select-background-color'])
const open = ref(false)

const backgroundColor = computed({
  get() {
    const v = props.editor.getAttributes('textClass')?.backgroundColor?.find(
      (x) => x.breakpoint == props.breakpoint
    )
    return v !== undefined ? `${v.color}${v.shade ? `-${v.shade}` : ''}` :
      'none'
  },

  set({color, variant}) {
    return emits('select-background-color', {
      color: color,
      variant: variant,
      breakpoint: props.breakpoint
    })

  }
})

const doSelectTextColor = (color, variant) => backgroundColor.value = {
  color: color, 
  variant: variant, 
}

</script>
