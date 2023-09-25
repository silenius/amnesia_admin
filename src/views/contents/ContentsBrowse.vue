<script setup>

import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { useFolder } from '@/composables/folders.js'
import { useContent } from '@/composables/contents.js'
import { createBrowser } from '@/composables/browser.js'
import { useAuthStore } from '@/stores/auth.js'

import { useContentTypes } from '@/composables/content_types.js'
import FolderBrowser from '@/components/folder/FolderBrowser.vue'

const props = defineProps({
  content: Object
})

const content_id = computed(() => props.content.id)
const move_folder = ref(null)
const move_folder_id = computed(() => move_folder.value.id)

const { 
  browse, paste, destroyManyContent 
} = useFolder()

// Main browser

const { 
  reload, meta, data, limit, offset, sort_folder_first,
} = createBrowser(content_id, browse)

// Move browser

const { 
  reload: move_reload, 
  meta: move_meta, 
  data: move_data, 
  limit: move_limit, 
  offset: move_offset,
  sort_folder_first: move_sort_folder_first,
} = createBrowser(move_folder_id, browse)

const router = useRouter()

const { 
  setWeight, 
  destroyContent, 
  getContent,
  publishContent,
  unpublishContent
} = useContent()

const { getContentTypes } = useContentTypes()

const selected = ref(new Map())
const selected_ids = computed(() => Array.from(selected.value.keys()))

const types = ref([])

const move_modal_open = ref(false)

const doMoveBrowse = async (id) => {
  const { data } = await getContent(id)
  move_folder.value = data

  move_reload({
    offset: 0,
    filter_types: ['folder'],
  })
}

const doBrowse = async (id) => await router.push({
  name: 'browse-content', 
  params: { id: id }
})

// Edit a content
const doEdit = async (content) => { 
  await router.push({
    name: 'edit-content', 
    params: { id: content.id }
  })
}

// Delete a content
const doDelete = async (content) => {
  await destroyContent(content.id)
  selected.value.delete(content.id)
  reload()
}

// Change content's weight within it's container
const doChangeWeight = async (content, weight) => {
  await setWeight(content.id, weight)
  reload()
}

// Publish content
const doPublish = async (content) => {
  await publishContent(content.id)
  reload()
}

// Unpublish content
const doUnpublish = async (content) => {
  await unpublishContent(content.id)
  reload()
}

// Delete selected content
const doDeleteSelection = async () => {
  await destroyManyContent(props.content, selected_ids)
  selected.value.clear()
  reload()
}

const doMoveSelection = async () => {
  await doMoveBrowse(1)
  move_modal_open.value = true
}

const doMove = async () => {
  await paste(move_folder.value, selected_ids)
  reload()
  selected.value.clear()
  move_modal_open.value = false
}

const doAdd = async (folder, t) => {
  await router.push({
    name: 'add-content', 
    query: { type: t }
  })
}

// A content is selected through a checkbox
const doSelect = (content, evt) => {
  evt.target.checked 
    ? selected.value.set(content.id, content)
    : selected.value.delete(content.id)
}

watch(() => props.content.id, async () => {
  await reload({offset:0})
  selected.value.clear()
}, { immediate: true })

onMounted(async () => {
  const { data } = await getContentTypes()
  types.value = data
})

</script>

<template>
  <div>
    <Dialog as="div" :open="move_modal_open" class="relative z-10">
      <div class="fixed inset-0 bg-black bg-opacity-25" />

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel
            class="w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
              Move selection
            </DialogTitle>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                <FolderBrowser
                  @browse="doMoveBrowse"
                  @breadcrumb-select="(content) => doMoveBrowse(content.id)"
                  @change-limit="async (n) => await move_reload({offset: 0, limit: n})"
                  @change-pagination="async (n) => await move_reload(n)"
                  :current_limit="move_limit"
                  :offset="move_offset"
                  :total="move_meta.count"
                  :actions="null"
                  :selectActions="null"
                  :folder="move_folder"
                  :contents="move_data" 
                  :sortFolderFirst="move_sort_folder_first"
                />
              </p>
            </div>
            <div class="mt-4">
              <button type="button" class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" @click="doMove"> Move here </button>
              <button type="button" class="inline-flex justify-center rounded-md
                border border-transparent bg-slate-100 px-4 py-2 text-sm
                font-medium text-slate-900 hover:bg-slate-200 focus:outline-none
                focus-visible:ring-2 focus-visible:ring-slate-500
                focus-visible:ring-offset-2 ml-2" @click="move_modal_open=false"> Close </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>

    <FolderBrowser
      class="mt-4"
      @reload="async (n) => await reload(n)"
      @change-limit="async (n) => await reload({offset: 0, limit: n})"
      @change-pagination="async (n) => await reload(n)"
      @browse="doBrowse"
      @add-content="doAdd"
      @delete-content="doDelete"
      @select-content="doSelect"
      @edit-content="doEdit"
      @publish-content="doPublish"
      @unpublish-content="doUnpublish"
      @change-weight-content="doChangeWeight"
      @delete-selection="doDeleteSelection"
      @move-selection="doMoveSelection"
      @breadcrumb-select="(content) => doBrowse(content.id)"
      :folder="content"
      :contents="data" 
      :selected="selected"
      :canChangeWeight="true"
      :addTypes="types"
      :editButton="true"
      :sortFolderFirst="sort_folder_first"
      :current_limit="limit"
      :offset="offset"
      :total="meta.count"
    />
  </div>

</template>
