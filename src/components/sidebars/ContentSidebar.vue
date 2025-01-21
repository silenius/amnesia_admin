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

    <section :class="cls_section" v-if="ext_flex && selected_type == 'flexContainer'">
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
                :extension="ext_flex" 
                :editor="editor"
                :selected="nodeSelected"
                @select-direction="(p) => editor.chain().setFlexDirection({ ...p, selected: nodeSelected }).run()"
              />
            </div>

            <div class="flex flex-col">
              <span>Wrap</span>
              <SelectWrap
                :breakpoint="breakpoint"
                :extension="ext_flex" 
                :editor="editor"
                :selected="nodeSelected"
                @select-wrap="(p) => editor.chain().setFlexWrap({ ...p, selected: nodeSelected }).run()"
              />
            </div>

            <div class="flex flex-col">
              <span>Justify content</span>
              <SelectJustifyContent
                :breakpoint="breakpoint"
                :extension="ext_flex" 
                :editor="editor"
                :selected="nodeSelected"
                @select-justify-content="(p) => editor.chain().setFlexJustifyContent({ ...p, selected: nodeSelected }).run()"
              />
            </div>

            <div class="flex flex-col">
              <span>Align items</span>

              <SelectAlignItems
                :breakpoint="breakpoint"
                :extension="ext_flex" 
                :editor="editor"
                :selected="nodeSelected"
                @select-align-items="(p) => editor.chain().setFlexAlignItems({ ...p, selected: nodeSelected}).run()"
              />
            </div>

            <div class="flex flex-col">
              <span>Align content</span>

              <SelectAlignContent
                :breakpoint="breakpoint"
                :extension="ext_flex" 
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
              :extension="ext_gap" 
              :editor="editor"
              :selected="nodeSelected"
              @select-gap="(p) => editor.chain().setGap({...p, selected: nodeSelected}).run()"
            />
          </div>
        </DisclosurePanel>
      </Disclosure>
    </section>

    <!-- FLEX ITEM -->

    <section :class="cls_section" v-if="ext_flex_item && selected_type == 'flexItem'"> 
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
                :extension="ext_flex_item" 
                :editor="editor"
                :selected="nodeSelected"
                @select-basis="(p) => editor.chain().setFlexBasis({ ...p, selected: nodeSelected }).run()"
              />
            </div>

            <div class="flex flex-col">
              <span>Grow</span>
              <SelectGrow
                :breakpoint="breakpoint"
                :extension="ext_flex_item" 
                :editor="editor"
                :selected="nodeSelected"
                @select-grow="(p) => editor.chain().setFlexGrow({ ...p, selected: nodeSelected }).run()"
              />
            </div>

            <div class="flex flex-col">
              <span>Shrink</span>
              <SelectShrink
                :breakpoint="breakpoint"
                :extension="ext_flex_item" 
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
                :extension="ext_flex_item" 
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
            :editor="editor"
            :selected="nodeSelected"
            @select-padding="(p) => editor.chain().setPadding({ ...p, selected: nodeSelected}).focus().run()"
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
            :editor="editor"
            :selected="nodeSelected"
            @select-margin="(p) => editor.chain().focus().setMargin({...p, selected: nodeSelected}).run()"
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
            :editor="editor"
            :selected="nodeSelected"
            @select-float="(p) => editor.chain().setFloat({ ...p, selected: nodeSelected }).run()"
          />
        </DisclosurePanel>
      </Disclosure>
    </section>

    <!-- CLEAR -->

    <section name="clear" :class="cls_section" v-if="ext_clear">
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
            :extension="ext_float" 
            :editor="editor"
            :selected="nodeSelected"
            @select-clear="(p) => editor.chain().setClear({ ...p, selected: nodeSelected }).run()"
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

            <span>Width</span>
            <span>Height</span>

            <SelectWidth
              v-if="ext_width" 
              :breakpoint="breakpoint"
              :extension="ext_width" 
              :editor="editor"
              :selected="nodeSelected"
              @select-width="(p) => editor.chain().setWidth({ ...p, selected: nodeSelected }).run()"
            />

            <SelectHeight
              v-if="ext_height" 
              :breakpoint="breakpoint"
              :extension="ext_height" 
              :editor="editor"
              :selected="nodeSelected"
              @select-height="(p) => editor.chain().setHeight({ ...p, selected: nodeSelected }).run()"
            />

            <span>Min. Width</span>

            <span>Min. Height</span>

            <SelectMinWidth
              v-if="ext_min_width" 
              :breakpoint="breakpoint"
              :extension="ext_min_width" 
              :selected="nodeSelected"
              :editor="editor"
              @select-minWidth="(p) => editor.chain().setMinWidth({ ...p, selected: nodeSelected }).run()"
            />

            <SelectMinHeight
              v-if="ext_min_height" 
              :breakpoint="breakpoint"
              :extension="ext_min_height" 
              :editor="editor"
              :selected="nodeSelected"
              @select-minHeight="(p) => editor.chain().setMinHeight({ ...p, selected: nodeSelected }).run()"
            />


            <span>Max. Width</span>
            <span>Max. Height</span>
            <SelectMaxWidth
              v-if="ext_max_width" 
              :breakpoint="breakpoint"
              :extension="ext_max_width" 
              :editor="editor"
              :selected="nodeSelected"
              @select-maxWidth="(p) => editor.chain().setMaxWidth({ ...p, selected: nodeSelected }).run()"
            />

            <SelectMaxHeight
              v-if="ext_max_height" 
              :breakpoint="breakpoint"
              :extension="ext_max_height" 
              :editor="editor"
              :selected="nodeSelected"
              @select-maxHeight="(p) => editor.chain().setMaxHeight({ ...p, selected: nodeSelected }).run()"
            />
          </div>

        </DisclosurePanel>
      </Disclosure>
    </section>

    <!-- BACKGROUNDS -->

    <section name="colors" :class="cls_section">
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
              v-if="ext_background_color" 
              :breakpoint="breakpoint"
              :extension="ext_text_color" 
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
              v-if="ext_font_italic"
              :breakpoint="breakpoint"
              :extension="ext_font_italic"
              :editor="editor"
              @select-font-italic="({italic}) => editor.chain().focus().setFontItalic(italic, breakpoint).run()"
            />

            <SelectFontWeight 
              class="flex"
              v-if="ext_font_weight"
              :breakpoint="breakpoint"
              :extension="ext_font_weight"
              :editor="editor"
              @select-font-weight="({weight}) => editor.chain().focus().setFontWeight(weight, breakpoint).run()"
            />

            <SelectTextDecoration 
              class="flex gap-2"
              v-if="ext_text_decoration"
              :breakpoint="breakpoint"
              :extension="ext_text_decoration"
              :editor="editor"
              @select-text-decoration="({decoration}) => editor.chain().focus().setTextDecoration(decoration, breakpoint).run()"
            />

          </div>

          <div class="mt-2 gap-2 grid justify-items-center items-center grid-cols-2">
            <div class="w-full items-center flex flex-col">
              <span>Color</span>

              <SelectTextColor
                class="w-full"
                v-if="ext_text_color" 
                :breakpoint="breakpoint"
                :extension="ext_text_color" 
                :editor="editor"
                @select-text-color="({color, variant, breakpoint}) => editor.chain().focus().setTextColor(color, variant, breakpoint).run()"
              />
            </div>

            <div class="w-full items-center flex flex-col">
              <span>Size</span>

              <SelectFontSize 
                class="w-full"
                v-if="ext_font_size"
                :breakpoint="breakpoint"
                :extension="ext_font_size"
                :editor="editor"
                @select-font-size="({size}) => editor.chain().focus().setFontSize(size, breakpoint).run()"
              />
            </div>

            <div class="w-full items-center flex flex-col">
              <span>Family</span>

              <SelectFontFamily 
                class="w-full"
                v-if="ext_font_family"
                :breakpoint="breakpoint"
                :extension="ext_font_family"
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

