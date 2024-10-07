<template>
  <node-view-wrapper 
    :class="wrapper_cls"
  >
    <div v-if="src" :class="[align_cls, bg_color_cls, padding_cls]" class="block w-min" draggable>
      <span v-if="editable" data-drag-handle class="rounded
        m-1 p-1 absolute hover:cursor-pointer text-white hover:text-red-500 p-1 z-50
        bg-zinc-800">
        <font-awesome-icon icon="fa-solid fa-hand" /> 
      </span>

      <iframe
        ref="video" 
        :src="src"
        :class="[iframe_cls]" 
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
    </div>
  </node-view-wrapper>

</template>

<script setup>
import { ref, computed } from 'vue'
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3';
import { render_width_attrs } from '../width-extension/utils'
import { render_height_attrs } from '../height-extension/utils'
import { render_float_attrs } from '../float-extension/utils'
import { render_bg_color_attrs } from '../background-color/utils'
import { render_padding_attrs } from '../padding/utils'
import { render_margin_attrs } from '../margin/utils'
import { render_tw_attrs } from '../utils'
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

const wrapper_cls = computed(() => {
  const classes = []
  const attrs = [
    'mx', 'my', 'mt', 'mr', 'mb', 'ml', 'width', 'maxWidth', 'minWidth',
    'height', 'maxHeight', 'minHeight', 'float', 'clear'
  ]

  for (const attr of attrs) {
    const cls = render_tw_attrs(props.node.attrs, attr)?.class

    if (cls) {
      classes.push(cls)
    }
    
  }

  return classes
})

/*
const above_iframe_cls = computed(
  () => `w-[${width_attr.value}px] h-[${height_attr.value}px]`
)
*/

const bg_color_cls = computed(() => {
  const cls = render_bg_color_attrs(props.node.attrs)
  return cls ? Object.values(cls) : []
})

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


const iframe_cls = computed(() => ({
  'outline outline-1 outline-indigo-500 outline-offset-2': props.selected &&
    editable.value,
}))

const align_cls = computed(() => {
  const classes = []

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

const width_attr = computed(() => {
  const v = parseFloat(props.node.attrs.width)
  return isNaN(v) ? null : v
})

const height_attr = computed(() => {
  const v = parseFloat(props.node.attrs.height)
  return isNaN(v) ? null : v
})
</script>
