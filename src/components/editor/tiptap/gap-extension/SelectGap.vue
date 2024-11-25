<template>

    <Listbox as="div" v-model="gapX">
      <ListboxButton>{{ gapX }}</ListboxButton>
      <ListboxOptions :class="class_opts">
        <ListboxOption v-for="gap in gaps" :key="gap" :value="gap" >
          <button :class="class_opt">{{ gap }}</button>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>

    <Listbox as="div" v-model="gapY">
      <ListboxButton>{{ gapY }}</ListboxButton>
      <ListboxOptions :class="class_opts">
        <ListboxOption v-for="gap in gaps" :key="gap" :value="gap" >
          <button :class="class_opt">{{ gap }}</button>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>


</template>

<script setup>
import { computed } from 'vue'
import { getSelectedAttrs } from '@/components/editor/tiptap/utils'

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

const props = defineProps({
  breakpoint: String,
  extension: Object,
  editor: Object,
  selected: Object
})

const emits = defineEmits(['select-gap'])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const gaps = computed(() => props.extension.options.gaps)

const get_side = (side) => {
  try {
    return getSelectedAttrs(props, side)
  } catch (e) {
    return 'none'
  }
}

const set_side = (side, value) => emits('select-gap', {
  side: side, 
  gap: value, 
  breakpoint: props.breakpoint
})

const gapX = computed({
  get() { return get_side('gapX') },
  set(value) { return set_side('gapX', value) }
})

const gapY = computed({
  get() { return get_side('gapY') },
  set(value) { return set_side('gapY', value) }
})

</script>
