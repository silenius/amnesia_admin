<template>
  <node-view-wrapper as="span">
    <img v-bind="node.attrs" ref="image" /> 

  </node-view-wrapper>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3';

const image = ref(null)

onMounted(() => {
  console.log(image)
})
</script>

