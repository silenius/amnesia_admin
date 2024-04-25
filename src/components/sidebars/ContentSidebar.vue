<template>
  <div v-if="select_editor" class="p-2 bg-gray-700 w-64 max-w-64 min-h-screen text-gray-200 flex flex-col">

    <!-- BREAKPOINT -->

    <section name="breakpoint" class="m-4" :class="cls_section">
      <SelectBreakpoint @select-breakpoint="change_breakpoint" />
    </section>

    <!-- NODE -->

    <section name="node" :class="cls_section">
      <span class="text-2xl">Active Node</span>
    </section>

    <!-- PADDING -->

    <section name="padding" :class="cls_section" v-if="ext_padding">
      <Disclosure v-slot="{ open }">
        <DisclosureButton :class="cls_disclosure_button">
          <span>Padding</span>
          <font-awesome-icon v-if="open" icon="fa-solid fa-caret-down" />
          <font-awesome-icon v-else="" icon="fa-solid fa-caret-right" />
        </DisclosureButton>
        <DisclosurePanel :class="cls_panel">
          <div class="italic my-2">Utilities for controlling an element's padding.</div>
          <SelectPadding 
            v-if="ext_padding" 
            :breakpoint="breakpoint"
            :extension="ext_padding" 
            :transaction="select_transaction"
            :editor="select_editor"
            @select-padding="({side, level, breakpoint}) => select_editor.chain().setPadding(side, level, breakpoint).run()"
          />
        </DisclosurePanel>
      </Disclosure>
    </section>

    <!-- MARGIN -->

    <section name="margin" :class="cls_section" v-if="ext_margin">
      <Disclosure v-slot="{ open }">
        <DisclosureButton :class="cls_disclosure_button">
          <span>Margin</span>
          <font-awesome-icon v-if="open" icon="fa-solid fa-caret-down" />
          <font-awesome-icon v-else="" icon="fa-solid fa-caret-right" />
        </DisclosureButton>
        <DisclosurePanel :class="cls_panel">
          <div class="italic my-2">Utilities for controlling an element's margin.</div>
          <SelectMargin 
            v-if="ext_margin" 
            :breakpoint="breakpoint"
            :extension="ext_margin" 
            :transaction="select_transaction"
            :editor="select_editor"
            @select-margin="({side, level, breakpoint}) => select_editor.chain().setMargin(side, level, breakpoint).run()"
          />
        </DisclosurePanel>
      </Disclosure>
    </section>

    <!-- FLOAT -->

    <section name="float" :class="cls_section" v-if="ext_float">
      <Disclosure v-slot="{ open }">
        <DisclosureButton :class="cls_disclosure_button">
          <span>Float</span>
          <font-awesome-icon v-if="open" icon="fa-solid fa-caret-down" />
          <font-awesome-icon v-else="" icon="fa-solid fa-caret-right" />
        </DisclosureButton>
        <DisclosurePanel :class="cls_panel">
          <div class="italic my-2">Utilities for controlling the wrapping of content around an element.</div>
          <SelectFloat
            v-if="ext_float" 
            :breakpoint="breakpoint"
            :extension="ext_float" 
            :transaction="select_transaction"
            :editor="select_editor"
            @select-float="({direction, breakpoint}) => select_editor.chain().setFloat(direction, breakpoint).run()"
          />
        </DisclosurePanel>
      </Disclosure>
    </section>

    <!-- ALIGN -->

    <section name="align" :class="cls_section" v-if="ext_align">
      <Disclosure v-slot="{ open }">
        <DisclosureButton :class="cls_disclosure_button">
          <span>Align</span>
          <font-awesome-icon v-if="open" icon="fa-solid fa-caret-down" />
          <font-awesome-icon v-else="" icon="fa-solid fa-caret-right" />
        </DisclosureButton>
        <DisclosurePanel :class="cls_panel">
          <div class="italic my-2">Utilities for controlling the alignment.</div>
          <SelectAlign
            v-if="ext_align" 
            :breakpoint="breakpoint"
            :extension="ext_align" 
            :transaction="select_transaction"
            :editor="select_editor"
            @select-align="({direction, breakpoint}) => select_editor.chain().setAlign(direction, breakpoint).run()"
          />
        </DisclosurePanel>
      </Disclosure>
    </section>

    <!-- SIZING -->

    <section name="sizing" :class="cls_section">
      <Disclosure v-slot="{ open }">
        <DisclosureButton :class="cls_disclosure_button">
          <span>Sizing</span>
          <font-awesome-icon v-if="open" icon="fa-solid fa-caret-down" />
          <font-awesome-icon v-else="" icon="fa-solid fa-caret-right" />
        </DisclosureButton>
        <DisclosurePanel :class="cls_panel">
          <div class="italic my-2">Utilities for sizings of an element.</div>
          <SelectWidth
            v-if="ext_width" 
            :breakpoint="breakpoint"
            :extension="ext_width" 
            :transaction="select_transaction"
            :editor="select_editor"
            @select-width="({width, breakpoint}) => select_editor.chain().setWidth(width, breakpoint).run()"
          />
        </DisclosurePanel>
      </Disclosure>
    </section>

 
    <!-- COLORS -->

    <section name="colors" :class="cls_section">
      <Disclosure v-slot="{ open }">
        <DisclosureButton :class="cls_disclosure_button">
          <span>Colors</span>
          <font-awesome-icon v-if="open" icon="fa-solid fa-caret-down" />
          <font-awesome-icon v-else="" icon="fa-solid fa-caret-right" />
        </DisclosureButton>
        <DisclosurePanel :class="cls_panel">
          <div class="italic my-2">Utilities for controlling the colors.</div>
          <div class="gap-x-2 grid justify-items-center items-center grid-rows-2 grid-cols-2">
            <span>Text</span>

            <span>Background</span>

            <SelectTextColor
              v-if="ext_text_color" 
              :breakpoint="breakpoint"
              :extension="ext_text_color" 
              :transaction="select_transaction"
              :editor="select_editor"
              @select-text-color="({color, variant, breakpoint}) => select_editor.chain().focus().setTextColor(color, variant, breakpoint).run()"
            />

            <SelectBackgroundColor
              v-if="ext_background_color" 
              :breakpoint="breakpoint"
              :extension="ext_text_color" 
              :transaction="select_transaction"
              :editor="select_editor"
              @select-background-color="({color, variant, breakpoint}) => select_editor.chain().focus().setBackgroundColor(color, variant, breakpoint).run()"
            />

          </div>
        </DisclosurePanel>
      </Disclosure>
    </section>

    <!-- TYPOGRAPHY -->

    <section name="typography" :class="cls_section">
      <Disclosure v-slot="{ open }">
        <DisclosureButton :class="cls_disclosure_button">
          <span>Typography</span>
          <font-awesome-icon v-if="open" icon="fa-solid fa-caret-down" />
          <font-awesome-icon v-else="" icon="fa-solid fa-caret-right" />
        </DisclosureButton>
        <DisclosurePanel :class="cls_panel">
          <div class="italic my-2">Utilities for controlling various text
            elements.</div>
          <div class="flex justify-center align-center mt-4 gap-2">

            <SelectFontItalic 
              class="flex"
              v-if="ext_font_italic"
              :breakpoint="breakpoint"
              :extension="ext_font_italic"
              :transaction="select_transaction"
              :editor="select_editor"
              @select-font-italic="({italic}) => select_editor.chain().focus().setFontItalic(italic, breakpoint).run()"
            />

            <SelectFontWeight 
              class="flex"
              v-if="ext_font_weight"
              :breakpoint="breakpoint"
              :extension="ext_font_weight"
              :transaction="select_transaction"
              :editor="select_editor"
              @select-font-weight="({weight}) => select_editor.chain().focus().setFontWeight(weight, breakpoint).run()"
            />

            <SelectTextDecoration 
              class="flex gap-2"
              v-if="ext_text_decoration"
              :breakpoint="breakpoint"
              :extension="ext_text_decoration"
              :transaction="select_transaction"
              :editor="select_editor"
              @select-text-decoration="({decoration}) => select_editor.chain().focus().setTextDecoration(decoration, breakpoint).run()"
            />

          </div>

          <div>
            <span>Size</span>


            <SelectFontSize 
              v-if="ext_font_size"
              :breakpoint="breakpoint"
              :extension="ext_font_size"
              :transaction="select_transaction"
              :editor="select_editor"
              @select-font-size="({size}) => select_editor.chain().focus().setFontSize(size, breakpoint).run()"
            />

            <SelectFontFamily 
              v-if="ext_font_family"
              :breakpoint="breakpoint"
              :extension="ext_font_family"
              :transaction="select_transaction"
              :editor="select_editor"
              @select-font-family="({family}) => select_editor.chain().focus().setFontFamily(family, breakpoint).run()"
            />


          </div>
        </DisclosurePanel>
      </Disclosure>
    </section>

  </div>
