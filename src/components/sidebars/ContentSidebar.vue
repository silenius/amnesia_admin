<template>
  <div v-if="editor" class="px-2 bg-gray-700 max-w-64 min-h-screen text-gray-200 flex flex-col">

    <!-- BREAKPOINT -->

    <section name="breakpoint" class="m-4" :class="cls_section">
      <SelectBreakpoint @select-breakpoint="change_breakpoint" />
    </section>

    <!-- NODE -->

    <section name="node" class="my-4" :class="cls_section" v-if="lineage && lineage.size > 0">
      <div class="flex flex-col gap-y-2 items-start">
        <button 
          v-for="t in lineage.values()"
          @click="nodeSelected = t"
          @mouseover="decorate('highlightNode', t)" 
          @mouseout="decorate('highlightNode')"
          :data-pos="t.pos"
          type="button" 
          :class="[`ml-${t.level}`, {'outline-none ring-4 ring-red-300 dark:ring-red-900': t.pos == nodeSelected?.pos}]"
          class="text-white bg-red-700 hover:bg-red-800 font-medium
          rounded-full text-xs px-3 py-2 dark:bg-red-600
          dark:hover:bg-red-700">{{ t.node.type.name }} {{ t.pos }} </button>
      </div>
    </section>

    <!-- FLEX CONTAINER -->

    <section :class="cls_section" v-if="exts.flexContainer">
      <Disclosure v-slot="{ open }">
        <DisclosureButton :class="cls_disclosure_button">
          <span>Flex container</span>
          <font-awesome-icon v-if="open" icon="fa-solid fa-caret-down" />
          <font-awesome-icon v-else="" icon="fa-solid fa-caret-right" />
        </DisclosureButton>
        <DisclosurePanel :class="cls_panel">
          <div class="italic my-2">
            Configure block-level flex container.
          </div>

          <div class="grid grid-cols-2 gap-2 justify-items-stretch items-end text-center">
            <div class="flex flex-col">
              <span>Direction</span>
              <SelectDirection
                :breakpoint="breakpoint"
                :extension="exts.flexContainer" 
                :editor="editor"
                :selected="nodeSelected"
                @select-direction="(p) => editor.chain().setFlexDirection({ ...p, selected: nodeSelected }).run()"
              />
            </div>

            <div class="flex flex-col">
              <span>Wrap</span>
              <SelectWrap
                :breakpoint="breakpoint"
                :extension="exts.flexContainer" 
                :editor="editor"
                :selected="nodeSelected"
                @select-wrap="(p) => editor.chain().setFlexWrap({ ...p, selected: nodeSelected }).run()"
              />
            </div>

            <div class="flex flex-col">
              <span>Justify content</span>
              <SelectJustifyContent
                :breakpoint="breakpoint"
                :extension="exts.flexContainer" 
                :editor="editor"
                :selected="nodeSelected"
                @select-justify-content="(p) => editor.chain().setFlexJustifyContent({ ...p, selected: nodeSelected }).run()"
              />
            </div>

            <div class="flex flex-col">
              <span>Align items</span>

              <SelectAlignItems
                :breakpoint="breakpoint"
                :extension="exts.flexContainer" 
                :editor="editor"
                :selected="nodeSelected"
                @select-align-items="(p) => editor.chain().setFlexAlignItems({ ...p, selected: nodeSelected}).run()"
              />
            </div>

            <div class="flex flex-col">
              <span>Align content</span>

              <SelectAlignContent
                :breakpoint="breakpoint"
                :extension="exts.flexContainer" 
                :editor="editor"
                :selected="nodeSelected"
                @select-align-content="(p) => editor.chain().setFlexAlignContent({ ...p, selected: nodeSelected}).run()"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 justify-items-center">
            <span>Horizontal Gap</span>
            <span>Vertical Gap</span>
            <SelectGap
              :breakpoint="breakpoint"
              :extension="exts.gap" 
              :editor="editor"
              :selected="nodeSelected"
              @select-gap="(p) => editor.chain().setGap({...p, selected: nodeSelected}).run()"
            />
          </div>
        </DisclosurePanel>
      </Disclosure>
    </section>

    <!-- FLEX ITEM -->

    <section :class="cls_section" v-if="exts.flexItem">
      <Disclosure v-slot="{ open }">
        <DisclosureButton :class="cls_disclosure_button">
          <span>Flex item</span>
          <font-awesome-icon v-if="open" icon="fa-solid fa-caret-down" />
          <font-awesome-icon v-else="" icon="fa-solid fa-caret-right" />
        </DisclosureButton>
        <DisclosurePanel :class="cls_panel">

          <div class="grid grid-cols-2 gap-2 justify-items-stretch items-end text-center">
            <div class="flex flex-col">
              <span>Basis</span>
              <SelectBasis
                :breakpoint="breakpoint"
                :extension="exts.flexItem" 
                :editor="editor"
                :selected="nodeSelected"
                @select-basis="(p) => editor.chain().setFlexBasis({ ...p, selected: nodeSelected }).run()"
              />
            </div>

            <div class="flex flex-col">
              <span>Grow</span>
              <SelectGrow
                :breakpoint="breakpoint"
                :extension="exts.flexItem" 
                :editor="editor"
                :selected="nodeSelected"
                @select-grow="(p) => editor.chain().setFlexGrow({ ...p, selected: nodeSelected }).run()"
              />
            </div>

            <div class="flex flex-col">
              <span>Shrink</span>
              <SelectShrink
                :breakpoint="breakpoint"
                :extension="exts.flexItem" 
                :editor="editor"
                :selected="nodeSelected"
                @select-shrink="(p) => editor.chain().setFlexShrink({ ...p, selected: nodeSelected }).run()"
              />
            </div>


            <div class="flex flex-col">
              <span>Flex</span>
              <SelectFlexGrowShrink
                class="w-full"
                :breakpoint="breakpoint"
                :extension="exts.flexItem" 
                :editor="editor"
                :selected="nodeSelected"
                @select-flex-grow-shrink="(p) => editor.chain().setFlexGrowShrink({ ...p, selected: nodeSelected }).run()"
              />
            </div>

          </div>
        </DisclosurePanel>
      </Disclosure>
    </section>

    <!-- CONTAINER -->
    <!--
