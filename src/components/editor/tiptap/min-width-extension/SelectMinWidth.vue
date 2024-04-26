<template>
  <Listbox as="div" v-model="minWidth">
    <ListboxButton class="font-bold border rounded-full p-2 w-full">{{ minWidth }}</ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="w in minWidths" :key="w" :value="w">
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

const props = defineProps({
  breakpoint: String,
  extension: Object,
  transaction: Object,
  editor: Object
})

const emits = defineEmits([
  'select-minWidth'
])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const minWidths = computed(() => props.extension.options.minWidths)

const attrs = computed(() => {
  if (props.editor.isActive('image')) {
    return props.editor.getAttributes('image')
  } else {
    return props.editor.getAttributes('paragraph')
  }
})

const minWidth = computed({

  get() { 
    const v = attrs.value.minWidth?.find((x) => x.breakpoint == props.breakpoint)
    return v !== undefined ? v.minWidth : 'none'
  },

  set(value) { 
    return emits('select-minWidth', {
      minWidth: value, breakpoint: props.breakpoint
    })
  }

})

</script>
