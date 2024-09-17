<template>
  <div v-if="select_editor" class="p-2 bg-gray-700 w-64 max-w-64 min-h-screen text-gray-200 flex flex-col">

    <!-- BREAKPOINT -->

    <section name="breakpoint" class="m-4" :class="cls_section">
      <SelectBreakpoint @select-breakpoint="change_breakpoint" />
    </section>

    <p class="text-center my-4">Unique type-defined properties</p>

    <!-- FLEX CONTAINER -->

    <section :class="cls_section" v-if="ext_flex && select_editor.isActive('flexContainer')">
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

          <button @click="select_editor.commands.deleteNode('flexContainer')"
            class="text-white bg-red-700 hover:bg-red-800 font-medium
            rounded-full text-xs px-3 py-2 text-center dark:bg-red-600
            dark:hover:bg-red-700">
            Delete
          </button>

          <div class="grid grid-cols-2 gap-2 justify-items-stretch items-end text-center">
            <div class="flex flex-col">
              <span>Direction</span>
              <SelectDirection
                :breakpoint="breakpoint"
                :extension="ext_flex" 
                :transaction="select_transaction"
                :editor="select_editor"
                @select-direction="({direction, breakpoint}) => select_editor.chain().setFlexDirection(direction, breakpoint).run()"
              />
            </div>

            <div class="flex flex-col">
              <span>Wrap</span>
              <SelectWrap
                :breakpoint="breakpoint"
                :extension="ext_flex" 
                :transaction="select_transaction"
                :editor="select_editor"
                @select-wrap="({wrap, breakpoint}) => select_editor.chain().setFlexWrap(wrap, breakpoint).run()"
              />
            </div>

            <div class="flex flex-col">
              <span>Justify content</span>
              <SelectJustifyContent
                :breakpoint="breakpoint"
                :extension="ext_flex" 
                :transaction="select_transaction"
                :editor="select_editor"
                @select-justify-content="({justify, breakpoint}) => select_editor.chain().setFlexJustifyContent(justify, breakpoint).run()"
              />
            </div>

            <div class="flex flex-col">
              <span>Align items</span>

              <SelectAlignItems
                :breakpoint="breakpoint"
                :extension="ext_flex" 
                :transaction="select_transaction"
                :editor="select_editor"
                @select-align-items="({align, breakpoint}) => select_editor.chain().setFlexAlignItems(align, breakpoint).run()"
              />
            </div>

            <div class="flex flex-col">
              <span>Align content</span>

              <SelectAlignContent
                :breakpoint="breakpoint"
                :extension="ext_flex" 
                :transaction="select_transaction"
                :editor="select_editor"
                @select-align-content="({align, breakpoint}) => select_editor.chain().setFlexAlignContent(align, breakpoint).run()"
              />
            </div>

            <div class="flex flex-col">
              <span>Gap</span>
              <SelectGap
                :breakpoint="breakpoint"
                :extension="ext_gap" 
                :transaction="select_transaction"
                :editor="select_editor"
                @select-gap="({side, gap, breakpoint}) => select_editor.chain().setGap(side, gap, breakpoint).run()"
              />
            </div>

          </div>

        </DisclosurePanel>
      </Disclosure>
    </section>

    <!-- FLEX ITEM -->

    <section :class="cls_section" v-if="ext_flex_item && select_editor.isActive('flexItem')">
      <Disclosure v-slot="{ open }">
        <DisclosureButton :class="cls_disclosure_button">
          <span>Flex item</span>
          <font-awesome-icon v-if="open" icon="fa-solid fa-caret-down" />
          <font-awesome-icon v-else="" icon="fa-solid fa-caret-right" />
        </DisclosureButton>
        <DisclosurePanel :class="cls_panel">

          <div class="italic my-2">
            Configure flex item.
          </div>
          <div>
            <button @click="select_editor.commands.deleteNode('flexItem')"
              class="text-white bg-red-700 hover:bg-red-800 font-medium
              rounded-full text-xs px-3 py-2 text-center dark:bg-red-600
              dark:hover:bg-red-700">
              Delete
            </button>
            <button @click=""
              class="text-white bg-lime-700 hover:bg-lime-800 font-medium
              rounded-full text-xs px-3 py-2 text-center dark:bg-lime-600
              dark:hover:bg-lime-700">
              Add
            </button>

          </div>
          <div class="grid grid-cols-2 gap-2 justify-items-stretch items-end text-center">
            <div class="flex flex-col">
              <span>Basis</span>
              <SelectBasis
                :breakpoint="breakpoint"
                :extension="ext_flex_item" 
                :transaction="select_transaction"
                :editor="select_editor"
                @select-basis="({basis, breakpoint}) => select_editor.chain().setFlexBasis(basis, breakpoint).run()"
              />
            </div>

            <div class="flex flex-col">
              <span>Flex</span>
              <SelectFlexGrowShrink
                class="w-full"
                :breakpoint="breakpoint"
                :extension="ext_flex_item" 
                :transaction="select_transaction"
                :editor="select_editor"
                @select-flex-grow-shrink="({flex, breakpoint}) => select_editor.chain().setFlexGrowShrink(flex, breakpoint).run()"
              />
            </div>

          </div>
        </DisclosurePanel>
      </Disclosure>
    </section>

    <!-- NODE -->

    <p class="text-center my-4">Shared type-defined properties</p>

    <section name="node" class="mb-4 " :class="cls_section">
      <div class="flex gap-2 flex-wrap justify-stretch">
        <button @click="selected_type = t" v-for="t in active_types"
          type="button" 
          :class="{'outline-none ring-4 ring-red-300 dark:ring-red-900': t == selected_type}"
          class="text-white bg-red-700 hover:bg-red-800 font-medium
          rounded-full text-xs px-3 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700">{{ t }}</button>
      </div>
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
:transaction="select_transaction"
:editor="select_editor"
@select-container="({container, breakpoint}) => select_editor.chain().setContainer(container, breakpoint).run()"
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
            :transaction="select_transaction"
            :editor="select_editor"
            :type="selected_type"
            @select-padding="({side, level, breakpoint}) => select_editor.chain().setPadding(side, level, breakpoint, unref(selected_type)).run()"
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
            :type="selected_type"
            @select-margin="({side, level, breakpoint}) => select_editor.chain().setMargin(side, level, breakpoint, unref(selected_type)).run()"
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
            @select-float="({float, breakpoint}) => select_editor.chain().setFloat(float, breakpoint).run()"
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
            :transaction="select_transaction"
            :editor="select_editor"
            @select-clear="({clear, breakpoint}) => select_editor.chain().setClear(clear, breakpoint).run()"
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
          <div class="italic mt-2">Utilities for sizings of an element.</div>
          <div class="grid grid-rows-6 grid-cols-2 gap-x-2 justify-items-stretch items-end text-center">

            <span>Width</span>
            <span>Height</span>

            <SelectWidth
              v-if="ext_width" 
              :breakpoint="breakpoint"
              :extension="ext_width" 
              :type="selected_type"
              :transaction="select_transaction"
              :editor="select_editor"
              @select-width="({width, breakpoint, raw}) => select_editor.chain().setWidth(width, breakpoint, raw, unref(selected_type)).run()"
            />

            <SelectHeight
              v-if="ext_height" 
              :breakpoint="breakpoint"
              :extension="ext_height" 
              :type="selected_type"
              :transaction="select_transaction"
              :editor="select_editor"
              @select-height="({height, breakpoint, raw}) => select_editor.chain().setHeight(height, breakpoint, raw, unref(selected_type)).run()"
            />

            <span>Min. Width</span>

            <span>Min. Height</span>

            <SelectMinWidth
              v-if="ext_min_width" 
              :breakpoint="breakpoint"
              :extension="ext_min_width" 
              :type="selected_type"
              :transaction="select_transaction"
              :editor="select_editor"
              @select-minWidth="({minWidth, breakpoint}) => select_editor.chain().setMinWidth(minWidth, breakpoint, unref(selected_type)).run()"
            />

            <SelectMinHeight
              v-if="ext_min_height" 
              :breakpoint="breakpoint"
              :extension="ext_min_height" 
              :type="selected_type"
              :transaction="select_transaction"
              :editor="select_editor"
              @select-minHeight="({minHeight, breakpoint}) => select_editor.chain().setMinHeight(minHeight, breakpoint, unref(selected_type)).run()"
            />


            <span>Max. Width</span>
            <span>Max. Height</span>
            <SelectMaxWidth
              v-if="ext_max_width" 
              :breakpoint="breakpoint"
              :extension="ext_max_width" 
              :transaction="select_transaction"
              :editor="select_editor"
              @select-maxWidth="({maxWidth, breakpoint}) => select_editor.chain().setMaxWidth(maxWidth, breakpoint, unref(selected_type)).run()"
            />

            <SelectMaxHeight
              v-if="ext_max_height" 
              :breakpoint="breakpoint"
              :extension="ext_max_height" 
              :transaction="select_transaction"
              :editor="select_editor"
              @select-maxHeight="({maxHeight, breakpoint}) => select_editor.chain().setMaxHeight(maxHeight, breakpoint, unref(selected_type)).run()"
            />
          </div>

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
          <div class="gap-x-2 grid justify-items-center items-center grid-rows-2 grid-cols-1">
            <span>Background</span>

            <SelectBackgroundColor
              class="w-full"
              v-if="ext_background_color" 
              :breakpoint="breakpoint"
              :extension="ext_text_color" 
              :transaction="select_transaction"
              :editor="select_editor"
              :type="selected_type"
              @select-background-color="({color, variant, breakpoint}) => select_editor.chain().focus().setBackgroundColor(color, variant, breakpoint, unref(selected_type)).run()"
            />

          </div>
        </DisclosurePanel>
      </Disclosure>
    </section>

    <!-- TYPOGRAPHY -->

    <section name="typography" v-if="selection_has_text" :class="cls_section">
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

          <div class="mt-2 gap-2 grid justify-items-center items-center grid-cols-2">
            <div class="w-full items-center flex flex-col">
              <span>Color</span>

              <SelectTextColor
                class="w-full"
                v-if="ext_text_color" 
                :breakpoint="breakpoint"
                :extension="ext_text_color" 
                :transaction="select_transaction"
                :editor="select_editor"
                @select-text-color="({color, variant, breakpoint}) => select_editor.chain().focus().setTextColor(color, variant, breakpoint).run()"
              />
            </div>

            <div class="w-full items-center flex flex-col">
              <span>Size</span>

              <SelectFontSize 
                class="w-full"
                v-if="ext_font_size"
                :breakpoint="breakpoint"
                :extension="ext_font_size"
                :transaction="select_transaction"
                :editor="select_editor"
                @select-font-size="({size}) => select_editor.chain().focus().setFontSize(size, breakpoint).run()"
              />
            </div>

            <div class="w-full items-center flex flex-col">
              <span>Family</span>

              <SelectFontFamily 
                class="w-full"
                v-if="ext_font_family"
                :breakpoint="breakpoint"
                :extension="ext_font_family"
                :transaction="select_transaction"
                :editor="select_editor"
                @select-font-family="({family}) => select_editor.chain().focus().setFontFamily(family, breakpoint).run()"
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
import SelectGap from '@/components/editor/tiptap/gap-extension/SelectGap.vue'

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
  'flex', 'w-full', 'gap-4', 'items-center', 'justify-between', 
  'text-left', 'text-sm', 'font-medium', 'text-slate-100', 'pr-1'
]

