<template>
  <node-view-wrapper class="flex">
    {{ node.attrs }}
    <p @click="foo" contenteditable="true">lol</p>
  </node-view-wrapper>
</template>


<script setup>
import { NodeViewWrapper, nodeViewProps, NodeViewContent } from '@tiptap/vue-3';
const props = defineProps(nodeViewProps)
console.log(props)

const foo = () => {
  console.log('lol')
  console.log(props.getPos())
  props.editor.setParagraph()
  props.updateAttributes({'direction': 'col'})
}

</script>



