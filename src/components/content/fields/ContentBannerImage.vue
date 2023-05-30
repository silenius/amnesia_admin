<template>
  <div>
    <div class="inset-0 flex">
      <button
        type="button"
        @click="openModal"
        class="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Select banner
      </button>
    </div>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
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
                class="transform overflow-hidden rounded-2xl bg-white p-6
                text-left w-fit align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium text-gray-900"
                >
                  Browse
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    <FolderBrowser
                      @browse="doBrowse"
                      @select-banner="doSelectBanner"
                      :contents="contents"
                      :folder="folder"
                      :actions="actions"
                      :selectActions="null"
                      :view="'gallery'"
                      v-if="folder && contents">
                    </FolderBrowser>
                  </p>
                </div>

                <div class="mt-4">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="closeModal"
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
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import { useFolder } from '@/composables/folders.js'
import { useContent } from '@/composables/contents.js'
import FolderBrowser from '@/components/folder/FolderBrowser.vue'

const emits = defineEmits([
  'update:banner_image'
])

const actions = ref([
  {
    label: 'Select',
    event: 'select-banner',
    icon: 'fa-solid fa-hand-point-right',
    class: (active) => active ? 'bg-violet-500 text-white' : 'text-gray-900',
    enabled: (...args) => {
      const content = args[0];
      const is_image = (content.type.name == 'file' && content.mime.major.name == 'image')

      return is_image
    }
  }
])

const { browse } = useFolder()
const { getContent } = useContent()

const doBrowse = id => folder_id.value = id
const doSelectBanner = (content) => {
  emits('update:banner_image', content) 
  closeModal()
}

const isOpen = ref(false)
const folder_id = ref(1)
const folder = ref({})
const contents = ref([])

watchEffect( async () => {
  const { data: folder_data } = await getContent(folder_id.value)
  const { data: contents_data } = await browse(
    folder_data.id, 
    [
      ['filter_types', 'folder'],
      ['filter_types', 'file'], 
      ['filter_mime', 'image/*']
    ]
  )
  folder.value = folder_data
  contents.value = contents_data
})

const closeModal = () => isOpen.value = false
const openModal = () => {
  folder_id.value = 1
  isOpen.value = true
}
</script>
