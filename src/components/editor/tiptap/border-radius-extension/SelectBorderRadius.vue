<template>
  <Listbox as="div" v-model="radius">
    <ListboxButton class="font-bold border rounded-full p-2 w-full">{{ radius }}</ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="w in radiuses" :key="w" :value="w">
        <button :class="class_opt">{{ w !== undefined ? w : 'none'}}</button>
      </ListboxOption>
    </ListboxOptions>
  </Listbox>

</template>

<script setup>
import { computed } from 'vue'
import { getSelectedAttrs } from '@/components/editor/tiptap/utils'

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

const props = defineProps({
  breakpoint: String,
  extension: Object,
  editor: Object,
  selected: Object
})

const emits = defineEmits(['select-border-radius'])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded-sm', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const radiuses = computed(
  () => props.extension.options.radiuses.toSpliced(0, 0, undefined)
)

const radius = computed({

  get() { 
    try {
      return getSelectedAttrs(props, 'borderRadius')
    } catch (e) {
      return 'none'
    }
  },
  
  set(value) { 
    return emits('select-border-radius', {
      radius: value, 
      breakpoint: props.breakpoint
    })
  }

})
</script>
