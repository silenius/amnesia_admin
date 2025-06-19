<template>
  <Listbox as="div" v-model="italic">
    <ListboxButton>
      <img :src="italicImg" :class="img_cls" />
    </ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="i in italics" :key="i" :value="i">
        <button :class="class_opt">{{ i !== undefined ? i : 'none'}}</button>
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

import { getTypeAttrs, props_extension } from '../utils';

const props = defineProps(props_extension)
const emits = defineEmits(['select-font-italic'])

const italics = computed(
  () => props.extension.options.italics.toSpliced(0, 0, undefined)
)

const italic = computed({

  get() { 
    try {
      return getTypeAttrs(props, 'fontItalic')
    } catch (e) {
      return undefined
    }
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
  'absolute', 'text-center', 'max-h-48', 'rounded-sm', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]
</script>
