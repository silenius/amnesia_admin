<template>
  <SelectBreakpoint @select-breakpoint="change_breakpoint" />

  <div class="grid grid-rows-3 relative justify-items-center items-center">

    <!-- pt: padding top -->

    <Listbox as="div" v-model="pt">
      <ListboxButton>top: {{ pt }}</ListboxButton>
      <ListboxOptions :class="class_opts">
        <ListboxOption v-for="level in levels" :key="level" :value="level" >
          <button :class="class_opt">{{ level }}</button>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
    <div class="grid gap-2 grid-cols-3 justify-items-center items-center">

      <!-- pl: padding left -->

      <Listbox as="div" v-model="pl">
        <ListboxButton>left: {{ pl }}</ListboxButton>
        <ListboxOptions :class="class_opts">
          <ListboxOption v-for="level in levels" :key="level" :value="level" >
            <button :class="class_opt">{{ level }}</button>
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
      <div>
        <img :src="paddingSvg" class="w-8 bg-white p-1" />
      </div>

      <!-- pr: padding right -->

      <Listbox as="div" v-model="pr">
        <ListboxButton>right: {{ pr }}</ListboxButton>
        <ListboxOptions :class="class_opts">
          <ListboxOption v-for="level in levels" :key="level" :value="level" >
            <button :class="class_opt">{{ level }}</button>
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
    </div>

    <!-- pb: padding bottom -->

    <Listbox as="div" v-model="pb">
      <ListboxButton>bottom: {{ pb }}</ListboxButton>
      <ListboxOptions :class="class_opts">
        <ListboxOption v-for="level in levels" :key="level" :value="level" >
          <button :class="class_opt">{{ level }}</button>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  </div>

  <div class="flex gap-4 justify-center">

    <!-- px: padding horizontal -->

    <Listbox as="div" v-model="px">
      <ListboxButton>horizontal: {{ px }}</ListboxButton>
      <ListboxOptions :class="class_opts">
        <ListboxOption v-for="level in levels" :key="level" :value="level" >
          <button :class="class_opt">{{ level }}</button>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>

    <!-- py: padding vertical -->

    <Listbox as="div" v-model="py">
      <ListboxButton>vertical: {{ py }}</ListboxButton>
      <ListboxOptions :class="class_opts">
        <ListboxOption v-for="level in levels" :key="level" :value="level" >
          <button :class="class_opt">{{ level }}</button>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>

  </div>

</template>

<script setup>

import { ref, computed, watch } from 'vue'
import paddingSvg from "@/assets/padding.svg";

import SelectBreakpoint from '../breakpoint/SelectBreakpoint.vue'

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

import {
  parse_level
}  from './utils'

const props = defineProps({
  extension: Object,
  transaction: Object,
  editor: Object
})

const emits = defineEmits(['select-padding'])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const breakpoint = ref(null)

const levels = computed(() => props.extension.options.levels)

const change_breakpoint = (value) => {
  breakpoint.value = value
}

const attrs = computed(() => {
  if (props.editor.isActive('image')) {
    return props.editor.getAttributes('image')
  } else {
    return props.editor.getAttributes('textClass')
  }
})

const get_side = (side) => {
  if (Array.isArray(attrs.value[side])) {
    const v = attrs.value[side].find((x) => x.breakpoint == breakpoint.value)
    return v !== undefined ? v.level : ''
  }

  return ''
}

const set_side = (side, value) => emits('select-padding', {
  side: side, 
  level: parse_level(value), 
  breakpoint: breakpoint.value
})

const px = computed({
  get() { return get_side('px') },
  set(value) { return set_side('px', value) }
})

const py = computed({
  get() { return get_side('py') },
  set(value) { return set_side('py', value) }
})

const pt = computed({
  get() { return get_side('pt') },
  set(value) { return set_side('pt', value) }
})

const pr = computed({
  get() { return get_side('pr') },
  set(value) { return set_side('pr', value) }
})

const pb = computed({
  get() { return get_side('pb') },
  set(value) { return set_side('pb', value) }
})

const pl = computed({
  get() { return get_side('pl') },
  set(value) { return set_side('pl', value) }
})

</script>
