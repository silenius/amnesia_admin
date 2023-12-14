<template>
  <node-view-wrapper as="div" class="flex relative not-prose" :class="wrapper_cls">
    <div class="w-fit flex relative">
      <img :src="node.attrs.src" :data-objectid="node.attrs['data-objectid']" :width="node.attrs.width" :height="node.attrs.height" ref="img" class="rounded-lg" draggable="true" :class="img_cls" />
      <!--
<img v-bind="node.attrs" ref="img" class="rounded-lg" draggable="true" :class="img_cls" />

-->
      <div v-if="selected" @mousedown="startResize" @mouseup="stopResize">
        <span :class="resize_cls" data-resize="tl" class="cursor-nwse-resize -top-1 -left-1" />
        <span :class="resize_cls" data-resize="tr" class="cursor-nesw-resize -top-1 -right-1" />
        <span :class="resize_cls" data-resize="bl" class="cursor-nesw-resize -bottom-1 -left-1" />
        <span :class="resize_cls" data-resize="br" class="cursor-nwse-resize -bottom-1 -right-1" />
      </div>
    </div>

  </node-view-wrapper>
</template>

<script setup>
import { watch, ref, computed } from 'vue'
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3';

const props = defineProps(nodeViewProps)
const img = ref(null)
const img_ratio = computed(() => img?.value.naturalWidth / img?.value.naturalHeight)
const cursorX = ref(null)
const cursorY = ref(null)
const resize_from = ref(null)
const container = props.editor.view.dom
const container_width = computed(() => container?.clientWidth)

const resize_cls = 'rounded absolute z-50 h-2 w-2 bg-indigo-500'

const img_cls = computed(() => ({
  'outline outline-1 outline-indigo-500 outline-offset-2': props.selected,
}))

const wrapper_cls = computed(() => ({
  'justify-start': props.node.attrs.textAlign === 'left',
  'justify-end': props.node.attrs.textAlign === 'right',
  'justify-center': props.node.attrs.textAlign === 'center',
}))

watch(() => props.selected, () => {
  console.log(`Selected: ${props.selected}`)
  console.log(props.node.attrs)
})

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

const startResizeMove = (e) => {
  const { clientX, clientY } = e

  const diffs = {
    x: cursorX.value - clientX,
    y: cursorY.value - clientY
  }

  const dirs = {
    x: diffs.x > 0 ? 'left' : 'right',
    y: diffs.y > 0 ? 'up' : 'down'
  }

  cursorX.value = clientX
  cursorY.value = clientY

  const new_size = {
    width: img.value.width,
    height: img.value.height
  }

  if (dirs.x == 'left') {
    new_size.width = new_size.width - Math.abs(diffs.x)
  } else {
    new_size.width = new_size.width + Math.abs(diffs.x)
  }

  new_size.height = new_size.width / img_ratio.value

  if (dirs.y == 'up') {
    new_size.height = new_size.height - Math.abs(diffs.y)
  } else {
    new_size.height = new_size.height + Math.abs(diffs.y)
  }

  new_size.width = new_size.height * img_ratio.value

  if (new_size.width > container_width.value) {
    new_size.width = container_width.value
    new_size.height = new_size.width / img_ratio.value
  }

  props.updateAttributes(new_size)
}

</script>
