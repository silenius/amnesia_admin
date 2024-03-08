<template>

  <!-- MODAL CHOOSE LINK -->

  <TransitionRoot appear :show="modals.choose_link" as="template">
    <Dialog as="div" class="relative z-[1500]">
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
              <DialogTitle as="h3" class="text-xl font-medium leading-6 text-gray-900" >
                Link
              </DialogTitle>
              <DialogDescription as="h4" class="mt-2">
                Link selection
              </DialogDescription>
              <div class="flex text-sm gap-4 mt-2 py-8">

                <!-- BROWSE SITE -->

                <div class="flex flex-col gap-2">
                  <button @click="modals.file_browser=true" class="p-2 hover:outline-none text-white bg-rose-500
                    hover:bg-rose-600 hover:ring-4 hover:ring-rose-100 font-medium rounded-full text-sm dark:focus:ring-amber-900">
                    <font-awesome-icon icon="fa-solid fa-folder-tree" class="h-8 w-8" />
                  </button>
                  Browse
                </div>

              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal('choose_image')">
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- MODAL CHOOSE IMAGE -->

  <TransitionRoot appear :show="modals.choose_image" as="template">
    <Dialog as="div" class="relative z-[1500]">
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
              <DialogTitle as="h3" class="text-xl font-medium leading-6 text-gray-900" >
                Insert an image
              </DialogTitle>
              <DialogDescription as="h4" class="mt-2">
                Browse the site, upload an image, or type an URL
              </DialogDescription>
              <div class="flex text-sm gap-4 mt-2 py-8">

                <!-- BROWSE SITE -->

                <div class="flex flex-col gap-2">
                  <button @click="modals.file_browser=true" class="p-2 hover:outline-none text-white bg-rose-500
                    hover:bg-rose-600 hover:ring-4 hover:ring-rose-100 font-medium rounded-full text-sm dark:focus:ring-amber-900">
                    <font-awesome-icon icon="fa-solid fa-folder-tree" class="h-8 w-8" />
                  </button>
                  Browse
                </div>

                <!-- UPLOAD IMAGE -->

                <div class="flex flex-col gap-2">
                  <button @click="upload_image" class="p-2 hover:outline-none text-white bg-rose-500
                    hover:bg-rose-600 hover:ring-4 hover:ring-rose-100 font-medium rounded-full text-sm dark:focus:ring-amber-900">
                    <font-awesome-icon icon="fa-solid fa-upload" class="h-8 w-8" />
                  </button>
                  <input @change="onFileChange" accept="image/*" type="file" ref="input_upload_file" class="hidden" />
                  Upload
                </div>

              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal('choose_image')">
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- MODAL FILE BROWSER -->

  <TransitionRoot appear :show="modals.file_browser" as="template">
    <Dialog as="div" class="relative z-[1500]">
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
                  @click="closeModal('file_browser')">
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
    <div v-if="editable" class="items-center flex gap-4 p-4 bg-white border">
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
        @click="add_image"
        v-if="!editor.isActive('image')" />

      <font-awesome-icon icon="fa-solid fa-link" 
        @click="add_link"
        v-if="!editor.state.selection.empty" />

      <font-awesome-icon icon="fa-solid fa-link-slash" 
        @click="remove_link"
        v-if="!editor.state.selection.empty" />

      <DropDownSize 
        @select-size="(size, ) => editor.chain().focus().setFontSize(size).run()"
      />

      <SelectColor 
        @select-color="(color, variant) => editor.chain().focus().setTextColor(color, variant).run()"
        :colors="color_names"
        :variants="color_variants"
      />

    </div>
    <EditorContent :editor="editor" />
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted, onBeforeUnmount } from 'vue'
import { 
  useEditor, 
  EditorContent,
  BubbleMenu
} from '@tiptap/vue-3'
import StarterKit from "@tiptap/starter-kit"
import Typography from '@tiptap/extension-typography'
import TextAlign from '@tiptap/extension-text-align'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TextStyle from '@tiptap/extension-text-style'
import Link from '@tiptap/extension-link'
//import Image from '@tiptap/extension-image'
import Image from '@/components/editor/tiptap/image/image'
import FontSize from '@/components/editor/tiptap/fontsize'
import TextClass from '@/components/editor/tiptap/text-class'
import DropDownSize from '@/components/editor/tiptap/fontsize/DropDownSize.vue'
//import Flex from '@/components/editor/tiptap/flex-container/flex'
import { Float } from '@/components/editor/tiptap/float-extension.js'
import SelectColor from '@/components/editor/tiptap/text-color/SelectColor.vue'
import TextColor from '@/components/editor/tiptap/text-color'
import { color_names, color_variants } from '@/components/editor/tiptap/text-color/constants'

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription
} from '@headlessui/vue'

