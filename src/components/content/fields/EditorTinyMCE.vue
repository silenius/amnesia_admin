<template>
  <TransitionRoot appear :show="isOpen" as="template">
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

  <Editor api-key="no-api-key" v-bind="$attrs" :init="conf" />
</template>

<script>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import { ref, watchEffect } from 'vue'

import FolderBrowser from '@/components/folder/FolderBrowser.vue'
import { useContent } from '@/composables/contents.js'
import { useFolder } from '@/composables/folders.js'

// Tinymce

/*
import tinymce from 'tinymce';

import 'tinymce/icons/default';

import 'tinymce/themes/silver';
import 'tinymce/models/dom';

import 'tinymce/skins/ui/oxide/skin.css';

import 'tinymce/plugins/advlist';
import 'tinymce/plugins/code';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/emoticons/js/emojis';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/table';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/help';
import 'tinymce/plugins/image';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/quickbars';
import 'tinymce/plugins/save';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/template';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/wordcount';

import contentUiSkinCss from 'tinymce/skins/ui/oxide/content.css';
import contentCss from 'tinymce/skins/content/default/content.css';
*/

import Editor from '@tinymce/tinymce-vue'

const isOpen = ref(false)
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
let _meta = ref();

const doSelect = (content) => {
  let cb_value = content.id.toString();
  let cb_meta = {};

  switch(_meta.value.filetype) {
    case 'image':
    case 'media':
      cb_value += '/download';
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

watchEffect( async () => {
  let opts = [];

  if (_meta.value) {
    switch (_meta.value.filetype) {
      case 'image':
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

const closeModal = () => isOpen.value = false
const openModal = () => {
  folder_id.value = 1
  isOpen.value = true
}
const doBrowse = id => folder_id.value = id

const file_picker_cb = (callback, value, meta) => {
  _cb = callback
  _meta.value = meta
  openModal()
}

export default {
  components: {
    TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle, Editor,
    FolderBrowser
  },
  emits: [
    'select-image'
  ],
  setup(props) {
    const conf = props.conf
    return { actions, doBrowse, _meta, doSelect, conf, isOpen, closeModal, folder, contents }

  },
  props: {
    conf: {
      type: Object,
      default: {
        plugins: [
          'advlist',
          'anchor',
          'autolink',
          'autoresize',
          'autosave',
          'charmap',
          'code',
          'codesample',
          'emoticons',
          'fullscreen',
          'help',
          'image',
          'link',
          'lists',
          'media',
          'nonbreaking',
          'pagebreak',
          'preview',
          'quickbars',
          'save',
          'searchreplace',
          'table',
          'template',
          'visualblocks',
          'visualchars',
          'wordcount',
        ],

        menubar: 'file edit insert view format table tools help',
        statusbar: true,
        branding: false,
        draggable_modal: true,
        browser_spellcheck: true,
        font_formats: 'Roboto=Roboto,sans-serif;Playfair=Playfair Display, serif;Montserrat=Montserrat, sans-serif;Open Sans=Open Sans, sans-serif;Oswald=Oswald, sans-serif;Lobster=Lobster, cursive;Anton=Anton, sans-serif;Lilita One=Lilita One, cursive;Indie Flower=Indie Flower, cursive;Dancing Script=Dancing Script, cursive;',
        max_height: 900,
        min_height: 300,
        //color_cols: 5,
        //preview_styles: false,
        quickbars_insert_toolbar: 'image media link quicktable | numlist bullist checklist',
        quickbars_selection_toolbar: 'bold italic underline | h2 h3 h4 | fontselect fontsizeselect styleselect | forecolor backcolor | removeformat | link ',
        toolbar: 'undo redo | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | image media link unlink anchor charmap emoticons codesample | spellchecker',
        //block_formats: 'Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3',
        visualblocks_default_state: true,
        file_picker_callback: file_picker_cb,
        image_advtab: true,
        image_class_list : [
          { title: 'none', value: '' },
          { title: 'rounded', value: 'img-rounded' },
          { title: 'circle', value: 'img-circle' },
          { title: 'thumbnail', value: 'img-thumbnail' },
        ],
        // plugins/codesample
        codesample_languages: [
          {text: 'Python', value: 'python'},
          {text: 'Javascript', value: 'javascript'},
          {text: 'SQL', value: 'sql'},
          {text: 'Ruby', value: 'ruby'},
          {text: 'CSS', value: 'css'},
          {text: 'HTML/XML', value: 'markup'},
          {text: 'C like', value: 'clike'},
          {text: 'Go', value: 'go'},
          {text: 'C', value: 'c'},
          {text: 'C#', value: 'cs'},
          {text: 'C++', value: 'cpp'},
          {text: 'PLSQL', value: 'plsql'},
          {text: 'YAML', value: 'yaml'},
          {text: 'Shell', value: 'shell'},
          {text: 'INI', value: 'ini'},
          {text: 'Java', value: 'java'},
          {text: 'JSON', value: 'json'},
          {text: 'Markdown', value: 'markdown'},
          {text: 'Perl', value: 'perl'},
          {text: 'PHP', value: 'php'},
          {text: 'reST', value: 'rest'},
          {text: 'Rust', value: 'rust'}
        ],
        pagebreak_separator : "<!-- page break -->",
        /*
        content_css : [
            site_url('static/dist/styles/layout.css')
        ],
      */
        style_formats: [
          { 
            title: 'Titles', items: [
              { title: 'Title green', block: 'h4', classes: 'title_green' }, 
              { title: 'Title orange', block: 'h4', classes: 'title_orange' }, 
              { title: 'Title blue', block: 'h4', classes: 'title_blue' },
            ],
          },
          {
            title: 'Image effects', items: [
              { title: 'Grow', selector: 'img', classes: 'grow' },
              { title: 'Grayscale', selector: 'img', classes: 'grayscale' }
            ]
          },
        ],
        style_formats_autohide: true,
        //style_formats_merge: true,
        table_appearance_options: false,
        table_class_list: [
          { title: 'none', value: '' },
          { title: 'auto', value: 'table-auto' },
          { title: 'fixed', value: 'table-fixed' },
        ],
        /*
        color_map: [
            "227f78", "Title green",
            "faa627", "Title orange",
            "415060", "Title blue",
        ],
        */
        convert_fonts_to_spans : true,
        fontsize_formats: '8px 9px 10px 11px 12px 14px 16px 18px 24px 36px 48px',
        fix_list_elements : true,
        force_hex_style_colors : true,
        document_base_url : import.meta.env.VITE_TINYMCE_BASE_URL,
        relative_urls : true,
        remove_script_host : true,
        entity_encoding : 'numeric'
      }

    }
  }
}

</script>
