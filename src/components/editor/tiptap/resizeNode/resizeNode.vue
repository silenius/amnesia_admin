<template>
  <div @mousedown="startResize" @mouseup="stopResize">
    <span :class="[resize_cls, resize_tl]" data-resize="tl" />
    <span :class="[resize_cls, resize_tr]" data-resize="tr" />
    <span :class="[resize_cls, resize_bl]" data-resize="bl" />
    <span :class="[resize_cls, resize_br]" data-resize="br" />
  </div>
</template>

<script setup>

import { 
  computed, ref, watch
} from 'vue'

const props = defineProps({
  node: {
    type: Object
  },
  editor: {
    type: Object
  },
  selected: {
    type: Boolean
  }
})

const emits = defineEmits(['resize'])

const cursorX = ref(null)
const cursorY = ref(null)
const resize_xy = ref({})
const resize_from = ref(null)
const container = props.editor.view.dom
const container_width = computed(() => container?.clientWidth)

watch(() => props.selected, () => {
  if (props.selected) {
    compute_resize_xy()
    window.addEventListener('scroll', compute_resize_xy) 
  } else {
    window.removeEventListener('scroll', compute_resize_xy)
  }
})

const compute_resize_xy = () => {
  const coords = props.node.getBoundingClientRect()

  if (coords) {
    resize_xy.value = {
      scrollY: window.scrollY,
      scrollX: window.scrollX,
      top: coords.top,
      bottom: coords.bottom,
      left: coords.left,
      right: coords.right,
    }

    const diffY = window.scrollY - resize_xy.value.scrollY
    const diffX = window.scrollX - resize_xy.value.scrollX

    resize_xy.value.top -= diffY
    resize_xy.value.bottom -= diffY
    resize_xy.value.left -= diffX
    resize_xy.value.right -= diffX

    resize_xy.value.scrollY = window.scrollY
    resize_xy.value.scrollX = window.scrollX
  }
}

const startResizeMove = (e) => {
  const { clientX, clientY } = e

  const diffs = {
    x: cursorX.value - clientX,
    y: cursorY.value - clientY
  }

  cursorX.value = clientX
  cursorY.value = clientY

  const new_size = {
    width: props.node.clientWidth - diffs.x,
    //height: props.node.clientHeight - diffs.y
  }

  if (new_size.width > container_width.value) {
    new_size.width = container_width.value
  }

  // Preserve ratio
  new_size.height = new_size.width / node_ratio.value

  emits('resize', new_size)
}

const startResize = (e) => {
  resize_from.value = e.target.getAttribute('data-resize')
  cursorX.value = e.clientX
  cursorY.value = e.clientY

  document.addEventListener('mousemove', startResizeMove)
  document.addEventListener('mouseup', stopResize)
}

const stopResize = () => {
  resize_from.value = null
  cursorX.value = null
  cursorY.value = null

  document.removeEventListener('mousemove', startResizeMove)
  document.removeEventListener('mouseup', stopResize)
}

const node_ratio = computed(() => {
  //return props.node.naturalWidth / props.node.naturalHeight
  const rect = props.node.getBoundingClientRect()
  return rect.width / rect.height
})

const resize_cls = 'rounded fixed z-50 h-2 w-2 bg-indigo-500'

const resize_tl = computed(() => {
  return [
    'cursor-nwse-resize', 
    `top-[${resize_xy.value.top}px]`,
    `left-[${resize_xy.value.left}px]`,
  ]
})

const resize_tr = computed(() => {
  return [
    'cursor-nesw-resize',
    `top-[${resize_xy.value.top}px]`,
    `left-[${resize_xy.value.right}px]`
  ]
})

const resize_bl = computed(() => {
  return [
    'cursor-nesw-resize',
    `top-[${resize_xy.value.bottom}px]`,
    `left-[${resize_xy.value.left}px]`
  ]
})

const resize_br = computed(() => {
  return [
    'cursor-nwse-resize',
    `top-[${resize_xy.value.bottom}px]`,
    `left-[${resize_xy.value.right}px]`
  ]
})

</script>
