<template>
  <Listbox as="div" v-model="weight">
    <ListboxButton>{{ weight }}</ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="w in weights" :key="w" :value="w">
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
  'select-font-weight'
])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const weights = computed(() => props.extension.options.weights)

const attrs = computed(() => props.editor.getAttributes('textClass'))

const weight = computed({

  get() { 
    const v = attrs.value.fontWeight?.find((x) => x.breakpoint == props.breakpoint)
    return v !== undefined ? v.weight : 'none'
  },

  set(value) { 
    return emits('select-font-weight', {
      weight: value, breakpoint: props.breakpoint
    })
  }

})



</script>