<section name="container" :class="cls_section" v-if="ext_container">
<Disclosure v-slot="{ open }">
<DisclosureButton :class="cls_disclosure_button">
<span>Container</span>
<font-awesome-icon v-if="open" icon="fa-solid fa-caret-down" />
<font-awesome-icon v-else="" icon="fa-solid fa-caret-right" />
</DisclosureButton>
<DisclosurePanel :class="cls_panel">
<div class="italic my-2">
Fix width to the current breakpoint.
</div>
<SelectContainer
:breakpoint="breakpoint"
:extension="ext_container" 
:editor="editor"
@select-container="({container, breakpoint}) => editor.chain().setContainer(container, breakpoint).run()"
/>
</DisclosurePanel>
</Disclosure>
</section>
-->
    <!-- PADDING -->

    <section name="padding" :class="cls_section" v-if="exts.padding">
      <Disclosure v-slot="{ open }">
        <DisclosureButton :class="cls_disclosure_button">
          <span>Padding</span>
          <font-awesome-icon v-if="open" icon="fa-solid fa-caret-down" />
          <font-awesome-icon v-else="" icon="fa-solid fa-caret-right" />
        </DisclosureButton>
        <DisclosurePanel :class="cls_panel">
          <div class="italic my-2">Utilities for controlling an element's padding.</div>
          <SelectPadding 
            v-if="exts.padding" 
            :breakpoint="breakpoint"
            :extension="exts.padding" 
            :editor="editor"
            :selected="nodeSelected"
            @select-padding="(p) => editor.chain().setPadding({ ...p, selected: nodeSelected}).focus().run()"
          />
        </DisclosurePanel>
      </Disclosure>
    </section>

    <!-- MARGIN -->

    <section name="margin" :class="cls_section" v-if="exts.margin">
      <Disclosure v-slot="{ open }">
        <DisclosureButton :class="cls_disclosure_button">
          <span>Margin</span>
          <font-awesome-icon v-if="open" icon="fa-solid fa-caret-down" />
          <font-awesome-icon v-else="" icon="fa-solid fa-caret-right" />
        </DisclosureButton>
        <DisclosurePanel :class="cls_panel">
          <div class="italic my-2">Utilities for controlling an element's margin.</div>
          <SelectMargin 
            v-if="exts.margin" 
            :breakpoint="breakpoint"
            :extension="exts.margin" 
            :editor="editor"
            :selected="nodeSelected"
            @select-margin="(p) => editor.chain().focus().setMargin({...p, selected: nodeSelected}).run()"
          />
        </DisclosurePanel>
      </Disclosure>
    </section>

    <!-- FLOAT -->

    <section name="float" :class="cls_section" v-if="exts.float">
      <Disclosure v-slot="{ open }">
        <DisclosureButton :class="cls_disclosure_button">
          <span>Float</span>
          <font-awesome-icon v-if="open" icon="fa-solid fa-caret-down" />
          <font-awesome-icon v-else="" icon="fa-solid fa-caret-right" />
        </DisclosureButton>
        <DisclosurePanel :class="cls_panel">
          <div class="italic my-2">Utilities for controlling the wrapping of content around an element.</div>
          <SelectFloat
            :breakpoint="breakpoint"
            :extension="exts.float" 
            :editor="editor"
            :selected="nodeSelected"
            @select-float="(p) => editor.chain().setFloat({ ...p, selected: nodeSelected }).run()"
          />
        </DisclosurePanel>
      </Disclosure>
    </section>

    <!-- CLEAR -->

    <section name="clear" :class="cls_section" v-if="exts.clear">
      <Disclosure v-slot="{ open }">
        <DisclosureButton :class="cls_disclosure_button">
          <span>Clear</span>
          <font-awesome-icon v-if="open" icon="fa-solid fa-caret-down" />
          <font-awesome-icon v-else="" icon="fa-solid fa-caret-right" />
        </DisclosureButton>
        <DisclosurePanel :class="cls_panel">
          <div class="italic my-2">It sets wether an element must be moved below (cleared) floating elements that precede it.</div>
          <SelectClear
            :breakpoint="breakpoint"
            :extension="exts.clear" 
            :editor="editor"
            :selected="nodeSelected"
            @select-clear="(p) => editor.chain().setClear({ ...p, selected: nodeSelected }).run()"
          />
        </DisclosurePanel>
      </Disclosure>
    </section>

    <!-- ALIGN -->

    <section name="align" :class="cls_section" v-if="exts.align">
      <Disclosure v-slot="{ open }">
        <DisclosureButton :class="cls_disclosure_button">
          <span>Align</span>
          <font-awesome-icon v-if="open" icon="fa-solid fa-caret-down" />
          <font-awesome-icon v-else="" icon="fa-solid fa-caret-right" />
        </DisclosureButton>
        <DisclosurePanel :class="cls_panel">
          <div class="italic my-2">Utilities for controlling the alignment.</div>
          <SelectAlign
            v-if="exts.align" 
            :breakpoint="breakpoint"
            :extension="exts.align" 
            :editor="editor"
            :selected="nodeSelected"
            @select-align="(p) => editor.chain().setAlign({ ...p, selected: nodeSelected }).run()"
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
          <div class="italic mt-2">Utilities for sizings of an element.</div>
          <div class="grid grid-rows-6 grid-cols-2 gap-x-2 justify-items-stretch items-end text-center">

            <span v-if="exts.width">Width</span>
            <span v-if="exts.height">Height</span>

            <SelectWidth
              v-if="exts.width" 
              :breakpoint="breakpoint"
              :extension="exts.width" 
              :editor="editor"
              :selected="nodeSelected"
              @select-width="(p) => editor.chain().setWidth({ ...p, selected: nodeSelected }).run()"
            />

            <SelectHeight
              v-if="exts.height" 
              :breakpoint="breakpoint"
              :extension="exts.height" 
              :editor="editor"
              :selected="nodeSelected"
              @select-height="(p) => editor.chain().setHeight({ ...p, selected: nodeSelected }).run()"
            />

            <span v-if="exts.minWidth">Min. Width</span>

            <span v-if="exts.minHeight">Min. Height</span>

            <SelectMinWidth
              v-if="exts.minWidth" 
              :breakpoint="breakpoint"
              :extension="exts.minWidth" 
              :selected="nodeSelected"
              :editor="editor"
              @select-minWidth="(p) => editor.chain().setMinWidth({ ...p, selected: nodeSelected }).run()"
            />

            <SelectMinHeight
              v-if="exts.minHeight" 
              :breakpoint="breakpoint"
              :extension="exts.minHeight" 
              :editor="editor"
              :selected="nodeSelected"
              @select-minHeight="(p) => editor.chain().setMinHeight({ ...p, selected: nodeSelected }).run()"
            />


            <span v-if="exts.maxWidth">Max. Width</span>
            <span v-if="exts.maxHeight">Max. Height</span>
            <SelectMaxWidth
              v-if="exts.maxWidth" 
              :breakpoint="breakpoint"
              :extension="exts.maxWidth" 
              :editor="editor"
              :selected="nodeSelected"
              @select-maxWidth="(p) => editor.chain().setMaxWidth({ ...p, selected: nodeSelected }).run()"
            />

            <SelectMaxHeight
              v-if="exts.maxHeight" 
              :breakpoint="breakpoint"
              :extension="exts.maxHeight" 
              :editor="editor"
              :selected="nodeSelected"
              @select-maxHeight="(p) => editor.chain().setMaxHeight({ ...p, selected: nodeSelected }).run()"
            />
          </div>

        </DisclosurePanel>
      </Disclosure>
    </section>

    <!-- BACKGROUNDS -->

    <section name="colors" :class="cls_section" v-if="exts.backgroundColor">
      <Disclosure v-slot="{ open }">
        <DisclosureButton :class="cls_disclosure_button">
          <span>Background</span>
          <font-awesome-icon v-if="open" icon="fa-solid fa-caret-down" />
          <font-awesome-icon v-else="" icon="fa-solid fa-caret-right" />
        </DisclosureButton>
        <DisclosurePanel :class="cls_panel">
          <div class="italic my-2">Utilities for controlling the background.</div>
          <div class="gap-x-2 grid justify-items-center items-center grid-rows-2 grid-cols-1">
            <span>Color</span>

            <SelectBackgroundColor
              class="w-full"
              v-if="exts.backgroundColor" 
              :breakpoint="breakpoint"
              :extension="exts.backgroundColor" 
              :editor="editor"
              :selected="nodeSelected"
              @select-background-color="(p) =>
                editor.chain().focus().setBackgroundColor({...p, selected: nodeSelected}).run()"
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
              v-if="exts.fontItalic"
              :breakpoint="breakpoint"
              :extension="exts.fontItalic"
              :editor="editor"
              @select-font-italic="({italic}) => editor.chain().focus().setFontItalic(italic, breakpoint).run()"
            />

            <SelectFontWeight 
              class="flex"
              v-if="exts.fontWeight"
              :breakpoint="breakpoint"
              :extension="exts.fontWeight"
              :editor="editor"
              @select-font-weight="({weight}) => editor.chain().focus().setFontWeight(weight, breakpoint).run()"
            />

            <SelectTextDecoration 
              class="flex gap-2"
              v-if="exts.textDecoration"
              :breakpoint="breakpoint"
              :extension="exts.textDecoration"
              :editor="editor"
              @select-text-decoration="({decoration}) => editor.chain().focus().setTextDecoration(decoration, breakpoint).run()"
            />

          </div>

          <div class="mt-2 gap-2 grid justify-items-center items-center grid-cols-2">
            <div class="w-full items-center flex flex-col">
              <span>Color</span>

              <SelectTextColor
                class="w-full"
                v-if="exts.textColor" 
                :breakpoint="breakpoint"
                :extension="exts.textColor" 
                :editor="editor"
                @select-text-color="({color, variant, breakpoint}) => editor.chain().focus().setTextColor(color, variant, breakpoint).run()"
              />
            </div>

            <div class="w-full items-center flex flex-col">
              <span>Size</span>

              <SelectFontSize 
                class="w-full"
                v-if="exts.fontSize"
                :breakpoint="breakpoint"
                :extension="exts.fontSize"
                :editor="editor"
                @select-font-size="({size}) => editor.chain().focus().setFontSize(size, breakpoint).run()"
              />
            </div>

            <div class="w-full items-center flex flex-col">
              <span>Family</span>

              <SelectFontFamily 
                class="w-full"
                v-if="exts.fontFamily"
                :breakpoint="breakpoint"
                :extension="exts.fontFamily"
                :editor="editor"
                @select-font-family="({family}) => editor.chain().focus().setFontFamily(family, breakpoint).run()"
              />
            </div>

          </div>
        </DisclosurePanel>
      </Disclosure>
    </section>

  </div>
