<template>
  <div class="flex gap-4 mt-4 justify-evenly">
    <div class="flex flex-col items-center text-xs gap-1">
      <button @click.prevent="float='none'"><img :src="floatNone"
        :class="img_cls('none')" /></button>
      <span>none</span>
    </div>
    <div class="flex flex-col items-center text-xs gap-1">
      <button @click.prevent="float='left'"><img :src="floatLeft" :class="img_cls('left')" /></button>
      <span>left</span>
    </div>
    <div class="flex flex-col items-center text-xs gap-1">
      <button @click.prevent="float='right'"><img :src="floatRight" :class="img_cls('right')" /></button>
      <span>right</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import floatLeft from "@/assets/float-left.svg";
import floatRight from "@/assets/float-right.svg";
import floatNone from "@/assets/denied.svg";

const props = defineProps({
  breakpoint: String,
  extension: Object,
  transaction: Object,
  editor: Object
})

const emits = defineEmits(['select-float'])

const attrs = computed(() => {
  if (props.editor.isActive('image')) {
    return props.editor.getAttributes('image')
  } else {
    return props.editor.getAttributes('textClass')
  }
})

const float = computed({

  get() { 
    const v = attrs.value.float?.find((x) => x.breakpoint == props.breakpoint)
    return v !== undefined ? v.direction : ''
  },
  
  set(value) { 
    return emits('select-float', {
      direction: value, breakpoint: props.breakpoint
    })
  }

})

const img_cls = (value) => ['w-8', 'rounded-md', 'bg-slate-100', 'p-1',
  'hover:bg-white', 'hover:p-0.5', value == float.value ? 'outline-offset-2 outline outline-2 outline-pink-700' : '']
</script>
