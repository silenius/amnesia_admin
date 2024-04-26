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

const props = defineProps({
  breakpoint: String,
  extension: Object,
  transaction: Object,
  editor: Object
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

const attrs = computed(() => {
  if (props.editor.isActive('image')) {
    return props.editor.getAttributes('image')
  } else {
    return props.editor.getAttributes('paragraph')
  }
})

const maxHeight = computed({

  get() { 
    const v = attrs.value.maxHeight?.find((x) => x.breakpoint == props.breakpoint)
    return v !== undefined ? v.maxHeight : 'none'
  },

  set(value) { 
    return emits('select-maxHeight', {
      maxHeight: value, breakpoint: props.breakpoint
    })
  }

})

</script>
