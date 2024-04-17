<template>
  <Listbox as="div" v-model="size">
    <ListboxButton class="font-bold border rounded-full p-2 w-full">{{ size }}</ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="s in sizes" :key="s" :value="s">
        <button :class="class_opt">{{ s }}</button>
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
  'select-font-size'
])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const sizes = computed(() => props.extension.options.sizes)

const attrs = computed(() => props.editor.getAttributes('textClass'))

const size = computed({

  get() { 
    const v = attrs.value.fontSize?.find((x) => x.breakpoint == props.breakpoint)
    return v !== undefined ? v.size : 'none'
  },

  set(value) { 
    return emits('select-font-size', {
      size: value, breakpoint: props.breakpoint
    })
  }

})

</script>
