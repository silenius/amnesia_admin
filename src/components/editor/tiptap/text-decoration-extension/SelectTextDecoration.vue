<template>
  <div class="flex gap-4 mt-4 justify-evenly">

    <div class="flex flex-col items-center text-xs gap-1">
      <button @click.prevent="decoration='underline'">
        <img :src="underlineImg" :class="img_cls('underline')" />
      </button>
      <span>under</span>
    </div>

    <div class="flex flex-col items-center text-xs gap-1">
      <button @click.prevent="decoration='overline'">
        <img :src="overlineImg" :class="img_cls('overline')" />
      </button>
      <span>over</span>
    </div>

    <div class="flex flex-col items-center text-xs gap-1">
      <button @click.prevent="decoration='line-through'">
        <img :src="linethroughImg" :class="img_cls('line-through')" />
      </button>
      <span>through</span>
    </div>

    <div class="flex flex-col items-center text-xs gap-1">
      <button @click.prevent="decoration='no-underline'">
        <font-awesome-icon icon="fa-solid fa-align-justify" :class="img_cls('justify')" />
      </button>
      <span>no underline</span>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import underlineImg from "@/assets/underline.svg";
import overlineImg from "@/assets/overline.svg";
import linethroughImg from "@/assets/strikethrough.svg";

const props = defineProps({
  breakpoint: String,
  extension: Object,
  transaction: Object,
  editor: Object
})

const emits = defineEmits(['select-text-decoration'])

const decorations = computed(() => props.extension.options.decorations)

const attrs = computed(() => props.editor.getAttributes('textClass'))

const decoration = computed({

  get() { 
    const v = attrs.value.textDecoration?.find((x) => x.breakpoint == props.breakpoint)
    return v !== undefined ? v.decoration : ''
  },

  set(value) { 
    return emits('select-text-decoration', {
      decoration: value, breakpoint: props.breakpoint
    })
  }

})

const img_cls = (value) => ['w-8', 'rounded-md', 'bg-slate-100', 'p-1',
  'hover:bg-white', 'hover:p-0.5', value == decoration.value ? 'outline-offset-2 outline outline-2 outline-pink-700' : '']
</script>
