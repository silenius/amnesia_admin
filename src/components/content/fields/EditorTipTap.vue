<script setup>
import { 
  ref, 
  watchEffect, 
  onMounted, 
  onBeforeUnmount,
  computed
} from 'vue'

import { 
  EditorContent,
} from '@tiptap/vue-3'

//import StarterKit from "@tiptap/starter-kit"
import { useEditorStore } from '../../../stores/editor'

import placeholder_img from "../../../assets/images/tmpl01.jpg";

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription
} from '@headlessui/vue'

import TipTapCommands from '../../../components/editor/tiptap/utils/updateAttributes'
import Pagination from '../../../components/pagination/Pagination.vue'
import Breadcrumb from '../../../components/breadcrumbs/Breadcrumb.vue'

import FolderBrowser from '../../folder/FolderBrowser.vue'
import { useFolder, useMediaFolder } from '../../../composables/useFolder.js'
import { useFolderBrowser } from '../../../composables/useFolderBrowser.js'
import { create_file } from '../../../services/file.js'
import { backend_url } from '../../../composables/fetch.js';
import { build_editor, default_extensions } from '../../editor/tiptap';
import { guess_video } from '../../editor/tiptap/video-extension/utils.js'

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
  video: false,
  flex_container: false
})

const folder_id = ref(1)
const { folder } = useFolder(folder_id)
const { result: contents, meta: browse_meta, goto_page } = useFolderBrowser(folder)
const { media_folder } = useMediaFolder()

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

/* INSERT FLEX CONTAINER */

const insert_flex = (cpt) => {
  const flex_items = Array.from(
    Array.from({ length: cpt }, (_, index) => index+1), 
    (x) => {
      return {
        type: 'flexItem',
        attrs: {
          px: [{'breakpoint': null, 'tw': 'px-2'}],
          py: [{'breakpoint': null, 'tw': 'py-2'}],
          basis: [{'breakpoint': null, 'tw': `basis-1/${cpt}`}],
          borderWidth: [{'breakpoint': null, 'tw': 'border'}],
        },
        content: [
          { 
            type: 'paragraph', 
            content: [
              {
                type: 'text',
                text: `Item ${x}`
              }
            ]
          },
        ]
      }
    })

  const flex_container = {
    type: 'flexContainer',
    attrs: {
      mx: [{'breakpoint': null, 'tw': 'mx-2'}],
      my: [{'breakpoint': null, 'tw': 'my-2'}],
      gapX: [{'breakpoint': null, 'tw': 'gap-x-2'}],
      gapY: [{'breakpoint': null, 'tw': 'gap-y-2'}],
      align_items: [{'breakpoint': null, 'tw': 'items-stretch'}],
    },
    content: flex_items
  }

  editor.value.commands.insertContent(flex_container)
  modals.value.flex_container = false
}

const add_tmpl1 = () => {
  editor.value.commands.insertContent(`
<section class="flex gap-x-2 gap-y-2">
<article class="basis-1/3">
<section class="flex flex-col">
<article class="basis-1/4"><amnesia-img src="${placeholder_img}" /></article>
<article class="basis-3/4 mt-2 mb-2">
<p class="font-bold text-2xl">Title</p>
<p>Lorem ipsum blablabla</p>
</article>
</section>
</article>
<article class="basis-1/3"><p>foobar</p></article>
<article class="basis-1/3"><p>foobar</p></article>
</section>
`, {
      parseOptions: {
        preserveWhitespace: false,
      },
    }
  )
}

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

const insert_video_button = computed(
  () => guess_video(input_video_url.value).type 
    ? 'hover:bg-green-200 bg-green-100 text-green-900 focus-visible:ring-green-500'
    : 'bg-slate-100 text-slate-300'
)

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

const add_flex_container = () => modals.value.flex_container = true

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

