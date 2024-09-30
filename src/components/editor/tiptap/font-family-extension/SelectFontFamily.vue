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

const props = defineProps({
  breakpoint: String,
  extension: Object,
  transaction: Object,
  editor: Object
})

const emits = defineEmits([
  'select-font-family'
])

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const families = computed(
  () => props.extension.options.families.toSpliced(0, 0, undefined)
)

const attrs = computed(() => props.editor.getAttributes('textClass'))

const family = computed({

  get() { 
    const v = attrs.value.fontFamily?.find((x) => x.breakpoint == props.breakpoint)
    return v !== undefined ? v.tw : 'none'
  },

  set(value) { 
    return emits('select-font-family', {
      family: value, 
      breakpoint: props.breakpoint
    })
  }

})

</script>
