<template>
  <node-view-wrapper as="span">
    <img v-bind="node.attrs" :draggable="isDraggable" :data-drag-handle="isDraggable" ref="resizableImg" /> 
  </node-view-wrapper>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3';

const resizableImg = ref(null)
const isResizing = ref(false)
const lastMovement = ref(0)
const	aspectRatio = ref(0)

const isDraggable = computed( () => true)

onMounted( () => {
  resizableImg.value.onload = () => {
    aspectRatio.value = resizableImg.value.naturalWidth / resizableImg.naturalHeight;
  };

  resizableImg.value.addEventListener('mousedown', (e) => {
    isResizing.value = true;
  });

  resizableImg.value.addEventListener('mousemove', (e) => {
    let movement = Math.sqrt(Math.pow(e.offsetY, 2) + Math.pow(e.offsetX, 2));

    if (lastMovement.value > 0) {
      if (movement > lastMovement.value) {
        resizeAspectRatio(true);
      } else if (movement < lastMovement.value) {
        resizeAspectRatio(false);
      }
    }

    lastMovement.value = movement;
  });

  resizableImg.value.addEventListener('mouseup', (e) => {
    isResizing.value = false;
    lastMovement.value = 0;
  });
})

const resizeAspectRatio = (grow) => {
  console.log('LOL')
  let calcW
  let calcH

  if (grow) {
    calcH = resizableImg.value.height + 1;
  } else {
    calcH = resizableImg.value.height - 1;
  }

  calcW = calcH * aspectRatio.value;

  resizableImg.value.updateAttributes({ width: calcW, height: calcH });
}
</script>