import { ref, computed, unref, watch } from 'vue'
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
const ext_min_width = ref()
const ext_max_width = ref()
const ext_height = ref()
const ext_min_height = ref()
const ext_max_height = ref()
const ext_container = ref()
const ext_clear = ref()
const ext_flex = ref()
const ext_flex_item = ref()
const ext_gap = ref()

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

  editor.value.on('transaction', ({ editor, transaction }) => {
    console.debug('===> [EVENT] TRANSACTION')
  })

  editor.value.on('update', ({ editor, transaction }) => {
    console.debug('===> [EVENT] CONTENT UPDATE', transaction)
    /*  
          Nodes are immutable so we need to update the reference otherwise
          we're keeping a reference to an object that is not being mutated
    */

    nodeSelected.value.node = transaction.doc.nodeAt(nodeSelected.value.pos)
  })

    const exts = editor.value.extensionManager.extensions

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
    ext_min_width.value = exts.find(ext => ext.name == 'minWidth')
    ext_max_width.value = exts.find(ext => ext.name == 'maxWidth')
    ext_height.value = exts.find(ext => ext.name == 'height')
    ext_min_height.value = exts.find(ext => ext.name == 'minHeight')
    ext_max_height.value = exts.find(ext => ext.name == 'maxHeight')
    ext_container.value = exts.find(ext => ext.name == 'container')
    ext_clear.value = exts.find(ext => ext.name == 'clear')
    ext_flex.value = exts.find(ext => ext.name == 'flexContainer')
    ext_flex_item.value = exts.find(ext => ext.name == 'flexItem')
    ext_gap.value = exts.find(ext => ext.name == 'gap')
  }
)

</script>
