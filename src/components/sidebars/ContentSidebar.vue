<template>
  <div v-if="select_editor" class="p-2 bg-gray-700 w-64 max-w-64 min-h-screen text-gray-200 flex flex-col">
    <section name="breakpoint" class="m-4" :class="cls_section">
      <SelectBreakpoint @select-breakpoint="change_breakpoint" />
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

const cls_disclosure_button = [
  'flex', 'w-full', 'gap-4', 'items-center', 'justify-between', 
  'text-left', 'text-sm', 'font-medium', 'text-slate-100', 'pr-1'
]

const cls_section = []
const cls_panel = ['text-sm', 'mb-4']

const select_transaction = ref()
const select_editor = ref()

watch(editors, () => {

  select_editor.value = unref(editors.get('current'))

  if (select_editor.value) {

    ext_padding.value = select_editor.value.extensionManager.extensions.find(
      ext => ext.name == 'padding'
    )

    ext_margin.value = select_editor.value.extensionManager.extensions.find(
      ext => ext.name == 'margin'
    )

    ext_float.value = select_editor.value.extensionManager.extensions.find(
      ext => ext.name == 'float'
    )

    ext_align.value = select_editor.value.extensionManager.extensions.find(
      ext => ext.name == 'align'
    )

    ext_text_color.value = select_editor.value.extensionManager.extensions.find(
      ext => ext.name == 'textColor'
    )

    ext_background_color.value = select_editor.value.extensionManager.extensions.find(
      ext => ext.name == 'backgroundColor'
    )

    ext_font_size.value = select_editor.value.extensionManager.extensions.find(
      ext => ext.name == 'fontSize'
    )

    /*
  select_editor.value.on(
    'selectionUpdate', ({ editor, transaction }) => {
      select_transaction.value = transaction
      select_editor.value = editor
    })
  */
  }
}, { deep: true })

</script>
