<template>
  <node-view-wrapper :as="as" :class="wrapper_cls">
    <img draggable data-drag-handle 
      ref="img" 
      class="rounded-lg" 
      :src="node.attrs.src" 
      :data-objectid="node.attrs['data-objectid']"
      :width="width_attr"
      :height="height_attr"
      :class="[img_cls, extra_cls_img, bg_color_cls]" 
    />
    <resizeNode v-if="editable" :editor="editor" :selected="selected" :node="img" @resize="(size) => updateAttributes(size)" v-show="selected && img" /> 
  </node-view-wrapper>
</template>

<script setup>
import { ref, computed } from 'vue'
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3';
import { render_bg_color_attrs } from '../background-color/utils'
import { render_tw_attrs } from '../utils'
import resizeNode from '../resizeNode/resizeNode.vue'

const props = defineProps(nodeViewProps)

const img = ref()

const as = computed(() => props.node.type.spec.inline ? 'span' : 'p')

const editable = computed(() => props.editor.view.editable)

const img_cls = computed(() => ({
  'outline outline-1 outline-indigo-500 outline-offset-2': props.selected &&
    editable.value,
  'inline': props.node.type.spec.inline,
  'block': !props.node.type.spec.inline
}))

const wrapper_cls = computed(() => {
  const classes = []
  const attrs = [
    'mx', 'my', 'mt', 'mr', 'mb', 'ml', 'float', 'clear'
  ]

  for (const attr of attrs) {
    const cls = render_tw_attrs(props.node.attrs, attr)?.class

    if (cls) {
      classes.push(cls)
    }
    
  }

  return classes
})

const extra_cls_img = computed(() => {
  const classes = []
  const attrs = [
    'px', 'py', 'pt', 'pr', 'pb', 'pl', 'width', 'maxWidth', 'minWidth',
    'height', 'maxHeight', 'minHeight',
  ]

  for (const attr of attrs) {
    const cls = render_tw_attrs(props.node.attrs, attr)?.class

    if (cls) {
      classes.push(cls)
    }
  }

  const aligns = {
      'text-left': 'mr-auto',
      'text-right': 'ml-auto',
      'text-center': 'mx-auto'
  }

  const cls = aligns[render_tw_attrs(props.node.attrs, 'align')?.class]

  if (cls) {
    classes.push(cls)
  }

  return classes
})

const bg_color_cls = computed(() => {
  const cls = render_bg_color_attrs(props.node.attrs)
  return cls ? Object.values(cls) : []
})

const width_attr = computed(() => {
  const v = parseFloat(props.node.attrs.width)
  return isNaN(v) ? null : v
})

const height_attr = computed(() => {
  const v = parseFloat(props.node.attrs.height)
  return isNaN(v) ? null : v
})

</script>
