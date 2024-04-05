<template>
  <div v-if="select_editor" class="p-2 bg-gray-700 fixed right-0 w-64 max-w-64 min-h-screen text-gray-200 flex flex-col">

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
            :extension="ext_margin" 
            :transaction="select_transaction"
            :editor="select_editor"
            @select-margin="({side, level, breakpoint}) => select_editor.chain().setMargin(side, level, breakpoint).run()"
          />
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

import SelectPadding from '@/components/editor/tiptap/padding/SelectPadding.vue'
import SelectMargin from '@/components/editor/tiptap/margin/SelectMargin.vue'

const { getEditor, editors } = useEditorStore()

const ext_padding = ref()
const ext_margin = ref()

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
