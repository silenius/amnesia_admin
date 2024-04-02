<template>
  <div v-if="ed" class="p-2 bg-gray-700 fixed right-0 max-w-64 min-h-screen text-gray-200 flex flex-col">

    <!-- PADDING -->

    <section name="padding" v-if="ext_padding">
      <Disclosure v-slot="{ open }">
        <DisclosureButton
          class="flex w-full gap-4 items-center justify-between rounded-lg
          bg-gray-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
        >
          <span>
            <span class="font-bold">Padding</span>
          </span>

          <font-awesome-icon v-if="open" icon="fa-solid fa-caret-down" />
          <font-awesome-icon v-else="" icon="fa-solid fa-caret-right" />
        </DisclosureButton>
        <DisclosurePanel class="text-sm">
          <div class="italic my-4">Utilities for controlling an element's padding.</div>
          <SelectPadding 
            v-if="ext_padding" 
            :extension="ext_padding" 
            :editor="ed"
            :tr="tr" 
            @select-padding="({side, level, breakpoint}) => ed.chain().setPadding(side, level, breakpoint).run()"
          />
        </DisclosurePanel>
      </Disclosure>

      <!-- MARGIN -->

    </section>

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
const ext_margin = ref()

const tr = ref()

watch(ed, () => {
  ext_padding.value = ed.value.extensionManager.extensions.find(
    ext => ext.name == 'padding'
  ),
  ext_margin.value = ed.value.extensionManager.extensions.find(
    ext => ext.name == 'margin'
  ),
  ed.value.on(
    'selectionUpdate', ({ editor, transaction }) => {
      tr.value = transaction
      console.log('EDITOR ', editor)
      //editor.commands.updateAttributes('paragraph', {'fontSize': '6xl'})
    })
})

</script>
