<template>
  <div class="flex gap-4 mt-4 justify-evenly">

    <div class="flex flex-col items-center text-xs gap-1">
      <button @click.prevent="align='left'">
        <font-awesome-icon icon="fa-solid fa-align-left" :class="img_cls('left')" />
      </button>
      <span>left</span>
    </div>

    <div class="flex flex-col items-center text-xs gap-1">
      <button @click.prevent="align='center'">
        <font-awesome-icon icon="fa-solid fa-align-center" :class="img_cls('center')" />
      </button>
      <span>center</span>
    </div>

    <div class="flex flex-col items-center text-xs gap-1">
      <button @click.prevent="align='right'">
        <font-awesome-icon icon="fa-solid fa-align-right" :class="img_cls('right')" />
      </button>
      <span>right</span>
    </div>

    <div class="flex flex-col items-center text-xs gap-1">
      <button @click.prevent="align='justify'">
        <font-awesome-icon icon="fa-solid fa-align-justify" :class="img_cls('justify')" />
      </button>
      <span>justify</span>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getTypeAttrs } from '@/components/editor/tiptap/utils'

const props = defineProps({
  breakpoint: String,
  extension: Object,
  transaction: Object,
  editor: Object,
  type: String
})

const emits = defineEmits(['select-align'])

const align = computed({

  get() { 
    try {
      return getTypeAttrs(props).align.find(
        (x) => x.breakpoint == props.breakpoint
      ).direction
    } catch (e) {
      return undefined
    }
  },

  set(value) { 
    return emits('select-align', {
      direction: value === align.value ? undefined : value, 
      breakpoint: props.breakpoint
    })
  }

})

const img_cls = (value) => ['w-8', 'h-8', 'rounded-md', 'p-1',
  'hover:bg-slate-800', value == align.value ? 'outline-offset-2 outline outline-2 outline-pink-700' : '']
</script>