</template>

<script setup>

import { ref, computed, unref, watch } from 'vue'
import { useEditorStore } from '@/stores/editor'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue'

import SelectBreakpoint from '@/components/editor/tiptap/breakpoint/SelectBreakpoint.vue'
import SelectPadding from '@/components/editor/tiptap/padding/SelectPadding.vue'
import SelectMargin from '@/components/editor/tiptap/margin/SelectMargin.vue'
import SelectFloat from '@/components/editor/tiptap/float-extension/SelectFloat.vue'
import SelectAlign from '@/components/editor/tiptap/align-extension/SelectAlign.vue'
import SelectTextColor from '@/components/editor/tiptap/text-color/SelectTextColor.vue'
import SelectBackgroundColor from '@/components/editor/tiptap/background-color/SelectBackgroundColor.vue'
import SelectFontWeight from '@/components/editor/tiptap/font-weight-extension/SelectFontWeight.vue'
import SelectFontSize from '@/components/editor/tiptap/fontsize/SelectFontSize.vue'
import SelectFontFamily from '@/components/editor/tiptap/font-family-extension/SelectFontFamily.vue'
import SelectFontItalic from '@/components/editor/tiptap/font-italic-extension/SelectFontItalic.vue'
import SelectTextDecoration from '@/components/editor/tiptap/text-decoration-extension/SelectTextDecoration.vue'
import SelectWidth from '@/components/editor/tiptap/width-extension/SelectWidth.vue'

