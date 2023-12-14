<template>
  <article class="mt-4">
    <h1 class="drop-shadow-lg">{{ content.title }}</h1>
    <p v-if="content.description">{{ content.description }}</p>
    <EditorContent :editor="editor" />
  </article>
</template>

<script setup>
import { onBeforeMount, onMounted, onUnmounted, onUpdated } from 'vue'
import { 
  useEditor, 
  EditorContent,
} from '@tiptap/vue-3'
import StarterKit from "@tiptap/starter-kit";
import Typography from '@tiptap/extension-typography'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@/components/editor/tiptap/image/image'


const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const editor = useEditor({
  content: props.content.body,
  editable: false,
  injectCSS: false,
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
      types: ['image', 'paragraph'],
    }),
    //ResizableMedia
    Image
  ]

})

onBeforeMount(() => console.log('===> DocumentShow before mounted'))
onUnmounted(() => console.log('===> DocumentShow unmounted'))
onMounted(() => console.log('===> DocumentShow mounted'))
onUpdated(() => console.log('===> DocumentShow updated'))
</script>
