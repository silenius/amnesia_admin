<template>
  <Listbox as="div" v-model="minHeight">
    <ListboxButton class="font-bold border rounded-full p-2 w-full">{{ minHeight }}</ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="h in minHeights" :key="h" :value="h">
        <button :class="class_opt">{{ h !== undefined ? h : 'none'}}</button>
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
  editor: Object,
  type: String
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

const minHeights = computed(
  () => props.extension.options.minHeights.toSpliced(0, 0, undefined)
)

const attrs = computed(() => {
  const type = !props.type ? props.extension.options.types.find(
    (x) => props.editor.isActive(x)
  ) : props.type

  if (type) {
    return props.editor.getAttributes(type)
  }
})

const minHeight = computed({

  get() { 
    try {
      return attrs.value.minHeight.find(
        (x) => x.breakpoint == props.breakpoint
      ).minHeight
    } catch (e) {
      return 'none'
    }
  },

  set(value) { 
    return emits('select-minHeight', {
      minHeight: value, 
      breakpoint: props.breakpoint
    })
  }

})

</script>
