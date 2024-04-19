<template>

  <div>
    <button @click.prevent="doSelectItalic">
      <div class="flex flex-col items-center text-xs gap-1">
        <button @click.prevent="doSelectItalic">
          <img :src="italicImg" :class="img_cls" />
        </button>
        <span>italic</span>
      </div>
    </button>
  </div>

</template>

<script setup>
import { computed } from 'vue'
import italicImg from "@/assets/italic.svg";

const props = defineProps({
  breakpoint: String,
  extension: Object,
  transaction: Object,
  editor: Object,
})

const emits = defineEmits([
  'select-font-italic'
])

const italics = computed(() => props.extension.options.italics)

const attrs = computed(() => props.editor.getAttributes('textClass'))

const doSelectItalic = () => {
  const current = italics.value.indexOf(italic.value)

  if (current === -1) {
    italic.value = italics.value[0]
  } else if (current + 1 == italics.value.length) {
    italic.value = null
  } else {
    italic.value = italics.value[current + 1]
  }

}

const italic = computed({

  get() { 
    const v = attrs.value.fontItalic?.find((x) => x.breakpoint == props.breakpoint)
    return v !== undefined ? v.italic : null
  },

  set(value) { 
    return emits('select-font-italic', {
      italic: value, breakpoint: props.breakpoint
    })
  }

})

const img_cls = computed(() => ['w-8 h-8 rounded-md bg-slate-100 p-1 hover:bg-white hover:p-0.5', italic.value == 'italic' ? 'outline-offset-2 outline outline-2 outline-pink-700' : italic.value == 'not-italic' ? 'outline-offset-2 outline outline-4 outline-red-700' : ''])
</script>
