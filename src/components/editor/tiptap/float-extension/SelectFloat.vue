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
  const type = props.extension.options.types.find(
    (x) => props.editor.isActive(x)
  )

  if (type) {
    return props.editor.getAttributes(type)
  }
})

const float = computed({

  get() { 
    try {
      return attrs.value.float.find(
        (x) => x.breakpoint == props.breakpoint
      ).float
    } catch (e) {
      return null
    }
  },
  
  set(value) { 
    if (value == float.value) {
      value = undefined
    }

    return emits('select-float', {
      float: value, 
      breakpoint: props.breakpoint
    })
  }

})

const img_cls = (value) => ['w-8', 'rounded-md', 'bg-slate-100', 'p-1',
  'hover:bg-white', 'hover:p-0.5', value == float.value ? 'outline-offset-2 outline outline-2 outline-pink-700' : '']
</script>
