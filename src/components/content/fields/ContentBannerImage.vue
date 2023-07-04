<template>
  <div>
    <label class="block flex items-center gap-2">
     <InputCheckbox @change="(n) => value = n" :values="yes_no_unknown" :checked="bool_value"/>
      <div class="flex flex-col">
        <span class="font-bold">Banner</span>
        <p class="text-xs" v-if="value===true">A custom banner will be
          displayed.</p>
        <p class="text-xs" v-else-if="value===false">No banner will be
          displayed.</p>
        <p class="text-xs" v-else>Use default</p>
      </div>
    </label>
    <img class="h-32 w-auto" v-if="int_value" :src="'/bbpf/' + banner_image + '/download'" />
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
                  <FolderBrowser
                    @browse="doBrowse"
                    @select-banner="doSelectBanner"
                    @breadcrumb-select="(content) => doBrowse(content.id)"
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
import { computed, ref, watchEffect } from 'vue'
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
import InputCheckbox from '@/components/form/InputCheckbox.vue'
import { yes_no_unknown } from '@/components/form/InputCheckboxDefaults.js'

const props = defineProps({
  banner_image: {
    default: null
  }
})

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
  emits('update:banner_image', content.id) 
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
  contents.value = contents_data.data
})

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

  // XXX Fix this shit
  if (props.banner_image !== null && props.banner_image !== false && !isNaN(parseInt(props.banner_image))) {
    return true  
  }

  return props.banner_image
})

const int_value = computed(() => {
  return parseInt(props.banner_image)
})

const closeModal = () => isOpen.value = false
const openModal = () => {
  folder_id.value = 1
  isOpen.value = true
}
</script>
