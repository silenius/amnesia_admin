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
                  @click="closeModal('choose_link')">
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
                Browse the site, upload an image, or enter an URL
              </DialogDescription>

              <div class="mt-2">
                <div class="border shadow-md flex justify-start p-2 items-center rounded-full">

                  <!-- BROWSE WEBSITE -->

                  <button @click="modals.file_browser=true" class="p-1 text-rose-500 hover:text-rose-700 font-medium text-sm">
                    <font-awesome-icon icon="fa-solid fa-folder-tree" class="h-4 w-4" />
                  </button>

                  <!-- UPLOAD IMAGE -->

                  <button @click="upload_image" class="p-1 text-rose-500 hover:text-rose-700 font-medium text-sm">
                    <font-awesome-icon icon="fa-solid fa-upload" class="h-4 w-4" />
                  </button>
                  <input @change="onFileChange" accept="image/*" type="file" ref="input_upload_file" class="hidden" />

                  <!-- ENTER URL -->

                  <input @keyup.enter="insertImageURL" v-model="input_image_url" type="url" placeholder="Browse the site, upload an image, or enter an URL" class="border-0 text-gray-300 focus:text-rose-900 focus:ring-0 rounded-full text-sm w-full" />

                  <button v-if="input_image_url" @click="input_image_url=''">
                    <font-awesome-icon icon="fa-solid fa-xmark" class="mr-2" />
                  </button>

                  <button v-if="input_image_url" @click="insertImageURL">
                    <font-awesome-icon icon="fa-solid fa-arrow-right" class="mr-2" /> 
                  </button>
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


  <!-- MODAL CHOOSE VIDEO -->

  <TransitionRoot appear :show="modals.video" as="template">
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
                Video
              </DialogTitle>
              <DialogDescription as="h4" class="mt-2">
                Insert a video. Supported sources are: Youtube, Dailymotion and
                Vimeo
              </DialogDescription>

              <div class="mt-2">
                <div class="border shadow-md flex justify-start p-2 items-center rounded-full">

                  <!-- ENTER URL -->

                  <input @keyup.enter="insertVideo"
                    v-model="input_video_url" type="url" placeholder="Enter a video URL, e.g. https://www.youtube.com/watch?v=YKFFXgqBA64" class="border-0 text-gray-300 focus:text-rose-900 focus:ring-0 rounded-full text-sm w-full" />
                </div>
                <div class="mt-2">
                  <input type="checkbox" v-model="input_video_autoplay" />
                  autoplay
                  <input type="checkbox" checked v-model="input_video_controls" />
                  show controls
                </div>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal('video')">
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
                    :forceClick="true"
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
      <font-awesome-icon icon="fa-regular fa-image"
        @click="add_image"
        v-if="!editor.isActive('image')" />

      <font-awesome-icon icon="fa-solid fa-film"
        @click="add_video" />

      <font-awesome-icon icon="fa-solid fa-link" 
        @click="add_link"
        v-if="!editor.state.selection.empty" />

      <font-awesome-icon icon="fa-solid fa-link-slash" 
        @click="remove_link"
        v-if="!editor.state.selection.empty" />
    </div>
    <EditorContent :editor="editor" />
  </div>
</template>

<script setup>
import { 
  ref, watch, watchEffect, onMounted, onBeforeUnmount 
} from 'vue'

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
//import Youtube from '@tiptap/extension-youtube'
import Image from '@/components/editor/tiptap/image/image'
import Video from '@/components/editor/tiptap/video-extension/video'
import FontSize from '@/components/editor/tiptap/fontsize'
import TextClass from '@/components/editor/tiptap/text-class'
import { Float } from '@/components/editor/tiptap/float-extension'
import { Align } from '@/components/editor/tiptap/align-extension'
import TextColor from '@/components/editor/tiptap/text-color'
import BackgroundColor from '@/components/editor/tiptap/background-color'
import Padding from '@/components/editor/tiptap/padding'
import Margin from '@/components/editor/tiptap/margin'
import FontWeight from '@/components/editor/tiptap/font-weight-extension'
import FontFamily from '@/components/editor/tiptap/font-family-extension'
import FontItalic from '@/components/editor/tiptap/font-italic-extension'
import TextDecoration from '@/components/editor/tiptap/text-decoration-extension'
import Width from '@/components/editor/tiptap/width-extension'
import MinWidth from '@/components/editor/tiptap/min-width-extension'
import MaxWidth from '@/components/editor/tiptap/max-width-extension'
import Height from '@/components/editor/tiptap/height-extension'
import MinHeight from '@/components/editor/tiptap/min-height-extension'
import MaxHeight from '@/components/editor/tiptap/max-height-extension'
import TipTapCommands from '@/components/editor/tiptap/utils/updateAttributes'
import { useEditorStore } from '@/stores/editor'

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription
} from '@headlessui/vue'

