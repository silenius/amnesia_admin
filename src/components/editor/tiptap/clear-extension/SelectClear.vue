<template>
  <div class="flex gap-4 mt-4 justify-evenly">
    <div class="flex flex-col items-center text-xs gap-1">
      <button @click.prevent="clear='clear-none'"><img :src="clearNone"
        :class="img_cls('clear-none')" /></button>
      <span>none</span>
    </div>
    <div class="flex flex-col items-center text-xs gap-1">
      <button @click.prevent="clear='clear-left'"><img :src="clearLeft" :class="img_cls('clear-left')" /></button>
      <span>left</span>
    </div>
    <div class="flex flex-col items-center text-xs gap-1">
      <button @click.prevent="clear='clear-right'"><img :src="clearRight" :class="img_cls('clear-right')" /></button>
      <span>right</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getTypeAttrs } from '@/components/editor/tiptap/utils'
import clearLeft from "@/assets/float-left.svg";
import clearRight from "@/assets/float-right.svg";
import clearNone from "@/assets/denied.svg";

const props = defineProps({
  breakpoint: String,
  extension: Object,
  transaction: Object,
  editor: Object,
  type: String
})

const emits = defineEmits(['select-clear'])

const clear = computed({
  get() { 
    try {
      return getTypeAttrs(props).clear.find(
        (x) => x.breakpoint == props.breakpoint
      ).tw
    } catch (e) {
      return undefined
    }
  },
 
  set(value) { 
    if (value == clear.value) {
      value = undefined
    }

    return emits('select-clear', {
      clear: value, 
      breakpoint: props.breakpoint
    })
  }

})

const img_cls = (value) => ['w-8', 'rounded-md', 'bg-slate-100', 'p-1',
  'hover:bg-white', 'hover:p-0.5', value == clear.value ? 'outline-offset-2 outline outline-2 outline-pink-700' : '']
</script>
