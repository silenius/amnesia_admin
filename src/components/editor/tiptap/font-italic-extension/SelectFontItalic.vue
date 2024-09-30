<template>
  <Listbox as="div" v-model="italic">
    <ListboxButton>
        <img :src="italicImg" :class="img_cls" />
    </ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="w in italics" :key="w" :value="w">
        <button :class="class_opt">{{ w || 'none' }}</button>
      </ListboxOption>
    </ListboxOptions>
  </Listbox>
</template>

<script setup>
import { computed } from 'vue'
import italicImg from "@/assets/italic.svg";

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
})

const emits = defineEmits([
  'select-font-italic'
])

const italics = computed(
  () => props.extension.options.italics.toSpliced(0, 0, undefined)
)

const attrs = computed(() => props.editor.getAttributes('textClass'))

const italic = computed({

  get() { 
    const v = attrs.value.fontItalic?.find((x) => x.breakpoint == props.breakpoint)
    return v !== undefined ? v.tw : null
  },

  set(value) { 
    return emits('select-font-italic', {
      italic: value, 
      breakpoint: props.breakpoint
    })
  }

})

const img_cls = computed(() => ['w-8', 'h-8', 'rounded-md', 'bg-slate-100', 'p-1', 'hover:bg-white', 'hover:p-0.5', italic.value ? 'outline-offset-2 outline outline-2 outline-pink-700' : ''])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]


</script>
