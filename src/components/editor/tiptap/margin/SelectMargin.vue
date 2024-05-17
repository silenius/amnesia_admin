<template>
  <div class="grid grid-rows-3 relative justify-items-center items-center">

    <!-- mt: margin top -->

    <Listbox as="div" v-model="mt">
      <ListboxButton>top: {{ mt }}</ListboxButton>
      <ListboxOptions :class="class_opts">
        <ListboxOption v-for="level in levels" :key="level" :value="level" >
          <button :class="class_opt">{{ level }}</button>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
    <div class="grid gap-2 grid-cols-3 justify-items-center items-center">

      <!-- ml: margin left -->

      <Listbox as="div" v-model="ml">
        <ListboxButton>left: {{ ml }}</ListboxButton>
        <ListboxOptions :class="class_opts">
          <ListboxOption v-for="level in levels" :key="level" :value="level" >
            <button :class="class_opt">{{ level }}</button>
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
      <div>
        <img :src="marginSvg" class="w-8 bg-white p-1" />
      </div>

      <!-- mr: margin right -->

      <Listbox as="div" v-model="mr">
        <ListboxButton>right: {{ mr }}</ListboxButton>
        <ListboxOptions :class="class_opts">
          <ListboxOption v-for="level in levels" :key="level" :value="level" >
            <button :class="class_opt">{{ level }}</button>
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
    </div>

    <!-- mb: margin bottom -->

    <Listbox as="div" v-model="mb">
      <ListboxButton>bottom: {{ mb }}</ListboxButton>
      <ListboxOptions :class="class_opts">
        <ListboxOption v-for="level in levels" :key="level" :value="level" >
          <button :class="class_opt">{{ level }}</button>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  </div>

  <div class="flex gap-4 justify-center">

    <!-- mx: margin horizontal -->

    <Listbox as="div" v-model="mx">
      <ListboxButton>horizontal: {{ mx }}</ListboxButton>
      <ListboxOptions :class="class_opts">
        <ListboxOption v-for="level in levels" :key="level" :value="level" >
          <button :class="class_opt">{{ level }}</button>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>

    <!-- my: margin vertical -->

    <Listbox as="div" v-model="my">
      <ListboxButton>vertical: {{ my }}</ListboxButton>
      <ListboxOptions :class="class_opts">
        <ListboxOption v-for="level in levels" :key="level" :value="level" >
          <button :class="class_opt">{{ level }}</button>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>

  </div>

</template>

<script setup>

import { computed } from 'vue'
import marginSvg from "@/assets/margin.svg";

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

import {
  parse_level
} from './utils'

const props = defineProps({
  breakpoint: String,
  extension: Object,
  transaction: Object,
  editor: Object
})

const emits = defineEmits(['select-margin'])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const levels = computed(() => props.extension.options.levels)

const attrs = computed(() => {
  const type = props.extension.options.types.find(
    (x) => props.editor.isActive(x)
  )
  if (type) {
    return props.editor.getAttributes(type)
  }
})

const get_side = (side) => {
  try {
    const v = attrs.value[side].find((x) => x.breakpoint == props.breakpoint)
    return v !== undefined ? v.level : ''
  } catch (e) {
    return ''
  }

}

const set_side = (side, value) => emits('select-margin', {
  side: side, 
  level: parse_level(value), 
  breakpoint: props.breakpoint
})

const mx = computed({
  get() { return get_side('mx') },
  set(value) { return set_side('mx', value) }
})

const my = computed({
  get() { return get_side('my') },
  set(value) { return set_side('my', value) }
})

const mt = computed({
  get() { return get_side('mt') },
  set(value) { return set_side('mt', value) }
})

const mr = computed({
  get() { return get_side('mr') },
  set(value) { return set_side('mr', value) }
})

const mb = computed({
  get() { return get_side('mb') },
  set(value) { return set_side('mb', value) }
})

const ml = computed({
  get() { return get_side('ml') },
  set(value) { return set_side('ml', value) }
})

</script>
