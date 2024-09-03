<template>
  <node-view-wrapper>
    <node-view-content :class="container_cls" />
  </node-view-wrapper>
</template>


<script setup>
import { ref } from 'vue'

import { NodeViewWrapper, nodeViewProps, NodeViewContent } from '@tiptap/vue-3';
const props = defineProps(nodeViewProps)

const container_cls = ref([
  'flex'
])

</script>



