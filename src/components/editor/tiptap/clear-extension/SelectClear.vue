<template>
  <div class="flex gap-4 mt-4 justify-evenly">
    <div class="flex flex-col items-center text-xs gap-1">
      <button @click.prevent="clear='none'"><img :src="clearNone"
        :class="img_cls('none')" /></button>
      <span>none</span>
    </div>
    <div class="flex flex-col items-center text-xs gap-1">
      <button @click.prevent="clear='left'"><img :src="clearLeft" :class="img_cls('left')" /></button>
      <span>left</span>
    </div>
    <div class="flex flex-col items-center text-xs gap-1">
      <button @click.prevent="clear='right'"><img :src="clearRight" :class="img_cls('right')" /></button>
      <span>right</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import clearLeft from "@/assets/float-left.svg";
import clearRight from "@/assets/float-right.svg";
import clearNone from "@/assets/denied.svg";

const props = defineProps({
  breakpoint: String,
  extension: Object,
  transaction: Object,
  editor: Object
})

const emits = defineEmits(['select-clear'])

const attrs = computed(() => {
  const type = props.extension.options.types.find(
    (x) => props.editor.isActive(x)
  )

  if (type) {
    return props.editor.getAttributes(type)
  }
})

const clear = computed({

  get() { 
    try {
      return attrs.value.clear.find(
        (x) => x.breakpoint == props.breakpoint
      ).clear
    } catch (e) {
      return null
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
