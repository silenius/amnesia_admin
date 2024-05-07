<template>
  <Listbox as="div" v-model="width">
    <ListboxButton class="font-bold border rounded-full p-2 w-full">{{ width }}</ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="w in widths" :key="w" :value="w">
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
  'select-width'
])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const widths = computed(() => props.extension.options.widths)

const attrs = computed(() => {
  if (props.editor.isActive('image')) {
    return props.editor.getAttributes('image')
  } else {
    return props.editor.getAttributes('paragraph')
  }
})

const width = computed({

  get() {
    const v = Array.isArray(attrs.value.width) 
      ? attrs.value.width?.find((x) => x.breakpoint == props.breakpoint)?.width
      : attrs.value.width

      return v !== undefined ? v : 'none'
  },

  set(value) { 
    return emits('select-width', {
      width: value, breakpoint: props.breakpoint, force_tw: true
    })
  }

})

</script>
