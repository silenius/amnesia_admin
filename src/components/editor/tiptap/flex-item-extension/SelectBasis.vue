<template>
  <Listbox as="div" v-model="basis">
    <ListboxButton class="font-bold border rounded-full p-2 w-full">{{ basis }}</ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="w in all_basis" :key="w" :value="w">
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

const props = defineProps({
  breakpoint: String,
  extension: Object,
  transaction: Object,
  editor: Object
})

const emits = defineEmits([
  'select-basis'
])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const all_basis = computed(
  () => props.extension.options.basis.toSpliced(0, 0, undefined)
)

const attrs = computed(() => props.editor.getAttributes('flexItem'))

const basis = computed({

  get() {
    try {
      return attrs.value.basis.find(
        (x) => x.breakpoint == props.breakpoint
      ).basis
    } catch (e) {
      return 'none'
    }
  },

  set(value) { 
    return emits('select-basis', {
      basis: value, 
      breakpoint: props.breakpoint, 
    })
  }

})

</script>
