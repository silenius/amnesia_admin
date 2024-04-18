<template>

  <button @click.prevent="doSelectItalic">
    <span v-if="italic == 'not-italic'" class="relative">
      <font-awesome-icon icon="fa-solid fa-ban" :class="img_cls" class="absolute" />
      <font-awesome-icon icon="fa-solid fa-italic" :class="img_cls" />
    </span>
    <font-awesome-icon v-else icon="fa-solid fa-italic" :class="img_cls" />
  </button>

</template>

<script setup>
import { computed, ref } from 'vue'

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

const img_cls = computed(() => [
  'w-8', 'h-8', 'rounded-md', 'p-1', 'hover:bg-slate-800',
  italic.value == 'italic' ? 'outline-offset-2 outline outline-2 outline-pink-700': ''
])

</script>
