<template>
  <node-view-wrapper
    as="article"
    class="relative flex"
  >
    <div class="w-fit flex relative">
      <img v-bind="node.attrs" ref="img" class="rounded-lg" draggable="true"
        :class="[selected ? 'outline-2 outline-indigo-700 outline-dotted' : '']" />

      <div
        class="absolute hover:bg-indigo-500 z-50 opacity-50 h-full w-2 top-0 right-0 cursor-col-resize" title="Resize"
        @mousedown="startResize"
        @mouseup="stopResize"
        v-if="selected"
      />

      <div
        class="absolute hover:bg-indigo-500 z-50 opacity-50 w-full h-2 bottom-0 left-0 cursor-row-resize" title="Resize"
        @mousedown="startResize"
        @mouseup="stopResize"
        v-if="selected"
      />
      <!--
<span class="absolute z-50 h-2 w-2 -top-1 -left-1 bg-indigo-500" />
<span class="absolute z-50 h-2 w-2 -top-1 -right-1 bg-indigo-500" />
<span class="absolute z-50 h-2 w-2 -bottom-1 -left-1 bg-indigo-500" />
<span class="absolute z-50 h-2 w-2 -bottom-1 -right-1 bg-indigo-500" />

-->
    </div>
  </node-view-wrapper>
</template>

<script setup>
import { watch, ref, computed } from 'vue'
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from '@tiptap/vue-3';
import { Node as ProseMirrorNode } from 'prosemirror-model'

const img = ref(null)
const container = document.querySelector('.ProseMirror')
const container_width = computed(() => container?.clientWidth)
const aspectRatio = computed(() => img?.value.naturalWidth / img?.value.naturalHeight)
const cursorX = ref(-1)
const cursorY = ref(-1)
const props = defineProps(nodeViewProps)

watch(() => props.selected, () => {
  console.log(`Selected: ${props.selected}`)
})

const doResize = (dirs, diffs) => {
  const new_size = {
    width: img.value.width,
    height: img.value.height,
  }

  if (dirs.x == 'left') {
    new_size.width = new_size.width - Math.abs(diffs.x)
  } else {
    new_size.width = new_size.width + Math.abs(diffs.x)
  }

  new_size.height = new_size.width / aspectRatio.value

  if (dirs.y == 'up') {
    new_size.height = new_size.height - Math.abs(diffs.y)
  } else {
    new_size.height = new_size.height + Math.abs(diffs.y)
  }

  new_size.width = new_size.height * aspectRatio.value

  /* 

  if (new_size.width > container_width.value) {
    new_size.width = container_width.value
    new_size.height = new_size.width / aspectRatio.value
  }
  */

  props.updateAttributes(new_size)
}

const startResize = (e) => {
  cursorX.value = e.clientX
  cursorY.value = e.clientY

  document.addEventListener('mousemove', startResizeMove)
  document.addEventListener('mouseup', stopResize)
}

const stopResize = () => {
  cursorX.value = -1
  cursorY.value = -1

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

  doResize(dirs, diffs)
}

</script>
