<template>
  <Listbox as="div" v-model="size">
    <ListboxButton class="font-bold border rounded-full p-2 w-full">{{ size || 'none'}}</ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="s in sizes" :key="s" :value="s">
        <button :class="class_opt">{{ s !== undefined ? s : 'none'}}</button>
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

import { getTypeAttrs } from '@/components/editor/tiptap/utils'
import { props_extension } from '../utils';

const props = defineProps(props_extension)
const emits = defineEmits(['select-font-size'])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded-sm', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const sizes = computed(
  () => props.extension.options.sizes.toSpliced(0, 0, undefined)
)

const size = computed({

  get() { 
    try {
      return getTypeAttrs(props, 'fontSize')
    } catch (e) {
      return undefined
    }
  },

  set(value) { 
    return emits('select-font-size', {
      size: value, 
      breakpoint: props.breakpoint
    })
  }

})

</script>
