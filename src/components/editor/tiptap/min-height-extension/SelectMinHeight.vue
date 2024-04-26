<template>
  <Listbox as="div" v-model="minHeight">
    <ListboxButton class="font-bold border rounded-full p-2 w-full">{{ minHeight }}</ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="h in minHeights" :key="h" :value="h">
        <button :class="class_opt">{{ h }}</button>
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
  'select-minHeight'
])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const minHeights = computed(() => props.extension.options.minHeights)

const attrs = computed(() => {
  if (props.editor.isActive('image')) {
    return props.editor.getAttributes('image')
  } else {
    return props.editor.getAttributes('paragraph')
  }
})

const minHeight = computed({

  get() { 
    const v = attrs.value.minHeight?.find((x) => x.breakpoint == props.breakpoint)
    return v !== undefined ? v.minHeight : 'none'
  },

  set(value) { 
    return emits('select-minHeight', {
      minHeight: value, breakpoint: props.breakpoint
    })
  }

})

</script>
