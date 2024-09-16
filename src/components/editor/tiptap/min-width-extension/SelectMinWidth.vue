<template>
  <Listbox as="div" v-model="minWidth">
    <ListboxButton class="font-bold border rounded-full p-2 w-full">{{ minWidth }}</ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="w in minWidths" :key="w" :value="w">
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
  'select-minWidth'
])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const minWidths = computed(
  () => props.extension.options.minWidths.toSpliced(0, 0, undefined)
)

const attrs = computed(() => {
  const type = !props.type ? props.extension.options.types.find(
    (x) => props.editor.isActive(x)
  ) : props.type

  if (type) {
    return props.editor.getAttributes(type)
  }
})

const minWidth = computed({

  get() { 
    try {
      return attrs.value.minWidth.find(
        (x) => x.breakpoint == props.breakpoint
      ).minWidth
    } catch (e) {
      return 'none'
    }
  },

  set(value) { 
    return emits('select-minWidth', {
      minWidth: value, 
      breakpoint: props.breakpoint
    })
  }

})

</script>
