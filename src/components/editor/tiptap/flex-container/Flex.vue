<template>
  <node-view-wrapper as="div" :class="cls" class="w-full flex border border-red-500">
  </node-view-wrapper>
</template>


<script setup>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3';
import { ref, computed } from 'vue'

const props = defineProps(nodeViewProps)

console.log(props)

const cls = computed(() => ({
  'flex-row': props.node.attrs.flexDirection === 'row',
  'flex-row-reverse': props.node.attrs.flexDirection === 'row-reverse',
  'flex-col': props.node.attrs.flexDirection === 'column',
  'flex-col-reverse': props.node.attrs.flexDirection === 'column-reverse',
  'justify-normal': props.node.attrs.justifyContent === 'normal',
  'justify-start': props.node.attrs.justifyContent === 'flex-start',
  'justify-end': props.node.attrs.justifyContent === 'flex-end',
  'justify-center': props.node.attrs.justifyContent === 'center',
  'justify-between': props.node.attrs.justifyContent === 'space-between',
  'justify-around': props.node.attrs.justifyContent === 'space-around',
  'justify-evenly': props.node.attrs.justifyContent === 'space-evenly',
  'justify-stretch': props.node.attrs.justifyContent === 'stretch',
}))
</script>


