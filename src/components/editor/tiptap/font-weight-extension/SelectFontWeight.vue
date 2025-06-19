<template>
  <Listbox as="div" v-model="weight">
    <ListboxButton>
        <img :src="boldImg" :class="img_cls" />
    </ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="w in weights" :key="w" :value="w">
        <button :class="class_opt">{{ w !== undefined ? w : 'none'}}</button>
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

import { getTypeAttrs, props_extension } from '../utils'

const props = defineProps(props_extension)
const emits = defineEmits(['select-font-weight'])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded-sm', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const weights = computed(
  () => props.extension.options.weights.toSpliced(0, 0, undefined)
)

const weight = computed({

  get() { 
    try {
      return getTypeAttrs(props, 'fontWeight')
    } catch(e) {
      return undefined
    }
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
