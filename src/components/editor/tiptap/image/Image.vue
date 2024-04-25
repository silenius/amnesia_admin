<template>
  <node-view-wrapper>
    <img draggable data-drag-handle 
      ref="img" class="rounded-lg" 
      :src="node.attrs.src" 
      :data-objectid="node.attrs['data-objectid']"
      :width="node.attrs.width"
      :height="node.attrs.height"
      :class="[img_cls, padding_cls, margin_cls, bg_color_cls, float_cls, align_cls]" 
    />
    <div v-if="selected && editable" @mousedown="startResize" @mouseup="stopResize">
      <span :class="[resize_cls, resize_tl]" data-resize="tl" />
      <span :class="[resize_cls, resize_tr]" data-resize="tr" />
      <span :class="[resize_cls, resize_bl]" data-resize="bl" />
      <span :class="[resize_cls, resize_br]" data-resize="br" />
    </div>
  </node-view-wrapper>
</template>

<script setup>
import { watch, ref, computed } from 'vue'
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3';
import { backend_url } from '@/composables/fetch.js';
import { render_padding_attrs } from '../padding/utils'
import { render_margin_attrs } from '../margin/utils'
import { render_float_attrs } from '../float-extension/utils'
import { render_bg_color_attrs } from '../background-color/utils'
import { render_width_attrs } from '../width-extension/utils'

const props = defineProps(nodeViewProps)
const img = ref(null)
const img_ratio = computed(() => img?.value.naturalWidth / img?.value.naturalHeight)
const cursorX = ref(null)
const cursorY = ref(null)
const resize_from = ref(null)
const container = props.editor.view.dom
const container_width = computed(() => container?.clientWidth)
const editable = computed(() => props.editor.view.editable)

const resize_xy = ref({})

const handleScroll = (e) => {
  const diffY = window.scrollY - resize_xy.value.scrollY
  const diffX = window.scrollX - resize_xy.value.scrollX

  resize_xy.value.top -= diffY
  resize_xy.value.bottom -= diffY
  resize_xy.value.left -= diffX
  resize_xy.value.right -= diffX

  resize_xy.value.scrollY = window.scrollY
  resize_xy.value.scrollX = window.scrollX
}

watch(() => props.selected, () => {
  const coords = img.value.getBoundingClientRect()

  resize_xy.value = {
    scrollY: window.scrollY,
    scrollX: window.scrollX,
    top: coords.top,
    bottom: coords.bottom,
    left: coords.left,
    right: coords.right,
  }

  if (props.selected) {
    window.addEventListener('scroll', handleScroll)
  } else {
    window.removeEventListener('scroll', handleScroll)
  }
})

console.debug('===>>> Image component props: ', props)

const resize_cls = 'rounded fixed z-50 h-2 w-2 bg-indigo-500'

const resize_tl = computed(() => {
  return [
    'cursor-nwse-resize', 
    `top-[${resize_xy.value.top}px]`,
    `left-[${resize_xy.value.left}px]`,
  ]

})

const resize_tr = computed(() => {
  return [
    'cursor-nesw-resize',
    `top-[${resize_xy.value.top}px]`,
    `left-[${resize_xy.value.right}px]`
  ]
})

const resize_bl = computed(() => {
  return [
    'cursor-nesw-resize',
    `top-[${resize_xy.value.bottom}px]`,
    `left-[${resize_xy.value.left}px]`
  ]
})

const resize_br = computed(() => {
  return [
    'cursor-nwse-resize',
    `top-[${resize_xy.value.bottom}px]`,
    `left-[${resize_xy.value.right}px]`
  ]
})

const img_cls = computed(() => ({
  'outline outline-1 outline-indigo-500 outline-offset-2': props.selected &&
    editable.value,
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

const align_cls = computed(() => {
  if (Array.isArray(props.node.attrs.align)) {
    const maps = {
      left: 'block mr-auto',
      right: 'block ml-auto',
      center: 'block mx-auto'
    }
    return props.node.attrs.align.map((x) => [!x.breakpoint ? `${maps[x.direction]}` :
      `${x.breakpoint}:${maps[x.direction]}`, x.level].filter(Boolean).join('-')).join(' ')
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

const startResize = (e) => {
  resize_from.value = e.target.getAttribute('data-resize')
  cursorX.value = e.clientX
  cursorY.value = e.clientY

  document.addEventListener('mousemove', startResizeMove)
  document.addEventListener('mouseup', stopResize)
}

const stopResize = () => {
  resize_from.value = null
  cursorX.value = null
  cursorY.value = null

  document.removeEventListener('mousemove', startResizeMove)
  document.removeEventListener('mouseup', stopResize)
}

const startResizeMove = (e) => {
  const { clientX, clientY } = e

  const diffs = {
    x: cursorX.value - clientX,
    y: cursorY.value - clientY
  }

  const dirs = {
    x: diffs.x > 0 ? 'left' : 'right',
    y: diffs.y > 0 ? 'up' : 'down'
  }

  cursorX.value = clientX
  cursorY.value = clientY

  const new_size = {
    width: img.value.clientWidth,
    height: img.value.clientHeight
  }

  if (dirs.x == 'left') {
    new_size.width = new_size.width - Math.abs(diffs.x)
  } else {
    new_size.width = new_size.width + Math.abs(diffs.x)
  }

  new_size.height = new_size.width / img_ratio.value

  if (dirs.y == 'up') {
    new_size.height = new_size.height - Math.abs(diffs.y)
  } else {
    new_size.height = new_size.height + Math.abs(diffs.y)
  }

  new_size.width = new_size.height * img_ratio.value

  if (new_size.width > container_width.value) {
    new_size.width = container_width.value
    new_size.height = new_size.width / img_ratio.value
  }

  props.updateAttributes(new_size)
}

</script>