</template>

<script setup>

import { ref, computed, watch } from 'vue'
import { useEditorStore, useEditorEventStore } from '@/stores/editor'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue'

import { storeToRefs } from 'pinia'

import SelectBreakpoint from '@/components/editor/tiptap/breakpoint/SelectBreakpoint.vue'
import SelectPadding from '@/components/editor/tiptap/padding/SelectPadding.vue'
import SelectMargin from '@/components/editor/tiptap/margin/SelectMargin.vue'
import SelectFloat from '@/components/editor/tiptap/float-extension/SelectFloat.vue'
import SelectClear from '@/components/editor/tiptap/clear-extension/SelectClear.vue'
import SelectAlign from '@/components/editor/tiptap/align-extension/SelectAlign.vue'
import SelectTextColor from '@/components/editor/tiptap/text-color/SelectTextColor.vue'
import SelectBackgroundColor from '@/components/editor/tiptap/background-color/SelectBackgroundColor.vue'
import SelectFontWeight from '@/components/editor/tiptap/font-weight-extension/SelectFontWeight.vue'
import SelectFontSize from '@/components/editor/tiptap/fontsize/SelectFontSize.vue'
import SelectFontFamily from '@/components/editor/tiptap/font-family-extension/SelectFontFamily.vue'
import SelectFontItalic from '@/components/editor/tiptap/font-italic-extension/SelectFontItalic.vue'
import SelectTextDecoration from '@/components/editor/tiptap/text-decoration-extension/SelectTextDecoration.vue'
import SelectWidth from '@/components/editor/tiptap/width-extension/SelectWidth.vue'
import SelectMinWidth from '@/components/editor/tiptap/min-width-extension/SelectMinWidth.vue'
import SelectMaxWidth from '@/components/editor/tiptap/max-width-extension/SelectMaxWidth.vue'
import SelectHeight from '@/components/editor/tiptap/height-extension/SelectHeight.vue'
import SelectMinHeight from '@/components/editor/tiptap/min-height-extension/SelectMinHeight.vue'
import SelectMaxHeight from '@/components/editor/tiptap/max-height-extension/SelectMaxHeight.vue'
import SelectContainer from '@/components/editor/tiptap/container-extension/SelectContainer.vue'
import SelectDirection from '@/components/editor/tiptap/flex-container-extension/SelectDirection.vue'
import SelectWrap from '@/components/editor/tiptap/flex-container-extension/SelectWrap.vue'
import SelectJustifyContent from '@/components/editor/tiptap/flex-container-extension/SelectJustifyContent.vue'
import SelectAlignItems from '@/components/editor/tiptap/flex-container-extension/SelectAlignItems.vue'
import SelectAlignContent from '@/components/editor/tiptap/flex-container-extension/SelectAlignContent.vue'
import SelectBasis from '@/components/editor/tiptap/flex-item-extension/SelectBasis.vue'
import SelectFlexGrowShrink from '@/components/editor/tiptap/flex-item-extension/SelectFlexGrowShrink.vue'
import SelectGrow from '@/components/editor/tiptap/flex-item-extension/SelectGrow.vue'
import SelectShrink from '@/components/editor/tiptap/flex-item-extension/SelectShrink.vue'
import SelectGap from '@/components/editor/tiptap/gap-extension/SelectGap.vue'

