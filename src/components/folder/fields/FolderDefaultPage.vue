<template>
  <div>
    <div>
      <p class="font-bold">Replace default view</p>
      <p class="text-xs">Rather than a listing you can choose a document to replace the default view of the folder</p>
      <p v-if="doc" class="gap-2 flex flex-col p-2 mt-2 text-white bg-sky-600">
        <p class="font-bold">{{ doc.title }}</p>
        <p class="text-xs">{{ doc.description }}</p>
        </p>
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
                  Browse
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    <FolderBrowser
                      @browse="doBrowse"
                      @select-document="doSelectDocument"
                      @breadcrumb-select="(content) => doBrowse(content.id)"
                      :contents="contents"
                      :folder="folder"
                      :actions="actions"
                      :selectActions="null"
                      :view="'gallery'"
                      v-if="folder && contents" />

                    <DefaultPagination
                      v-if="contents_meta.count"
                      :limit="limit"
                      :offset="offset"
                      :total="contents_meta.count"
                      @goto-page="(page) => reload((page-1)*limit)"
                      class="flex justify-center my-4"
                    />

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
import { ref, watch, computed } from 'vue'
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
import DefaultPagination from '@/components/pagination/DefaultPagination.vue'

const props = defineProps({
  index_content_id: Number
})

const emits = defineEmits([
  'update:index_content_id'
])

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

const contents_meta = ref({})

const limit = computed( () => contents_meta.value?.limit)
const offset = computed( () => {
  const v = parseInt(contents_meta.value?.offset)
  return isNaN(v) ? 0 : v
})

const { browse } = useFolder()
const { getContent } = useContent()

const doBrowse = id => folder_id.value = id
const doSelectDocument = (content) => {
  emits('update:index_content_id', content.id) 
  closeModal()
}

const doRemove = () => emits('update:index_content_id', null)

const isOpen = ref(false)
const folder_id = ref(1)
const folder = ref({})
const doc = ref({})
const contents = ref([])

const reload = async (offset, limit) => {
  const params = [
    ['filter_types', 'folder'],
    ['filter_types', 'document'], 
    ['sort_folder_first', true]
  ]

  if (limit) {
    params.push(['limit', limit])
  }

  if (offset) {
    params.push(['offset', offset])
  }

  const { data: folder_data } = await getContent(folder_id.value)
  const { data: contents_data } = await browse( folder_data.id, params)

  folder.value = folder_data
  contents.value = contents_data.data
  contents_meta.value = contents_data.meta
}

watch(folder_id, () => reload(), { immediate: true })

watch( () => props.index_content_id, async() => {
  if (props.index_content_id) {
    const { data } = await getContent(props.index_content_id)
    doc.value = data
  } else {
    doc.value = null
  }
}, { immediate: true })

const closeModal = () => isOpen.value = false
const openModal = () => {
  folder_id.value = 1
  isOpen.value = true
}
</script>
