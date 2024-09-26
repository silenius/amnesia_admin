<template>
  <Listbox as="div" v-model="weight">
    <ListboxButton>
        <img :src="boldImg" :class="img_cls" />
    </ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="w in weights" :key="w" :value="w">
        <button :class="class_opt">{{ w }}</button>
      </ListboxOption>
    </ListboxOptions>
  </Listbox>
</template>

<script setup>
import { computed } from 'vue'
import boldImg from "@/assets/bold.svg";

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
    return v !== undefined ? v.tw : null
  },

  set(value) { 
    return emits('select-font-weight', {
      weight: value, 
      breakpoint: props.breakpoint
    })
  }

})

const img_cls = computed(() => ['w-8', 'h-8', 'rounded-md', 'bg-slate-100', 'p-1', 'hover:bg-white', 'hover:p-0.5', weight.value ? 'outline-offset-2 outline outline-2 outline-pink-700' : ''])


</script>
