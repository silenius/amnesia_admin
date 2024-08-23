<template>
  <node-view-wrapper :as="as" :class="[float_cls, margin_cls, clear_cls]">
    <img draggable data-drag-handle 
      ref="img" 
      class="rounded-lg" 
      :src="node.attrs.src" 
      :data-objectid="node.attrs['data-objectid']"
      :width="width_attr"
      :height="height_attr"
      :class="[img_cls, padding_cls, bg_color_cls, align_cls, min_width_cls,
        width_cls, max_width_cls, min_height_cls, height_cls, max_height_cls]" 
    />
    <resizeNode v-if="editable" :editor="editor" :selected="selected" :node="img" @resize="(size) => updateAttributes(size)" v-show="selected && img" /> 
  </node-view-wrapper>
</template>

<script setup>
import { ref, computed } from 'vue'
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3';
import { render_padding_attrs } from '../padding/utils'
import { render_margin_attrs } from '../margin/utils'
import { render_float_attrs } from '../float-extension/utils'
import { render_bg_color_attrs } from '../background-color/utils'
import { render_width_attrs } from '../width-extension/utils'
import { render_maxWidth_attrs } from '../max-width-extension/utils'
import { render_minWidth_attrs } from '../min-width-extension/utils'
import { render_maxHeight_attrs } from '../max-height-extension/utils'
import { render_minHeight_attrs } from '../min-height-extension/utils'
import { render_height_attrs } from '../height-extension/utils'
import { render_clear_attrs } from '../clear-extension/utils'
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

const padding_cls = computed(() => {
  const paddings = []

  for (const padding of ['px', 'py', 'pt', 'pr', 'pb', 'pl']) {
    const cls = render_padding_attrs(props.node.attrs, padding)?.class

    if (cls) {
      paddings.push(cls)
    }
  }

  return paddings
})

const margin_cls = computed(() => {
  const margins = []

  for (const margin of ['mx', 'my', 'mt', 'mr', 'mb', 'ml']) {
    const cls = render_margin_attrs(props.node.attrs, margin)?.class

    if (cls) {
      margins.push(cls)
    }
  }

  return margins
})

const float_cls = computed(() => { 
  const cls = render_float_attrs(props.node.attrs)
  return cls ? Object.values(cls) : []
})

const clear_cls = computed(() => { 
  const cls = render_clear_attrs(props.node.attrs)
  return cls ? Object.values(cls) : []
})

const align_cls = computed(() => {
  if (Array.isArray(props.node.attrs.align)) {
    const maps = {
      left: 'mr-auto',
      right: 'ml-auto',
      center: 'mx-auto'
    }
    return props.node.attrs.align.map((x) => [!x.breakpoint ? `${maps[x.direction]}` :
      `${x.breakpoint}:${maps[x.direction]}`].filter(Boolean).join('-')).join(' ')
  }
})

const bg_color_cls = computed(() => {
  const cls = render_bg_color_attrs(props.node.attrs)
  return cls ? Object.values(cls) : []
})

const width_cls = computed(() => {
  const cls = render_width_attrs(props.node.attrs)
  return cls ? Object.values(cls) : []
})

const max_width_cls = computed(() => {
  const cls = render_maxWidth_attrs(props.node.attrs)
  return cls ? Object.values(cls) : []
})

const min_width_cls = computed(() => {
  const cls = render_minWidth_attrs(props.node.attrs)
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

const max_height_cls = computed(() => {
  const cls = render_maxHeight_attrs(props.node.attrs)
  return cls ? Object.values(cls) : []
})

const min_height_cls = computed(() => {
  const cls = render_minHeight_attrs(props.node.attrs)
  return cls ? Object.values(cls) : []
})

const height_attr = computed(() => {
  const v = parseFloat(props.node.attrs.height)
  return isNaN(v) ? null : v
})

</script>
