<template>
  <Listbox as="div" v-model="wrap">
    <ListboxButton class="font-bold border rounded-full p-2 w-full">{{ wrap }}</ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="w in wraps" :key="w" :value="w">
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
  'select-wrap'
])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const wraps = computed(
  () => props.extension.options.wraps.toSpliced(0, 0, undefined)
)

const attrs = computed(() => props.editor.getAttributes('flexContainer'))

const wrap = computed({

  get() {
    try {
      return attrs.value.wrap.find(
        (x) => x.breakpoint == props.breakpoint
      ).wrap
    } catch (e) {
      return 'none'
    }
  },

  set(value) { 
    return emits('select-wrap', {
      wrap: value, 
      breakpoint: props.breakpoint, 
    })
  }

})

</script>