const onFileChange = async (event) => {
  const uploaded_file = event.target.files[0]

  try {
    if (!uploaded_file.type.startsWith('image/')) {
      throw new NotAnImage('The provided file is not an image')
    }

    const { data, error } = await create_file(media_folder, { 
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

const extensions = [...default_extensions]
if (props.editable) {
  extensions.push(TipTapCommands)
}

const editor = build_editor({
  content: props.content,
  editable: props.editable,
  extensions: extensions,
  injectCSS: props.injectCSS,
  onUpdate: ({editor: e, transaction: tr}) => {
    //console.debug('===>>> Editor update: ', e)
    if (props.editable) {
      emit('update:content', e.getHTML())
    }
  },
  onSelectionUpdate: ({editor: e, transaction: tr}) => {
    if (props.editable) {
      emit('update:selection', e)
      setEditor(e)
    }
  },
  onTransaction: (p) => {
    //console.debug('===>>> Editor transaction: ', p)
  },

})

/*
watch(() => props.content, () => editor.value.commands.setContent(props.content))
watch(() => props.editable, () => editor.value.commands.setEditable(props.editable))
*/

const { setEditor } = useEditorStore()

onBeforeUnmount(() => editor.value.destroy())
onMounted( async () => {
  setEditor(editor)
})

</script>
<template>

  <!-- MODAL CHOOSE LINK -->

  <TransitionRoot appear :show="modals.choose_link" v-if="editable" as="template">
    <Dialog as="div" class="relative z-1500">
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
                  <button @click="modals.file_browser=true" class="p-2 hover:outline-hidden text-white bg-rose-500
                    hover:bg-rose-600 hover:ring-4 hover:ring-rose-100 font-medium rounded-full text-sm dark:focus:ring-amber-900">
                    <font-awesome-icon icon="fa-solid fa-folder-tree" class="h-8 w-8" />
                  </button>
                  Browse
                </div>

              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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

  <TransitionRoot appear :show="modals.choose_image" v-if="editable" as="template">
    <Dialog as="div" class="relative z-1500">
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
                  <button v-if="media_folder" @click="upload_image" class="p-1 text-rose-500 hover:text-rose-700 font-medium text-sm">
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
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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

  <!-- MODAL CHOOSE FLEX -->

  <TransitionRoot appear :show="modals.flex_container" v-if="editable" as="template">
    <Dialog as="div" class="relative z-1500">
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
                Flex container
              </DialogTitle>
              <DialogDescription as="h4" class="mt-2">
                Insert a flex container. A flex container provides a more efficient way to lay out, align and distribute space among items in a container, even when their size is unknown and/or dynamic
              </DialogDescription>

              <div class="mt-2">
                <div class="border shadow-md flex justify-evenly p-2 items-center rounded-full">
                  <button @click.prevent="insert_flex(1)">1 column</button>
                  <button @click.prevent="insert_flex(2)">2 columns</button>
                  <button @click.prevent="insert_flex(3)">3 columns</button>
                  <button @click.prevent="insert_flex(4)">4 columns</button>
                </div>
              </div>

              <div class="mt-4 flex gap-2">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal('flex_container')">
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

  <TransitionRoot appear :show="modals.video" v-if="editable" as="template">
    <Dialog as="div" class="relative z-1500">
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

              <div class="mt-4 flex gap-2">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal('video')">
                  Close
                </button>
                <button
                  :disabled="!guess_video(input_video_url).type"
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2"
                  :class="insert_video_button"
                  @click="insertVideo">
                  Insert
                </button>

              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- MODAL FILE BROWSER -->

  <TransitionRoot appear :show="modals.file_browser" v-if="editable" as="template">
    <Dialog as="div" class="relative z-1500">
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
                  <Breadcrumb 
                    :content="folder" 
                    @navigate="(content) => folder_id = content.id" 
                    class="p-2 shadow-md"
                  />
                  <FolderBrowser
                    @browse="(id) => folder_id = id"
                    @select="doSelect"
                    @breadcrumb-select="(content) => folder_id = content.id"
                    :contents="contents"
                    :folder="folder"
                    :actions="actions"
                    :selectActions=null
                    :view="'gallery'"
                    :forceClick="true"
                    v-if="folder && contents"
                  />
                  <Pagination
                    :limit="browse_meta.limit"
                    :offset="browse_meta.offset"
                    :total="browse_meta.count"
                    @goto-page="(page) => goto_page(page)"
                    class="flex justify-center my-4"
                  />
                </p>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
        v-if="!editor.isActive('image')" 
      />

      <font-awesome-icon icon="fa-solid fa-film"
        @click="add_video" 
      />

      <font-awesome-icon icon="fa-solid fa-bars" class="fa-rotate-90"
        @click="add_flex_container"
      />

      <font-awesome-icon icon="fa-solid fa-book-bookmark"
        @click="add_tmpl1"
      />

      <font-awesome-icon icon="fa-solid fa-list-ul" 
        @click="editor.chain().focus().toggleBulletList().run()"
      />

      <font-awesome-icon icon="fa-solid fa-list-ol" 
        @click="editor.chain().focus().toggleOrderedList().run()"
      />

      <!--
      <font-awesome-icon icon="fa-solid fa-list-check" 
        @click="editor.chain().focus().toggleTaskList().run()"
      />
      -->

      <font-awesome-icon icon="fa-solid fa-broom"
        @click="editor.commands.unsetAllMarks()"
        v-if="!editor.state.selection.empty" 
      />

      <font-awesome-icon icon="fa-solid fa-link" 
        @click="add_link"
        v-if="!editor.state.selection.empty" 
      />

      <font-awesome-icon icon="fa-solid fa-link-slash" 
        @click="remove_link"
        v-if="!editor.state.selection.empty" 
      />

    </div>
    <EditorContent :editor="editor" />
  </div>
</template>


