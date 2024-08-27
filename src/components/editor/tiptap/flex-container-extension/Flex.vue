<template>
    <node-view-content />
  <node-view-wrapper class="flex border border-green-600">
    TESTFDP
  </node-view-wrapper>
</template>


<script setup>
import { NodeViewWrapper, nodeViewProps, NodeViewContent } from '@tiptap/vue-3';
const props = defineProps(nodeViewProps)
console.log(props)

const foo = () => {
  console.log('lol')
  props.editor.commands.setNode('paragraph', {'data-lol': 'TEST 1234'})
  console.log('lol2')
}

</script>



