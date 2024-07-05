<template>
  <node-view-wrapper 
    :class="[width_cls, height_cls, float_cls, margin_cls]"
  >

    <span v-if="src" draggable data-drag-handle class="p-2 border z-50 bg-white">
      <font-awesome-icon icon="fa-solid fa-up-down-left-right" /> 
    </span>
      <iframe
        v-if="src"
        ref="video" 
        :src="src"
        :class="[iframe_cls, align_cls]" 
        :width="width_attr" 
        :height="height_attr" 
        title="Video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin" 
        allowfullscreen>
    </iframe>
    <resizeNode :editor="editor" :selected="selected" :node="video"
      @resize="(size) => updateAttributes(size)" v-if="node && editable" v-show="selected && video" /> 
  </node-view-wrapper>

</template>

<script setup>
import { ref, computed } from 'vue'
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3';
import { render_width_attrs } from '../width-extension/utils'
import { render_height_attrs } from '../height-extension/utils'
import { render_float_attrs } from '../float-extension/utils'
import { render_margin_attrs } from '../margin/utils'
import resizeNode from '../resizeNode/resizeNode.vue'

const props = defineProps(nodeViewProps)
const video = ref()

const editable = computed(() => props.editor.view.editable)
const src = computed(() => {
  const opts = new URLSearchParams()

  let url

  switch(props.node.attrs['data-type']) {
    case 'youtube':
      url = `https://www.youtube.com/embed/${props.node.attrs['data-videoid']}`
      opts.append('autoplay', props.node.attrs['data-autoplay'] ? 1 : 0)
      opts.append('controls', props.node.attrs['data-showcontrols'] ? 1 : 0)
      break
    case 'vimeo':
      url = `https://player.vimeo.com/video/${props.node.attrs['data-videoid']}`
      opts.append('autoplay', props.node.attrs['data-autoplay'] ? 1 : 0)
      break
    case 'dailymotion':
      break
  }

  if (url) {
    return opts.size > 0 ? `${url}?${opts.toString()}` : url
  }

})

/*
const above_iframe_cls = computed(
  () => `w-[${width_attr.value}px] h-[${height_attr.value}px]`
)
*/

const iframe_cls = computed(() => ({
  'outline outline-1 outline-indigo-500 outline-offset-2': props.selected &&
    editable.value,
}))

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

const align_cls = computed(() => {
  if (Array.isArray(props.node.attrs.align)) {
    const maps = {
      left: 'block mr-auto',
      right: 'block ml-auto',
      center: 'block mx-auto'
    }
    return props.node.attrs.align.map((x) => [!x.breakpoint ? `${maps[x.direction]}` :
      `${x.breakpoint}:${maps[x.direction]}`].filter(Boolean).join('-')).join(' ')
  }
})

const height_attr = computed(() => {
  const v = parseFloat(props.node.attrs.height)
  return isNaN(v) ? null : v
})

</script>
