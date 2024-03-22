<template>

  <Popover v-slot="{ close }" as="div" class="relative">
    <PopoverButton as="span">
      <font-awesome-icon :icon="icon"  />
    </PopoverButton>
    <PopoverPanel class="absolute z-10 border p-4 bg-white rounded-lg">
      <div class="flex mb-1 gap-1 justify-end">
        <button 
          v-for="color in unshaded_colors"
          :key="color"
          @click.prevent="close(); onSelectColor(color)"
          :class="[`bg-${color}`, `hover:outline-${color}`]"
          class="hover:outline w-10 hover:outline-2 border
          hover:outline-offset-2 p-1 text-xs truncate">
          {{ color }}
        </button>
      </div>
      <div v-for="color in shaded_colors" class="flex mb-1 justify-end gap-1">
        <span class="text-xs">{{ color }}</span>
        <button 
          v-for="variant in shades" 
          @click.prevent="close() ; onSelectColor(color, variant)"
          :class="[`bg-${color}-${variant}`, `hover:outline-${color}-${variant}`]"
          class="hover:outline hover:outline-2 hover:outline-offset-2 w-4 h-4">
        </button>
      </div>
    </PopoverPanel>
  </Popover>

</template>

<script setup>

import { 
  Popover, 
  PopoverButton, 
  PopoverPanel 
} from '@headlessui/vue'

const props = defineProps({
  unshaded_colors: Set,
  shaded_colors: Set,
  shades: Set,
  icon: {
    type: String,
    default: 'fa-solid fa-paintbrush'
  }
})

const emits = defineEmits(['select-color'])

const onSelectColor = (color, variant) => {
  emits('select-color', color, variant)
}

</script>
