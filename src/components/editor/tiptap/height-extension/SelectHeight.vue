<template>
  <Listbox as="div" v-model="height">
    <ListboxButton class="font-bold border rounded-full p-2 w-full">{{ height }}</ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="w in heights" :key="w" :value="w">
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
  'select-height'
])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const heights = computed(() => props.extension.options.heights)

const attrs = computed(() => {
  if (props.editor.isActive('image')) {
    return props.editor.getAttributes('image')
  } else {
    return props.editor.getAttributes('paragraph')
  }
})

const height = computed({

  get() { 
    const v = Array.isArray(attrs.value.height) 
      ? attrs.value.height?.find((x) => x.breakpoint == props.breakpoint)?.height
      : attrs.value.height

      return v !== undefined ? v : 'none'
  },

  set(value) { 
    return emits('select-height', {
      height: value, breakpoint: props.breakpoint
    })
  }

})

</script>
