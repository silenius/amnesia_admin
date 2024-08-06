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
    return v !== undefined ? v.decoration : null
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
