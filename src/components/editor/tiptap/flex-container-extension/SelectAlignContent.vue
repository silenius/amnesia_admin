<template>
  <Listbox as="div" v-model="align_content">
    <ListboxButton class="font-bold border rounded-full p-2 w-full">{{ align_content }}</ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="w in align_contents" :key="w" :value="w">
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
  'select-align-content'
])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const align_contents = computed(
  () => props.extension.options.align_contents.toSpliced(0, 0, undefined)
)

const attrs = computed(() => props.editor.getAttributes('flexContainer'))

const align_content = computed({

  get() {
    try {
      return attrs.value.align_content.find(
        (x) => x.breakpoint == props.breakpoint
      ).align_content
    } catch (e) {
      return 'none'
    }
  },

  set(value) { 
    return emits('select-align-content', {
      align: value, 
      breakpoint: props.breakpoint, 
    })
  }

})

</script>
