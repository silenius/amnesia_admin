<script setup>

import { ref, computed, toRefs, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import { useFolder } from '../../composables/useFolder.js'
import { useFolderBrowser } from '../../composables/useFolderBrowser.js'

//import { useFolder } from '@/composables/folders.js'
//import { useContent } from '@/composables/contents.js'
//import { createBrowser } from '@/composables/browser.js'

//import { useContentTypes } from '@/composables/content_types.js'
import FolderBrowser from '../../components/folder/FolderBrowser.vue'
import SelectFolderView from '../../components/folder/SelectFolderView.vue'
import SelectFolderLimit from '../../components/folder/SelectFolderLimit.vue'
import SelectFolderFilters from '../../components/folder/SelectFolderFilters.vue'
import Pagination from '../../components/pagination/Pagination.vue'
import Breadcrumb from '../../components/breadcrumbs/Breadcrumb.vue'

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const { content: folder } = toRefs(props)

//const content_id = computed(() => props.content_id)
//const move_folder = ref(null)
//const move_folder_id = computed(() => move_folder.value.id)

/*
const { 
  browse, paste, destroyManyContent 
} = useFolder()
*/


// Main browser

const {
  result, meta: browse_meta, browse, change_limit, goto_page, query, view
} = await useFolderBrowser(folder)

/*
const { 
  reload, meta, data, limit, offset, sort_folder_first,
} = createBrowser(content_id, browse)
*/


// Move browser
/*
const { 
  reload: move_reload, 
  meta: move_meta, 
  data: move_data, 
  limit: move_limit, 
  offset: move_offset,
  sort_folder_first: move_sort_folder_first,
} = createBrowser(move_folder_id, browse)
*/
const router = useRouter()

/*
const { 
  setWeight, 
  destroyContent, 
  getContent,
  publishContent,
  unpublishContent
} = useContent()
*/

//const { getContentTypes } = useContentTypes()

const selected = ref(new Map())
const selected_ids = computed(() => Array.from(selected.value.keys()))

//const types = ref([])

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
  await destroyContent(content_id)
  selected.value.delete(content_id)
  reload()
}

// Change content's weight within it's container
const doChangeWeight = async (content, weight) => {
  await setWeight(content_id, weight)
  reload()
}

// Publish content
const doPublish = async (content) => {
  await publishContent(content_id)
  reload()
}

// Unpublish content
const doUnpublish = async (content) => {
  await unpublishContent(content_id)
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
    ? selected.value.set(content_id, content)
    : selected.value.delete(content_id)
}

/*
watch(() => props.content_id, async () => {
  await reload({offset:0})
  selected.value.clear()
}, { immediate: true })
*/

/*
onMounted(async () => {
  const { data } = await getContentTypes()
  types.value = data
})
*/

</script>

<template>
  <div>
    <!--
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
@breadcrumb-select="(content) => doMoveBrowse(content_id)"
@change-limit="async (n) => await move_reload({offset: 0, limit: n})"
@change-pagination="async (n) => await move_reload(n)"
:actions="null"
:selectActions="null"
:folder="move_folder"
:contents="move_data" 
:sortFolderFirst="move_sort_folder_first"
/>
</p>
</div>
<div class="mt-4">
<button type="button" class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" @click="doMove"> Move here </button>
<button type="button" class="inline-flex justify-center rounded-md
border border-transparent bg-slate-100 px-4 py-2 text-sm
font-medium text-slate-900 hover:bg-slate-200 focus:outline-hidden
focus-visible:ring-2 focus-visible:ring-slate-500
focus-visible:ring-offset-2 ml-2" @click="move_modal_open=false"> Close </button>
</div>
</DialogPanel>
</div>
</div>
</Dialog>
-->
    <div class="flex">
      <Breadcrumb 
        :content="folder" 
        @navigate="(content) => router.push({name: 'browse-content', params: {id: content.id}})" 
        class="p-2 shadow-md"
      /> 

      <SelectFolderView class="w-12 h-12" :view="view" @set-view="(v) => view=v" />
      <SelectFolderFilters  />
      <SelectFolderLimit :folder="folder" :limit="browse_meta.limit" @set-limit="(v) => change_limit(v)" />

    </div>

    <FolderBrowser
      class="mt-4"
      @reload="async (n) => await reload(n)"
      @browse="doBrowse"
      @delete-content="doDelete"
      @select-content="doSelect"
      @edit-content="(content) => router.push({name: 'edit-content', params: {id: content.id}})"
      @publish-content="doPublish"
      @unpublish-content="doUnpublish"
      @change-weight-content="doChangeWeight"
      @delete-selection="doDeleteSelection"
      @move-selection="doMoveSelection"
      :view="view"
      :folder="folder"
      :contents="result" 
      :selected="selected"
      :canChangeWeight="true"
      :editButton="true"
    />

    <Pagination
      v-if="browse_meta.count > browse_meta.limit"
      :limit="browse_meta.limit"
      :offset="browse_meta.offset"
      :total="browse_meta.count"
      @goto-page="(page) => goto_page(page)"
      class="flex justify-center my-4"
    />

  </div>

</template>