const { editor } = storeToRefs(useEditorStore())

const storeEditorEvent = useEditorEventStore()
const { 
  nodeSelected, 
  nodeHover, 
  lineage
} = storeToRefs(storeEditorEvent)

watch(nodeSelected, () => {
  decorate('selectNode', nodeSelected.value)
})

watch(nodeHover, () => {
  decorate('highlightNode', nodeHover.value)
})

watch(lineage, () => {
  if (!lineage.value?.has(nodeSelected.value?.pos)) {
    nodeSelected.value = [...lineage.value.values()].at(-1)
  } else {
    decorate('selectNode', nodeSelected.value)
  }
})

const selected = nodeSelected

const breakpoint = ref(null)
const change_breakpoint = (value) => breakpoint.value = value

const exts = computed(() => {
  const obj = {}

  editor.value.extensionManager.extensions.reduce(
    (accumulator, currentValue) => {
      let match = false

      switch (currentValue.type) {
        case 'node':
          match = nodeSelected?.value?.node.type.name === currentValue.name
          break
        case 'extension':
          match = currentValue?.options?.types?.indexOf(nodeSelected?.value?.node.type.name) 
          match = match !== -1 && match !== undefined
          break
        case 'mark':
          match = true
          break
        default:
          console.debug('===>>> [COMPUTED] extension excluded: ', currentValue)
          break
      }

      if (match) {
          obj[currentValue.name] = { ...currentValue }
      }
    }, obj
  ) // reduce
  
  return obj
})

const cls_disclosure_button = [
  'flex', 'w-full', '', 'items-center', 'justify-between', 
  'text-left', 'text-sm', 'font-medium', 'text-slate-100', 'pr-1'
]

const cls_section = []
const cls_panel = ['text-sm', 'mb-4', 'p-2']

const selected_type = computed(() => selected.value?.node?.type.name)

const decorate = (key, p) => {
  if (!p) {
    p = {node: null, pos: null}
  } 

  editor.value.chain().focus().setMeta(key, p).run()
}

watch(editor, () => {
  if (!editor.value) {
    return false
  }

  /*
  editor.value.on('transaction', ({ editor, transaction }) => {
    console.debug('===> [EVENT] TRANSACTION')
  })
  */

  editor.value.on('update', ({ transaction }) => {
    /*  
      Nodes are immutable so we need to update the reference otherwise
      we're keeping a reference to an object that is not being mutated
    */

    nodeSelected.value.node = transaction.doc.nodeAt(nodeSelected.value.pos)
    decorate('selectNode', nodeSelected.value)
  })

})

</script>
