<template>
  <Listbox as="div" v-model="maxWidth">
    <ListboxButton class="font-bold border rounded-full p-2 w-full">{{ maxWidth }}</ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="w in maxWidths" :key="w" :value="w">
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

import { getSelectedAttrs } from '@/components/editor/tiptap/utils'

const props = defineProps({
  breakpoint: String,
  extension: Object,
  editor: Object,
  selected: Object
})

const emits = defineEmits([
  'select-maxWidth'
])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded-sm', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const maxWidths = computed(
  () => props.extension.options.maxWidths.toSpliced(0, 0, undefined)
)

const maxWidth = computed({

  get() { 
    try {
      return getSelectedAttrs(props, 'maxWidth')
    } catch (e) {
      return 'none'
    }
  },

  set(value) { 
    return emits('select-maxWidth', {
      maxWidth: value, 
      breakpoint: props.breakpoint
    })
  }

})

</script>
