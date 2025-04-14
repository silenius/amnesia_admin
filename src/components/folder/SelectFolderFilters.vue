<script setup>
import { 
  Popover,
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
} from '@headlessui/vue'

import InputCheckbox from '../form/InputCheckbox.vue'

const props = defineProps({
  folder_first: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['set-view'])

</script>

<template>
  <Popover class="relative">
    <PopoverButton class="text-white bg-rose-500 w-12 h-12 hover:bg-rose-600 hover:ring-4 hover:ring-rose-100 font-medium rounded-full p-2 dark:focus:ring-rose-900">
      <font-awesome-icon class="align-middle h-6 w-6" icon="fa-solid fa-sliders" />
    </PopoverButton>
    <PopoverOverlay class="fixed inset-0 bg-black opacity-25" />

    <PopoverPanel class="absolute right-0 w-max p-4 bg-white z-10">
      <div class="flex items-start">
        <InputCheckbox :checked="folder_first" @change="(n) =>
          $emit('reload', {sort_folder_first: n === 'true'})"/>
        <div class="flex flex-col items-start">
          Folders first
          <span v-if="folder_first" class="text-xs">Folders will
            appear first in the selected order</span>
          <span v-else class="text-xs">Folders won't specially appear first</span>
        </div>
      </div>
    </PopoverPanel>
  </Popover>

</template>