const cls_section = []
const cls_panel = ['text-sm', 'mb-4', 'p-2']

const select_transaction = ref()
const select_editor = ref()

const active_types = ref()
const selected_type = ref()
const selection_has_text = ref(false)

watch(editors, () => {
  if (!select_editor.value) {
    select_editor.value = unref(editors.get('current'))
    console.log('EDITOR ---> ', select_editor.value)

    if (!select_editor.value) {
      return false
    }

    select_editor.value.on('selectionUpdate', ({ editor }) => {
      const selection = editor.state.selection

      console.log('UPDATE : ', editor)

      // Does the selection contains text?
      if (editor.state.doc.textBetween(selection.from, selection.to)) {
        selection_has_text.value = true
      } else {
        selection_has_text.value = false
      }

      const pos = selection.$cursor ? selection.$cursor : selection.$head
      const path_types = pos.path.filter(
        (x) => typeof(x) === 'object' && select_editor.value.isActive(x.type.name)
      ).map(
        (x) => x.type.name
      )

      if (selection.jsonID == 'node') {
        path_types.push(selection.node.type.name)
      }

      active_types.value = path_types

      if (!selected_type.value || (selected_type.value && path_types.indexOf(selected_type.value) === -1)) {
        selected_type.value = path_types.slice(-1).pop()
      }


      console.log(path_types)
    })

  }
}, { deep: true })

watch(select_editor, () => {
  if (select_editor.value) {
    console.log(select_editor.value)
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
})

</script>
