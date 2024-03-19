<template>
  <div v-if="ed" class="p-4 bg-gray-700 min-h-screen text-gray-200 flex flex-col">

    <section name="padding">
      <p>Padding</p>
      <p>Utilities for controlling an element's padding.</p>

    </section>


    CLASS: {{ ed.getAttributes(TextClass) }}
    {{ ed.getAttributes(TextAlign) }}
    {{ ed.getAttributes(TextStyle) }}
    PARAGRAPH: {{ ed.getAttributes('paragraph') }}
    IMAGE: {{ ed.getAttributes('image') }}
    BOLD: {{ ed.getAttributes('bold') }}
    {{ ed.isActive('link') }}
    {{ ed.isActive('image') }}
    {{ ed.isActive('paragraph') }}
    {{ ed.isActive('textClass') }}
    {{ ed.isActive({'fontSize': '2xl'}) }}

  </div>
</template>

<script setup>

import { ref, watch } from 'vue'
import { useEditorStore } from '@/stores/editor'

import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import TextClass from '@/components/editor/tiptap/text-class'

const { getEditor } = useEditorStore()

const ed = getEditor('current')
const tr = ref()

watch(ed, () => {
  ed.value.on(
    'selectionUpdate', ({editor, transaction}) => {
      console.log('TR: ', transaction)
      tr.value = transaction
      console.log(editor)
      //editor.commands.updateAttributes('paragraph', {'fontSize': '6xl'})
    })
})

</script>
