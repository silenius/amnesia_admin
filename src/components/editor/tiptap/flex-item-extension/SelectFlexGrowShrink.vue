<template>

 <Popover class="relative">
    <PopoverButton class="font-bold border rounded-full p-2 w-full">{{ flex }}</PopoverButton>

    <PopoverPanel class="mt-1 absolute w-max right-0 z-10 p-2 rounded-xl
      bg-slate-500 outline outline-slate-600/75">
      <div class="flex flex-col gap-2 items-start">
        <button :class="[button_cls]">allow to shrink but not grow, taking into account its initial size</button>
        <button :class="[button_cls]">allow to grow and shrink as needed, ignoring its initial size</button>
        <button :class="[button_cls]">allow to grow and shrink, taking into account its initial size</button>
        <button :class="[button_cls]">prevent from growing or shrinking</button>
      </div>

      <img src="/solutions.jpg" alt="" />
    </PopoverPanel>
  </Popover>
  
  <!--
  <Listbox as="div" v-model="flex">
    <ListboxButton class="font-bold border rounded-full p-2 w-full">{{ flex }}</ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="w in flexs" :key="w" :value="w">
        <button :class="class_opt">{{ w !== undefined ? w : 'null'}}</button>
      </ListboxOption>
    </ListboxOptions>
  </Listbox>
-->
</template>

<script setup>
import { computed } from 'vue'

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Popover, PopoverButton, PopoverPanel
} from '@headlessui/vue'

const props = defineProps({
  breakpoint: String,
  extension: Object,
  transaction: Object,
  editor: Object
})

const emits = defineEmits([
  'select-flex-grow-shrink'
])

const button_cls = 'border p-2 hover:cursor-hand w-full bg-slate-800 hover:bg-slate-900'

const class_opts = [
  'absolute', 'text-center', 'max-h-48', 'rounded', 'text-black', 'bg-white', 'overflow-scroll', 'z-10'
]
const class_opt = [
  'px-4', 'hover:bg-slate-800', 'w-full', 'hover:text-white'
]

const flexs = computed(
  () => props.extension.options.flexs.toSpliced(0, 0, undefined)
)

const attrs = computed(() => props.editor.getAttributes('flexItem'))

const flex = computed({

  get() {
    try {
      return attrs.value.flex.find(
        (x) => x.breakpoint == props.breakpoint
      ).flex
    } catch (e) {
      return 'none'
    }
  },

  set(value) { 
    return emits('select-flex-grow-shrink', {
      flex: value, 
      breakpoint: props.breakpoint, 
    })
  }

})

</script>
