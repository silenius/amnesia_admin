<template>
  <div>
    <label class="block">
      <span>Title</span>
      <Editor v-model="value" api-key="" :init="conf" />
      <span class="text-red-500" v-if="errors.body">
        {{ errors.body }}
      </span>
    </label>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
import Editor from '@tinymce/tinymce-vue'
import { useContent } from '@/composables/contents.js'

const props = defineProps({
  body: String
})

const emit = defineEmits([
  'update:body',
])

const { errors, setError } = inject('errors')

const conf = {
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
    'hr',
    'image',
    'link',
    'lists',
    'media',
    'nonbreaking',
    'noneditable',
    'pagebreak',
    'preview',
    'print',
    'quickbars',
    'save',
    'searchreplace',
    'table',
    'template',
    'textpattern',
    'toc',
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
  //        file_picker_callback : _browser_callback,
  //      document_base_url : document_base_url,
        relative_urls : true,
        remove_script_host : true,
        entity_encoding : 'numeric'
}

const { validateTitle } = useContent()

const value = computed({

  get() {
    return props.body
  },

  set(value) {
    setError('body', validateTitle(value))
    emit('update:body', value)
  }

})

</script>
