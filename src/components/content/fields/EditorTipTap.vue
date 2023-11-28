<template>
  <div v-if="editor">
    <EditorContent :editor="editor" />
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Typography from '@tiptap/extension-typography'


const props = defineProps({
  content: String
})

const emit = defineEmits([
  'update:content'
])

const editor = useEditor({
  content: props.content,
  onUpdate: () => {
    emit('update:content', editor.value.getHTML())
  },
  extensions: [
    StarterKit,
    Typography
  ]
})

onBeforeUnmount(() => editor.value.destroy())

</script>
