<template>
  <Listbox as="div" v-model="minWidth">
    <ListboxButton class="font-bold border rounded-full p-2 w-full">{{ minWidth }}</ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="w in minWidths" :key="w" :value="w">
        <button :class="class_opt">{{ w !== undefined ? w : 'none'}}</button>
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
const emits = defineEmits(['select-minWidth'])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded-sm', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const minWidths = computed(
  () => props.extension.options.minWidths.toSpliced(0, 0, undefined)
)

const minWidth = computed({

  get() { 
    try {
      return getSelectedAttrs(props, 'minWidth')
    } catch (e) {
      return 'none'
    }
  },

  set(value) { 
    return emits('select-minWidth', {
      minWidth: value, 
      breakpoint: props.breakpoint
    })
  }

})

</script>
