<template>
  <div v-if="editor">
    <div class="flex gap-4 p-4 bg-white border">
      <font-awesome-icon icon="fa-solid fa-bold"
        @click="editor.chain().focus().toggleBold().run()" :class="{
        'text-slate-900': editor.isActive('bold') }" />

      <font-awesome-icon icon="fa-solid fa-italic"
        @click="editor.chain().focus().toggleItalic().run()" :class="{
        'text-slate-900': editor.isActive('italic') }" />

      <font-awesome-icon icon="fa-solid fa-align-left"
        @click="editor.chain().focus().setTextAlign('left').run()" :class="{
        'is-active': editor.isActive({ textAlign: 'left' }) }" />

      <font-awesome-icon icon="fa-solid fa-align-center"
        @click="editor.chain().focus().setTextAlign('center').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }" />

      <font-awesome-icon icon="fa-solid fa-align-right"
        @click="editor.chain().focus().setTextAlign('right').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }" />

      <font-awesome-icon icon="fa-solid fa-align-justify"
        @click="editor.chain().focus().setTextAlign('justify').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'justify' })
        }" />
    </div>

    <bubble-menu
      :editor="editor"
      :tippy-options="{ duration: 500 }"
      class="flex gap-2 border p-2 bg-white"
    >
      <font-awesome-icon icon="fa-solid fa-bold"
        @click="editor.chain().focus().toggleBold().run()" :class="{
        'text-slate-900': editor.isActive('bold') }" />

      <font-awesome-icon icon="fa-solid fa-italic"
        @click="editor.chain().focus().toggleItalic().run()" :class="{
        'text-slate-900': editor.isActive('italic') }" />

    </bubble-menu>
    <EditorContent :editor="editor" />
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { 
  useEditor, 
  EditorContent,
  BubbleMenu
} from '@tiptap/vue-3'
import StarterKit from "@tiptap/starter-kit";
import Typography from '@tiptap/extension-typography'
import TextAlign from '@tiptap/extension-text-align'


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
    StarterKit.configure({
      bold: {
        /*
        HTMLAttributes: {
          class: 'font-bold'
        }
        */
      },
    }),
    Typography,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    })
  ]
})

onBeforeUnmount(() => editor.value.destroy())

</script>