import { fontFamily } from '../../../fonts'
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
  'update:content',
  'update:selection'
])

class NotAnImage extends Error {
  constructor(message) {
    super(message)
  }
}

const modals = ref({
  choose_image: false,
  choose_link: false,
  file_browser: false,
  video: false
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
const input_image_url = ref()
const input_video_url = ref()
const input_video_autoplay = ref()
const input_video_controls = ref()

const insertImage = (value) => {
  editor.value.commands.setImage({
    'data-objectid': value,
    'src': backend_url(value)
  })
}

const insertImageURL = () => {
  editor.value.commands.setImage(
    { 'src': input_image_url.value }
  )
  modals.value.choose_image = false
  input_image_url.value = ''
}

const insertVideo = () => {
  editor.value.commands.setVideo({ 
    src: input_video_url.value,
    autoplay: input_video_autoplay.value,
    controls: input_video_controls.value
  })
  modals.value.video = false
  input_video_url.value = ''
  input_video_autoplay.value = false
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

const add_video = () => {
  modals.value.video = true
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

const fonts = Object.keys(fontFamily).concat(['sans', 'serif', 'mono'])

const editor = useEditor({
  content: props.content,
  editable: props.editable,
  injectCSS: props.injectCSS,
  onUpdate: ({editor: e, transaction: tr}) => {
    //console.debug('===>>> Editor update: ', e)
    emit('update:content', e.getHTML())
  },
  onSelectionUpdate: ({editor: e, transaction: tr}) => {
    emit('update:selection', e)
    setEditor('current', e)
    /*
    console.debug(
      '===>>> Editor selection update, editor: ', e, ' transaction: ', tr
    )
    */
  },
  /*
  onTransaction: (p) => {
    console.debug('===>>> Editor transaction: ', p)
  },
  */
  extensions: [
    StarterKit.configure({
      bold: false,
      italic: false,
      bulletList: {
        HTMLAttributes: { 'class': 'list-disc' },
        types: ['textClass']
      }
    }),
    TipTapCommands,
    Typography,
    /*
    Youtube,
    TextAlign.configure({
      types: ['image', 'paragraph'],
    })
    ,*/
    //ResizableMedia
    Image.configure({
      inline: true,
    }),
    Video,
    Float.configure({
      types: ['video', 'image', 'paragraph', 'textClass'],
    }),
    Align.configure({
      types: ['video', 'image', 'paragraph'],
    }),
    //    Flex,
    //    CustomText,
    TextStyle,
    TextClass,
    FontSize.configure({
      types: ['textClass']
    }),
    TextColor.configure({
      types: ['textClass', 'textStyle']
    }),
    BackgroundColor.configure({
      types: ['textClass', 'image']
    }),
    Margin.configure({
      types: ['video', 'image', 'bulletList', 'paragraph', 'textClass', 'textStyle']
    }),
    Padding.configure({
      types: ['video', 'image', 'bulletList', 'textClass', 'paragraph', 'textStyle']
    }),
    FontWeight.configure({
      types: ['textClass']
    }),
    FontFamily.configure({
      types: ['textClass'],
      families: fonts
    }),
    FontItalic.configure({
      types: ['textClass']
    }),
    TextDecoration.configure({
      types: ['textClass']
    }),
    Width.configure({
      types: ['video', 'image', 'paragraph']
    }),
    MinWidth.configure({
      types: ['image', 'paragraph']
    }),
    MinHeight.configure({
      types: ['image', 'paragraph']
    }),
    MaxWidth.configure({
      types: ['image', 'paragraph']
    }),
    MaxHeight.configure({
      types: ['image', 'paragraph']
    }),
    Height.configure({
      types: ['video', 'image', 'paragraph']
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

const { setEditor } = useEditorStore()
setEditor('current', editor)

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
