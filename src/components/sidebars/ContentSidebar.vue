<template>
  <div v-if="ed" class="p-2 bg-gray-700 min-h-screen text-gray-200 flex flex-col">
    <section name="padding" v-if="ext_padding">
      <Disclosure>
        <DisclosureButton
          class="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
        >
          <span>
            <span class="font-bold">Padding</span>
          </span>
        </DisclosureButton>
        <DisclosurePanel class="text-sm">
          <span>utilities for controlling an element's padding</span>.
          <SelectPadding 
            v-if="ext_padding" :extension="ext_padding" :tr="tr" 
            @select-padding="({side, level}) => ed.chain().setPadding(side, level).run()"
          />
        </DisclosurePanel>
      </Disclosure>

    </section>


    <!--
CLASS: {{ ed.getAttributes(TextClass) }}
ALIGN: {{ ed.getAttributes(TextAlign) }}
STYLE: {{ ed.getAttributes(TextStyle) }}
PARAGRAPH: {{ ed.getAttributes('paragraph') }}
IMAGE: {{ ed.getAttributes('image') }}
BOLD: {{ ed.getAttributes('bold') }}
{{ ed.isActive('link') }}
{{ ed.isActive('image') }}
{{ ed.isActive('paragraph') }}
{{ ed.isActive('textClass') }}
{{ ed.isActive({'fontSize': '2xl'}) }}
-->

  </div>
</template>

<script setup>

import { ref, unref, watch } from 'vue'
import { useEditorStore } from '@/stores/editor'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue'

import SelectPadding from '@/components/editor/tiptap/padding/SelectPadding.vue'

const { getEditor } = useEditorStore()

const ed = getEditor('current')

const ext_padding = ref()

const tr = ref()

watch(ed, () => {
  ext_padding.value = ed.value.extensionManager.extensions.find(
    ext => ext.name == 'padding'
  ),
  ed.value.on(
    'selectionUpdate', ({editor, transaction}) => {
      tr.value = transaction
      //editor.commands.updateAttributes('paragraph', {'fontSize': '6xl'})
    })
})

</script>
