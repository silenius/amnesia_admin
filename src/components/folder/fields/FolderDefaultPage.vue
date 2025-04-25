<script setup>
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import { useFolder } from '../../../composables/useFolder.js'
import { useFolderBrowser } from '../../../composables/useFolderBrowser.js'
import FolderBrowser from '../FolderBrowser.vue'
import Pagination from '../../pagination/Pagination.vue'
import Breadcrumb from '../../breadcrumbs/Breadcrumb.vue'

const props = defineProps({
  index_content_id: Number
})

const emits = defineEmits([
  'update:index_content_id'
])

const { load, folder } = await useFolder(ref(1))
const { result, meta: browse_meta, goto_page } = await useFolderBrowser(folder, {
  filter_types: ['document', 'folder'],
  sort_folder_first: true
})

const actions = ref([
  {
    label: 'Select',
    event: 'select-document',
    icon: 'fa-solid fa-hand-point-right',
    class: (active) => active ? 'bg-violet-500 text-white' : 'text-gray-900',
    enabled: (...args) => {
      const content = args[0];
      return content.type.name === 'document'
    }
  }
])

const doSelectDocument = (content) => {
  emits('update:index_content_id', content.id) 
  closeModal()
}

const doRemove = () => emits('update:index_content_id', null)

const isOpen = ref(false)
const doc = ref({})

/*
watch( () => props.index_content_id, async() => {
  if (props.index_content_id) {
    const { data } = await getContent(props.index_content_id)
    doc.value = data
  } else {
    doc.value = null
  }
}, { immediate: true })
*/

const closeModal = () => isOpen.value = false
const openModal = () => {
  load(ref(1))
  isOpen.value = true
}
</script>
<template>
  <div>
    <div>
      <p class="font-bold">Replace default view</p>
      <p class="text-xs">Rather than a listing you can choose a document to replace the default view of the folder</p>
      <div v-if="doc" class="gap-2 flex flex-col p-2 mt-2 text-white bg-sky-600">
      <p class="font-bold">{{ doc.title }}</p>
      <p class="text-xs">{{ doc.description }}</p>
      </div>
      <div class="mt-4">
        <button type="button" @click="openModal" class="w-32 hover:bg-green-300
          hover:text-green-800 rounded-md bg-green-200 text-green-700 p-1
          border border-green-300">
          {{ index_content_id ? 'Replace' : 'Select' }}
        </button>
        <button type="button" @click="doRemove" v-if="index_content_id"
          class="border border-red-300 hover:bg-red-300 hover:text-red-800
          bg-red-200 text-red-700 p-1 ml-2 rounded-md
          w-32">
          Remove
        </button>
      </div>
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
                  {{ folder.title }}
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    <Breadcrumb 
                      :content="folder" 
                      @navigate="(content) => load(content.id)" 
                      class="p-2 shadow-md"
                    /> 

                    <FolderBrowser
                      class="mt-4"
                      @browse="(id) => load(id)"
                      @select-document="doSelectDocument"
                      :view="'gallery'"
                      :folder="folder"
                      :contents="result" 
                      :canChangeWeight="false"
                      :actions="actions"
                    />

                    <Pagination
                      v-if="browse_meta.count > browse_meta.limit"
                      :limit="browse_meta.limit"
                      :offset="browse_meta.offset"
                      :total="browse_meta.count"
                      @goto-page="(page) => goto_page(page)"
                      class="flex justify-center my-4 gap-x-2"
                    />
                  </p>
                </div>

                <div class="mt-4">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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


