<script setup>
import { 
  Popover,
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
} from '@headlessui/vue'

import { ref } from 'vue'

const props = defineProps({
  selection: {
    type: Map,
    required: true
  },
  actions: {
    type: Array,
    default: [
      {
        label: 'Move',
        event: 'move-selection',
        icon: 'fa-solid fa-arrow-up-right-from-square',
        class: 'bg-violet-500 text-white',
        enabled: (...args) => true
      }, 
      {
        label: 'Delete',
        event: 'delete-selection',
        icon: 'fa-solid fa-trash-can',
        class: 'bg-red-700 text-white',
        enabled: (...args) => true
      }, 

    ]
  }
})

const open = ref(true)

const emit = defineEmits(['clear-selection', 'move-selection', 'delete-selection'])
</script>

<template>
  <Popover as="div" :open="open" class="relative inline">
    <PopoverButton class="w-12 h-12  hover:outline-hidden text-white bg-red-400
      hover:bg-red-500 hover:ring-4 hover:ring-red-100 rounded-full text-sm p-2">
      <font-awesome-icon class="h-6 w-6 m-0 p-0 align-middle" icon="fa-solid fa-square-check" />
      <span class="text-white w-6 h-6 text-xs font-bold absolute bg-red-400 rounded-full
        p-1">{{ selection.size }}</span>
    </PopoverButton>
    <transition
      enter-active-class="transition duration-1000 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >

      <PopoverPanel as="div" class="z-10 absolute p-4 left-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden">
        <div class="text-center">
        <span class="font-bold">{{ selection.size === 0 ? 'no' : selection.size }}</span> items selected 
        <button v-if="selection.size" class="text-xs cursor-pointer
           hover:rounded-full hover:outline-offset-4 hover:text-black hover:outline ml-4 italic" @click="$emit('clear-selection')">clear</button>
        </div>
        <div class="flex flex-col p-4 gap-2" v-if="selection.size">
          <button @click="$emit(action.event, selection)" :class="action.class" class="p-2" v-for="action in actions">
            <span>{{ action.label }}</span>
          </button>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
