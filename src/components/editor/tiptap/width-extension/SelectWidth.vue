<template>
  <Listbox as="div" v-model="width">
    <ListboxButton class="font-bold border rounded-full p-2 w-full">{{ width }}</ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="w in widths" :key="w" :value="w">
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
  editor: Object,
  type: String
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

const widths = computed(
  () => props.extension.options.widths.toSpliced(0, 0, undefined)
)

const attrs = computed(() => {
  const type = !props.type ? props.extension.options.types.find(
    (x) => props.editor.isActive(x)
  ) : props.type

  if (type) {
    return props.editor.getAttributes(type)
  }
})

const width = computed({

  get() {
    try {
      return attrs.value.width.find(
        (x) => x.breakpoint == props.breakpoint
      ).width
    } catch (e) {
      return 'none'
    }
  },

  set(value) { 
    return emits('select-width', {
      width: value, 
      breakpoint: props.breakpoint, 
      raw: false
    })
  }

})

</script>