import FolderBrowser from '@/components/folder/FolderBrowser.vue'
import { useContent } from '@/composables/contents.js'
import { useFolder } from '@/composables/folders.js'
import { useFile } from '@/composables/files.js'
import { backend_url } from '@/composables/fetch.js';

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

class NotAnImage extends Error {
    constructor(message) {
        super(message)
    }
}

const modals = ref({
  choose_image: false,
  choose_link: false,
  file_browser: false
})

const { browse, getDefaultMediaFolder } = useFolder()
const { getContent } = useContent()

const folder_id = ref(1)
const folder = ref({})
const default_media_folder = ref()
const contents = ref([])
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

  _cb(cb_value); 
  closeModal()
}

const input_upload_file = ref()

const insertImage = (value) => {
  editor.value.commands.setImage({
    'data-objectid': value,
    'src': backend_url(value)
  })
}

const insertLink = (value) => {
  editor.value.commands.setLink({
    'href': backend_url(value).href
  })
}

const remove_link = (value) => {
  editor.value.commands.unsetLink()
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
      case 'file':
        _cb = insertLink
        break
    }
  }

  const { data: folder_data } = await getContent(folder_id.value)
  const { data: contents_data } = await browse(folder_data.id, opts)
  folder.value = folder_data
  contents.value = contents_data.data
})

const closeModal = (...modal) => {
  const src = modal.length === 0 ? Object.keys(modals.value) : modal

  for (const m of src) {
    modals.value[m] = false
  }
}

const add_image = () => {
  _meta.value.filetype = 'image'
  folder_id.value = 1
  modals.value.choose_image = true
}

const add_link = () => {
  _meta.value.filetype = 'file'
  folder_id.value = 1
  modals.value.choose_link = true
}

const upload_image = () => input_upload_file.value.click()
const { createFile } = useFile()

const onFileChange = async (event) => {
  const uploaded_file = event.target.files[0]

  try {
    if (!uploaded_file.type.startsWith('image/')) {
      throw new NotAnImage('The provided file is not an image')
    }

    const { data } = await createFile(default_media_folder, { 
      title: uploaded_file.name,
      content: uploaded_file
    })

    if (data.mime.major.name !== 'image') {
      throw new NotAnImage('The uploaded file is not an image')
    }

    console.info(`===>>> Insert image ${data.id}`)
    insertImage(data.id)
    closeModal()
  } catch (e) {
    console.error(`===>>> Error: ${e.message}`)
  }
}

const doBrowse = id => folder_id.value = id

const editor = useEditor({
  content: props.content,
  editable: props.editable,
  injectCSS: props.injectCSS,
  onUpdate: () => {
    console.debug('===>>> Editor update: ', editor.value)
    emit('update:content', editor.value.getHTML())
  },
  extensions: [
    StarterKit.configure({
      bold: {
        types: ['textStyle', 'fontSize']
      },
    }),
    Typography,
    TextAlign.configure({
      types: ['image', 'paragraph'],
    }),
    //ResizableMedia
    Image.configure({
      inline: true,
    }),
    Float.configure({
      types: ['image', 'paragraph'],
    }),
//    Flex,
//    CustomText,
    TextStyle,
    TextClass,
    FontSize.configure({
      types: ['textClass', 'paragraph', 'bold']
    }),
    TextColor.configure({
      types: ['textClass']
    }),
    Table,
    TableHeader,
    TableRow,
    TableCell,
    Link.configure({
      spanning: false
    }),
  ]
})

onBeforeUnmount(() => editor.value.destroy())
onMounted( async () => {
  try {
    const { data } = await getDefaultMediaFolder()
    default_media_folder.value = data
  } catch (e) {
    console.error('===>>> Error getting default media folder: ', e)
  }

})

</script>
