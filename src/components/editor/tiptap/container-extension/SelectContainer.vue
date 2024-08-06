<template>
  <div>
      <button @click.prevent="container='container'">
        <font-awesome-icon :class="img_cls" icon="fa-solid fa-square-person-confined" />
      </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  breakpoint: String,
  extension: Object,
  transaction: Object,
  editor: Object
})

const emits = defineEmits(['select-container'])

const attrs = computed(() => {
  const type = props.extension.options.types.find(
    (x) => props.editor.isActive(x)
  )

  if (type) {
    return props.editor.getAttributes(type)
  }
})

const container = computed({

  get() { 
    try {
      return attrs.value.container.find(
        (x) => x.breakpoint == props.breakpoint
      ).container
    } catch (e) {
      return null
    }
  },
  
  set(value) { 
    if (value == container.value) {
      value = null
    }

    return emits('select-container', {
      container: value, 
      breakpoint: props.breakpoint
    })
  }

})
const img_cls = computed(() => ['w-8 h-8 rounded-md bg-slate-100 p-1 hover:bg-white text-gray-800', container.value ? 'outline-offset-2 outline outline-2 outline-pink-700' : ''])
</script>
