<template>
  <node-view-wrapper>

    <iframe draggable data-drag-handle 
      ref="video" 
      :src="node.attrs.src"
      :class="[width_cls, height_cls]" :width="width_attr" :height="height_attr" src="https://www.youtube.com/embed/QBgi4TbdYeI?si=uXHaZNIIRC_bIe5B" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    <resizeNode :editor="editor" :selected="selected" :node="video" @resize="(size) => updateAttributes(size)" v-show="selected && video" /> 

  </node-view-wrapper>

</template>

<script setup>
import { watch, ref, computed } from 'vue'
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3';
import { render_width_attrs } from '../width-extension/utils'
import { render_height_attrs } from '../height-extension/utils'
import resizeNode from '../resizeNode/resizeNode.vue'

const props = defineProps(nodeViewProps)
const video = ref()

const width_cls = computed(() => {
  const cls = render_width_attrs(props.node.attrs)
  return cls ? Object.values(cls) : []
})

const width_attr = computed(() => {
  const v = parseFloat(props.node.attrs.width)
  return isNaN(v) ? null : v
})

const height_cls = computed(() => {
  const cls = render_height_attrs(props.node.attrs)
  return cls ? Object.values(cls) : []
})

const height_attr = computed(() => {
  const v = parseFloat(props.node.attrs.height)
  return isNaN(v) ? null : v
})



</script>