const { getEditor, editors } = useEditorStore()

const breakpoint = ref(null)
const change_breakpoint = (value) => breakpoint.value = value

const ext_padding = ref()
const ext_margin = ref()
const ext_float = ref()
const ext_align = ref()
const ext_text_color = ref()
const ext_background_color = ref()
const ext_font_size = ref()
const ext_font_family = ref()
const ext_font_weight = ref()
const ext_font_italic = ref()
const ext_text_decoration = ref()
const ext_width = ref()

const cls_disclosure_button = [
  'flex', 'w-full', 'gap-4', 'items-center', 'justify-between', 
  'text-left', 'text-sm', 'font-medium', 'text-slate-100', 'pr-1'
]

const cls_section = []
const cls_panel = ['text-sm', 'mb-4']

const select_transaction = ref()
const select_editor = ref()

const selection = ref({
  

})

watch(editors, () => {
  if (!select_editor.value) {
    select_editor.value = unref(editors.get('current'))
    /*
    select_editor.value.on('selectionUpdate', ({editor}) => {
      if (select_editor.value.isActive('image')) {
        selection.value.type = 'image'
        selection.value.attrs = select_editor.value.getAttributes('image')
      } 
    })
    */


  }
}, { deep: true })

watch(select_editor, () => {
  if (select_editor.value) {

    const exts = select_editor.value.extensionManager.extensions

    ext_padding.value = exts.find(ext => ext.name == 'padding')
    ext_margin.value = exts.find(ext => ext.name == 'margin')
    ext_float.value = exts.find(ext => ext.name == 'float')
    ext_align.value = exts.find(ext => ext.name == 'align')
    ext_text_color.value = exts.find(ext => ext.name == 'textColor')
    ext_background_color.value = exts.find(ext => ext.name == 'backgroundColor')
    ext_font_size.value = exts.find(ext => ext.name == 'fontSize')
    ext_font_family.value = exts.find(ext => ext.name == 'fontFamily')
    ext_font_weight.value = exts.find(ext => ext.name == 'fontWeight')
    ext_font_italic.value = exts.find(ext => ext.name == 'fontItalic')
    ext_text_decoration.value = exts.find(ext => ext.name == 'textDecoration')
    ext_width.value = exts.find(ext => ext.name == 'width')

  }
})

</script>
