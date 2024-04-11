<template>

  <TransitionRoot appear :show="open" as="template">
    <Dialog as="div"  class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
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
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-bold leading-6 text-gray-900"
              >
                Select color
              </DialogTitle>

              <div class="my-2">
                <p class="text-sm text-gray-500">Please select a color</p>
              </div>

              <section class="my-4">
                <p class="my-2">Unshaded colors</p>

                <div class="flex mb-1 gap-1">
                  <button 
                    v-for="color in unshaded_colors"
                    :key="color"
                    @click.prevent="close(); onSelectColor(color)"
                    :class="[`bg-${color}`, `hover:outline-${color}`]"
                    class="hover:outline w-10 hover:outline-2 border
                    hover:outline-offset-2 p-1 text-xs truncate">
                    {{ color }}
                  </button>
                </div>
              </section>

              <section>

                <p class="my-2">Shaded colors</p>
                <div v-for="color in shaded_colors" class="flex mb-1 gap-1">
                  <div class="flex gap-0.5">
                    <button 
                      v-for="variant in shades" 
                      @click.prevent="onSelectColor(color, variant)"
                      :class="[`bg-${color}-${variant}`, `hover:outline-${color}-${variant}`]"
                      class="hover:outline hover:outline-2
                      hover:outline-offset-1 w-8 h-6 rounded-md">
                    </button>
                  </div>
                </div>

              </section>

              <div class="mt-4">
                <button
                  @click="onCloseModal"
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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

</template>

<script setup>

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue'

import { 
  shaded_colors, 
  unshaded_colors, 
  shades 
} from '@/components/editor/tiptap/colors'

const props = defineProps({
  unshaded_colors: {
    type: Set,
    default: unshaded_colors
  },
  shaded_colors: {
    type: Set,
    default: shaded_colors
  },
  shades: {
    type: Set,
    default: shades
  },
  open: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits([
  'select-color', 'close'
])

const onSelectColor = (color, variant) => { 
  emits('select-color', color, variant)
  emits('close')
}

const onCloseModal = () => emits('close')

</script>
