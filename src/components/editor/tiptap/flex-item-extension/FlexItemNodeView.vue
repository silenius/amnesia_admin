<template>
  <node-view-wrapper class="relative">
    <span @click.prevent="deleteNode()" class="absolute right-0 translate-x-4 text-red-500">
      <font-awesome-icon icon="fa-solid fa-xmark" class="w-4 h-4" />
    </span>
    <NodeViewContent />
  </node-view-wrapper>
</template>

<script setup>
import { ref, computed } from 'vue'
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from '@tiptap/vue-3';

const props = defineProps(nodeViewProps)
</script>
