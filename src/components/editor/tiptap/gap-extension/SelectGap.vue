<template>

    <!-- mx: margin horizontal -->

    <Listbox as="div" v-model="gapX">
      <ListboxButton>{{ gapX }}</ListboxButton>
      <ListboxOptions :class="class_opts">
        <ListboxOption v-for="gap in gaps" :key="gap" :value="gap" >
          <button :class="class_opt">{{ gap }}</button>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>

    <!-- my: margin vertical -->

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

const emits = defineEmits(['select-gap'])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const gaps = computed(() => props.extension.options.gaps)

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
    return v !== undefined ? v.gap : ''
  } catch (e) {
    return ''
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
