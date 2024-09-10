<template>
  <Listbox as="div" v-model="flex">
    <ListboxButton class="font-bold border rounded-full p-2 w-full">{{ flex }}</ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="w in flexs" :key="w" :value="w">
        <button :class="class_opt">{{ w !== undefined ? w : 'null'}}</button>
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
  'select-flex-grow-shrink'
])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const flexs = computed(
  () => props.extension.options.flexs.toSpliced(0, 0, undefined)
)

const attrs = computed(() => props.editor.getAttributes('flexItem'))

const flex = computed({

  get() {
    try {
      return attrs.value.flex.find(
        (x) => x.breakpoint == props.breakpoint
      ).flex
    } catch (e) {
      return 'none'
    }
  },

  set(value) { 
    return emits('select-flex-grow-shrink', {
      flex: value, 
      breakpoint: props.breakpoint, 
    })
  }

})

</script>
