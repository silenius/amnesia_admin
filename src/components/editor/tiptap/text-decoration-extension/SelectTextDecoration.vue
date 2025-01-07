<template>
  <div>
    <button @click.prevent="decoration='underline'">
      <img :src="underlineImg" :class="img_cls('underline')" />
    </button>

    <button @click.prevent="decoration='overline'">
      <img :src="overlineImg" :class="img_cls('overline')" />
    </button>

    <button @click.prevent="decoration='line-through'">
      <img :src="linethroughImg" :class="img_cls('line-through')" />
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import underlineImg from "@/assets/underline.svg";
import overlineImg from "@/assets/overline.svg";
import linethroughImg from "@/assets/strikethrough.svg";
import { getTypeAttrs } from '@/components/editor/tiptap/utils'

const props = defineProps({
  breakpoint: String,
  extension: Object,
  editor: Object
})

const emits = defineEmits(['select-text-decoration'])

const decoration = computed({

  get() { 
    try {
      return getTypeAttrs(props, 'textDecoration')
    } catch (e) {
      return undefined
    }
  },

  set(value) { 
    if (value == decoration.value) {
      value = null
    }

    return emits('select-text-decoration', {
      decoration: value, 
      breakpoint: props.breakpoint
    })
  }

})

const img_cls = (value) => ['w-8', 'h-8', 'rounded-md', 'bg-slate-100', 'p-1',
  'hover:bg-white', 'hover:p-0.5', value == decoration.value ? 'outline-offset-2 outline outline-2 outline-pink-700' : '']
</script>
