<script setup>
import { computed, ref, watchEffect } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import { useFolder } from '../../../composables/useFolder.js'
import { useFolderBrowser } from '../../../composables/useFolderBrowser.js'
import { backend_url } from '../../../composables/fetch.js'
import FolderBrowser from '../../folder/FolderBrowser.vue'
import Pagination from '../../pagination/Pagination.vue'
import Breadcrumb from '../../breadcrumbs/Breadcrumb.vue'
import InputCheckbox from '../../form/InputCheckbox.vue'
import { yes_no_unknown } from '../../form/InputCheckboxDefaults.js'

const props = defineProps({
  banner_image: {
    default: null
  }
})

const emits = defineEmits([
  'update:banner_image',
  'select-banner'
])

const folder_id = ref(1)
const { folder } = useFolder(folder_id)

const { meta, goto_page, result } = useFolderBrowser(folder, {
  filter_types: ['folder', 'file']
})

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

const doSelectBanner = (content) => {
  emits('update:banner_image', content.id) 
  closeModal()
}

const isOpen = ref(false)

const value = computed({

  get() {
    return props.banner_image
  },

  set(value) {
    value = value === 'null' ? null : value === 'true' ? true : false
    emits('update:banner_image', value)
  }

})

const bool_value = computed(() => {
  if (props.banner_image !== null && props.banner_image !== false && !isNaN(parseInt(props.banner_image))) {
    return true  
  }

  return props.banner_image
})

const int_value = computed(() => parseInt(props.banner_image))

const closeModal = () => isOpen.value = false
const openModal = () => {
  //folder_id.value = 1
  isOpen.value = true
}
</script>

<template>
  <div>
    <label class="block flex items-center gap-2">
      <InputCheckbox @change="(n) => value = n" :values="yes_no_unknown" :checked="bool_value"/>
      <div class="flex flex-col">
        <span class="font-bold">Banner</span>
        <p class="text-xs" v-if="value===true || parseInt(value)">A custom banner will be
          displayed.</p>
        <p class="text-xs" v-else-if="value===false">No banner will be
          displayed.</p>
        <p class="text-xs" v-else>Use default</p>
      </div>
    </label>
    <img class="h-32 w-auto" v-if="int_value" :src="backend_url(banner_image)" />
    <div class="mt-4" v-if="value">
      <button type="button" @click="openModal" class="w-32 hover:bg-green-300
        hover:text-green-800 rounded-md bg-green-200 text-green-700 p-1
        border border-green-300">
        Select
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
                    <Breadcrumb 
                      :content="folder" 
                      @navigate="(content) => folder_id = content.id" 
                      class="p-2 shadow-md"
                    /> 

                    <FolderBrowser
                      class="mt-4"
                      @browse="(id) => folder_id = id"
                      @select-banner="doSelectBanner"
                      :contents="result"
                      :folder="folder"
                      :actions="actions"
                      :selectActions="null"
                      :view="'gallery'" 
                    />

                    <Pagination
                      v-if="meta.count > meta.limit"
                      :limit="meta.limit"
                      :offset="meta.offset"
                      :total="meta.count"
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

