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
        @mousedown="startHorizontalResize"
        @mouseup="stopHorizontalResize"
        v-if="selected"
      />

      <div
        class="absolute hover:bg-indigo-500 z-50 opacity-50 w-full h-2 bottom-0 left-0 cursor-row-resize" title="Resize"
        @mousedown="startVerticalResize"
        @mouseup="stopVerticalResize"
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
const active_resize = ref(false)
const lastCursorX = ref(-1)
const lastCursorY = ref(-1)
const props = defineProps(nodeViewProps)

watch(() => props.selected, () => {
  console.log(`Selected: ${props.selected}`)
})

const onResize = (direction, diff) => {
  diff = Math.abs(diff)

  const current_size = {
    width: img.value?.width,
    height: img.value?.height,
  }

  const new_size = {
    width: -1,
    height: -1,
  }

  switch(direction) {
    case 'left':
      new_size.width = current_size.width - diff
      break
    case 'right':
      new_size.width = current_size.width + diff
      break
    case 'up':
      new_size.height = current_size.height - diff
      break
    case 'down':
      new_size.height = current_size.height + diff
      break
  }

  switch(direction) {
    case 'left':
    case 'right':
      if (new_size.width > container_width.value) {
        new_size.width = container_width.value
      }

      new_size.height = new_size.width / aspectRatio.value
      break
    case 'up':
    case 'down':
      new_size.width = new_size.height * aspectRatio.value

      if (new_size.width > container_width.value) {
        new_size.width = container_width.value
        new_size.height = new_size.width / aspectRatio.value
      }
      break
  }

  props.updateAttributes(new_size)
}

const startHorizontalResize = (e) => {
  console.log(e)
  active_resize.value = 'x'
  lastCursorX.value = e.clientX

  document.addEventListener('mousemove', onHorizontalMouseMove)
  document.addEventListener('mouseup', stopHorizontalResize)
}

const stopHorizontalResize = () => {
  active_resize.value = false
  lastCursorX.value = -1

  document.removeEventListener('mousemove', onHorizontalMouseMove)
  document.removeEventListener('mouseup', stopHorizontalResize)
}


const startVerticalResize = (e) => {
  active_resize.value = 'y'
  lastCursorY.value = e.clientY

  document.addEventListener('mousemove', onVerticalMouseMove)
  document.addEventListener('mouseup', stopVerticalResize)
}

const stopVerticalResize = () => {
  active_resize.value = false
  lastCursorY.value = -1

  document.removeEventListener('mousemove', onVerticalMouseMove)
  document.removeEventListener('mouseup', stopVerticalResize)
}

const onHorizontalMouseMove = (e) => {
  console.log(e)
  const { clientX } = e
  if (!active_resize.value === 'x') return

  const diff = lastCursorX.value - clientX

  lastCursorX.value = clientX

  if (diff === 0) return

  const direction = diff > 0 ? 'left' : 'right'

  onResize(direction, diff)
}

const onVerticalMouseMove = ({ clientY } = e) => {
  if (!active_resize.value === 'y') return

  const diff = lastCursorY.value - clientY

  lastCursorY.value = clientY

  if (diff === 0) return

  const direction = diff > 0 ? 'up' : 'down'

  onResize(direction, diff)
}

</script>
