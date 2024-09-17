<template>
  <Listbox as="div" v-model="maxHeight">
    <ListboxButton class="font-bold border rounded-full p-2 w-full">{{ maxHeight }}</ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="w in maxHeights" :key="w" :value="w">
        <button :class="class_opt">{{ w }}</button>
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

const props = defineProps({
  breakpoint: String,
  extension: Object,
  transaction: Object,
  editor: Object,
  type: String
})

const emits = defineEmits([
  'select-maxHeight'
])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const maxHeights = computed(() => props.extension.options.maxHeights)

const maxHeight = computed({

  get() { 
    try {
      return getTypeAttrs(props).maxHeight.find(
        (x) => x.breakpoint == props.breakpoint
      ).maxHeight
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
