<template>
  <node-view-wrapper class="flex">
    <p>foo1</p>
    <p data-node-view-content="'foo2'">foo2</p>
    <p>foo3</p>
  </node-view-wrapper>
</template>


<script setup>
import { NodeViewWrapper, nodeViewProps, NodeViewContent } from '@tiptap/vue-3';
const props = defineProps(nodeViewProps)
</script>


