<template>
  <Listbox as="div" v-model="maxHeight">
    <ListboxButton class="font-bold border rounded-full p-2 w-full">{{ maxHeight }}</ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="h in maxHeights" :key="h" :value="h">
        <button :class="class_opt">{{ h !== undefined ? h : 'none'}}</button>
      </ListboxOption>
    </ListboxOptions>
  </Listbox>
</template>

<script setup>
import { computed } from 'vue'

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

import { getSelectedAttrs, props_extension } from '../utils'

const props = defineProps(props_extension)
const emits = defineEmits(['select-maxHeight'])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded-sm', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const maxHeights = computed(
  () => props.extension.options.maxHeights.toSpliced(0, 0, undefined)
)

const maxHeight = computed({

  get() { 
    try {
      return getSelectedAttrs(props, 'maxHeight')
    } catch (e) {
      return 'none'
    }
  },

  set(value) { 
    return emits('select-maxHeight', {
      maxHeight: value, 
      breakpoint: props.breakpoint
    })
  }

})

</script>
