<template>

  <Popover v-slot="{ close }" class="relative">
    <PopoverButton>
      <font-awesome-icon icon="fa-solid fa-paintbrush"  />
    </PopoverButton>
    <PopoverPanel class="absolute z-10 border p-4 bg-white">
      <div v-for="color in colors" class="flex mb-1 justify-end gap-1">
        <span class="text-xs">{{ color }}</span>
        <button 
          v-for="variant in variants" 
          @click.prevent="close() ; onSelectColor(color, variant)"
          :class="[`bg-${color}-${variant}`, `hover:outline-${color}-${variant}`]"
          class="hover:outline hover:outline-2 hover:outline-offset-2 w-4 h-4">
        </button>
      </div>
    </PopoverPanel>
  </Popover>

</template>

<script setup>
import { ref }  from 'vue'

import { 
  Popover, 
  PopoverButton, 
  PopoverPanel 
} from '@headlessui/vue'

const props = defineProps({
  colors: Array,
  variants: Array
})

const emits = defineEmits(['select-color'])

const onSelectColor = (color, variant) => {
  emits('select-color', color, variant)
}

</script>
