<template>

  <TransitionRoot appear :show="file_browser_modal_open" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-[1500]">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="transform overflow-hidden rounded-2xl bg-white p-6
              text-left w-fit align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Browse
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  <FolderBrowser
                    @browse="doBrowse"
                    @select="doSelect"
                    @breadcrumb-select="(content) => doBrowse(content.id)"
                    :contents="contents"
                    :folder="folder"
                    :actions="actions"
                    :selectActions=null
                    :view="'gallery'"
                    v-if="folder && contents"
                  />
                </p>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <div v-if="editor">
    <div v-if="editable" class="flex gap-4 p-4 bg-white border">
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

      <font-awesome-icon icon="fa-regular fa-image"
        @click="openModal('image')"
        v-if="!editor.isActive('image')" />
    </div>
<!--
    <bubble-menu
      :editor="editor"
      :tippy-options="{ duration: 500 }"
      :shouldShow="() => !editor.isActive('image')"
      class="flex gap-2 border p-2 bg-white"
    >
      <font-awesome-icon icon="fa-solid fa-bold"
        @click="editor.chain().focus().toggleBold().run()" :class="{
        'text-slate-900': editor.isActive('bold') }" />

      <font-awesome-icon icon="fa-solid fa-italic"
        @click="editor.chain().focus().toggleItalic().run()" :class="{
        'text-slate-900': editor.isActive('italic') }" />

    </bubble-menu>
-->
    <EditorContent :editor="editor" />
  </div>
</template>

<script setup>
import { ref, watchEffect, onBeforeUnmount, onMounted } from 'vue'
import { 
  useEditor, 
  EditorContent,
  BubbleMenu
} from '@tiptap/vue-3'
import StarterKit from "@tiptap/starter-kit";
import Typography from '@tiptap/extension-typography'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@/components/editor/tiptap/image/image'
import { Float } from '@/components/editor/tiptap/float-extension.js'

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import FolderBrowser from '@/components/folder/FolderBrowser.vue'
import { useContent } from '@/composables/contents.js'
import { useFolder } from '@/composables/folders.js'

const file_browser_modal_open = ref(false)
const folder_id = ref(1)
const folder = ref({})
const contents = ref([])
const { browse } = useFolder()
const { getContent } = useContent()
const actions = ref([
  {
    label: 'Select',
    event: 'select',
    icon: 'fa-solid fa-hand-point-right',
    class: (active) => active ? 'bg-violet-500 text-white' : 'text-gray-900',
    enabled: (...args) => {
      const content = args[0];
      const ask_image_is_image = (_meta.value.filetype == 'image' && content.type.name == 'file' && content.mime.major.name == 'image')
      const ask_media_is_media = (_meta.value.filetype == 'media' && content.type.name == 'file' && content.mime.major.name == 'video')
      const ask_link = _meta.value.filetype == 'file'

      return ask_image_is_image || ask_media_is_media || ask_link
    }
  }
])

let _cb = undefined;
let _meta = ref({});

const doSelect = (content) => {
  let cb_value = content.id.toString();
  let cb_meta = {};

  switch(_meta.value.filetype) {
    case 'image':
    case 'media':
      cb_meta = {
        alt: 'obj ' + content.id
      };
      break;
    // Link
    case 'file':
      if (content.type.name == 'file') {
        cb_value += '/download';
        cb_meta = {
          text: 'obj ' + content.id
        }
      }
      break;
  }

  _cb(cb_value, cb_meta); 
  closeModal()
}

const insertImage = (value, meta) => {
  editor.value.commands.setImage({
    'data-objectid': value
  })
}

watchEffect( async () => {
  let opts = [];

  if (_meta.value) {
    switch (_meta.value.filetype) {
      case 'image':
        _cb = insertImage
        opts = [
          ['filter_types', 'folder'],
          ['filter_types', 'file'], 
          ['filter_mimes', 'image/*']
        ]
        break;
      case 'media':
        opts = [
          ['filter_types', 'folder'],
          ['filter_types', 'file'],
          ['filter_mimes', 'video/*']
        ]
        break;
    }
  }

  const { data: folder_data } = await getContent(folder_id.value)
  const { data: contents_data } = await browse(folder_data.id, opts)
  folder.value = folder_data
  contents.value = contents_data.data
})

const closeModal = () => file_browser_modal_open.value = false
const openModal = (filetype) => {
  _meta.value.filetype = filetype
  folder_id.value = 1
  file_browser_modal_open.value = true
}
const doBrowse = id => folder_id.value = id

const props = defineProps({
  content: String,
  editable: {
    type: Boolean,
    default: true
  },
  injectCSS: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits([
  'update:content'
])

const editor = useEditor({
  content: props.content,
  editable: props.editable,
  injectCSS: props.injectCSS,
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
      types: ['image', 'paragraph'],
    }),
    //ResizableMedia
    Image,
    Float.configure({
      types: ['image', 'paragraph'],
    })
  ]
})

onBeforeUnmount(() => editor.value.destroy())

</script>
