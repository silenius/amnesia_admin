<template>
  <Listbox as="div" v-model="family">
    <ListboxButton class="font-bold border rounded-full p-2 w-full">{{ family || 'none' }}</ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="s in families" :key="s" :value="s">
        <button class="text-xl" :class="[class_opt, `font-${s}`]">{{ s || 'none' }}</button>
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

import { getTypeAttrs, props_extension } from '../utils'

const props = defineProps(props_extension)
const emits = defineEmits(['select-font-family'])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded-sm', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const families = computed(
  () => props.extension.options.families.toSpliced(0, 0, undefined)
)

const family = computed({

  get() { 
    try {
      return getTypeAttrs(props, 'fontFamily')
    } catch (e) {
      return undefined
    }
  },

  set(value) { 
    return emits('select-font-family', {
      family: value, 
      breakpoint: props.breakpoint
    })
  }

})

</script>
