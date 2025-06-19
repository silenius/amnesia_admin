<template>
  <div class="flex gap-4 mt-4 justify-evenly">

    <div class="flex flex-col items-center text-xs gap-1">
      <button @click.prevent="align='text-left'">
        <font-awesome-icon icon="fa-solid fa-align-left" :class="img_cls('text-left')" />
      </button>
      <span>left</span>
    </div>

    <div class="flex flex-col items-center text-xs gap-1">
      <button @click.prevent="align='text-center'">
        <font-awesome-icon icon="fa-solid fa-align-center" :class="img_cls('text-center')" />
      </button>
      <span>center</span>
    </div>

    <div class="flex flex-col items-center text-xs gap-1">
      <button @click.prevent="align='text-right'">
        <font-awesome-icon icon="fa-solid fa-align-right" :class="img_cls('text-right')" />
      </button>
      <span>right</span>
    </div>

    <div class="flex flex-col items-center text-xs gap-1">
      <button @click.prevent="align='text-justify'">
        <font-awesome-icon icon="fa-solid fa-align-justify" :class="img_cls('text-justify')" />
      </button>
      <span>justify</span>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getSelectedAttrs } from '@/components/editor/tiptap/utils'
import { props_extension } from '../utils';

const props = defineProps(props_extension)
const emits = defineEmits(['select-align'])

const align = computed({

  get() { 
    try {
      return getSelectedAttrs(props, 'align')
    } catch (e) {
      return undefined
    }
  },

  set(value) { 
    return emits('select-align', {
      align: value === align.value ? undefined : value, 
      breakpoint: props.breakpoint
    })
  }

})

const img_cls = (value) => ['w-8', 'h-8', 'rounded-md', 'p-1',
  'hover:bg-slate-800', value == align.value ? 'outline-offset-2 outline outline-2 outline-pink-700' : '']
</script>
