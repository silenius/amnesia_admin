<template>
  <node-view-wrapper :gapX="node.attrs.gapX">
    <node-view-content class="flex" />
  </node-view-wrapper>
</template>


<script setup>
import { NodeViewWrapper, nodeViewProps, NodeViewContent } from '@tiptap/vue-3';
const props = defineProps(nodeViewProps)
console.log('PROPS: ', props)

const foo = () => {
  console.log('lol')
  props.editor.commands.setNode('paragraph', {'data-lol': 'TEST 1234'})
  console.log('lol2')
}

</script>



