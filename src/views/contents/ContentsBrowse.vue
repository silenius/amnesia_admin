<script setup>

import { ref, toValue, toRefs, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import { useFolder } from '../../composables/useFolder.js'
import { useFolderBrowser } from '../../composables/useFolderBrowser.js'
import { useFolderMove } from '../../composables/useFolderMove.js'
import { useContentType } from '../../composables/useContentType.js'
import { useContentWeight } from '../../composables/useContentWeight.js'
import { useContentSelection } from '../../composables/useContentSelection.js'
import { useContentDelete } from '../../composables/useContentDelete.js'

import FolderBrowser from '../../components/folder/FolderBrowser.vue'
import SelectFolderView from '../../components/folder/SelectFolderView.vue'
import SelectFolderLimit from '../../components/folder/SelectFolderLimit.vue'
import SelectFolderFilters from '../../components/folder/SelectFolderFilters.vue'
import DropDownAddToFolder from '../../components/folder/DropDownAddToFolder.vue'
import EditContentButton from '../../components/content/EditContentButton.vue'
import DropDownSelection from '../../components/content/DropDownSelection.vue'
import Pagination from '../../components/pagination/Pagination.vue'
import Breadcrumb from '../../components/breadcrumbs/Breadcrumb.vue'

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const { content: folder } = toRefs(props)

const router = useRouter()

// Move folder

const { 
  folder: move_folder,
  load: load_move_folder
} = await useFolder(ref(1))

const {
  data: paste_data,
  error: paste_error,
  paste 
} = useFolderMove(move_folder)

const { 
  browse: browse_move_folder, 
  result: move_result, 
  meta: move_meta,
  goto_page: move_goto_page
} = await useFolderBrowser(move_folder, {filter_types:['folder']})

// Main browser

const {
  browse, result, meta: browse_meta, change_limit, goto_page, view
} = await useFolderBrowser(folder)

const { content_types } = await useContentType()
const { set_weight } = useContentWeight(folder) 
const { selection, selection_ids, clear, unselect, select_or_unselect } = useContentSelection()
const { destroy } = useContentDelete()

const delete_content = async (content) => {
  if (await destroy(content.id)) {
    unselect(content.id)
    browse()
  }
}

const move_modal_open = ref(false)

const doBrowse = async (id) => await router.push({
  name: 'browse-content', 
  params: { id: id }
})

// Change content's weight within it's container
const doChangeWeight = async (content, weight) => {
  const { error } = await set_weight(content.id, weight)
  if (!error) {
    browse()
  }
  //reload()
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
  for (const id of toValue(selection_ids)) {
    if (await destroy(id)) {
      console.log(`===>>> Content ${id} deleted`)
      unselect(id)
    }
  }
  browse()
}

const doMoveSelection = async () => {
  await browse_move_folder({offset: 0})
  move_modal_open.value = true
}

const doMove = async () => {
  await paste(selection_ids)

  if (!toValue(paste_error)) {
    move_modal_open.value = false
    clear()
    await router.push(`/${move_folder.value.id}/browse`)
  }
}

const doAdd = async (folder, t) => {
  await router.push({
    name: 'add-content', 
    query: { type: t }
  })
}

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
                <Breadcrumb 
                  :content="move_folder" 
                  @navigate="(content) => load_move_folder(content.id)" 
                  class="p-2 shadow-md"
                /> 

                <FolderBrowser
                  class="mt-4"
                  @browse="load_move_folder"
                  :view="'gallery'"
                  :folder="move_folder"
                  :contents="move_result" 
                  :canChangeWeight="false"
                  :canSelect="false"
                />

                <Pagination
                  v-if="move_meta.count > move_meta.limit"
                  :limit="move_meta.limit"
                  :offset="move_meta.offset"
                  :total="move_meta.count"
                  @goto-page="(page) => move_goto_page(page)"
                  class="flex justify-center my-4 gap-x-2"
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
    <div class="flex gap-x-1">

      <DropDownAddToFolder 
        :folder="folder" 
        :types="content_types" 
        @add-content="(folder, type) => doAdd(folder, type)"
      />

      <EditContentButton @edit="$router.push(`/${folder.id}/edit`)" class="w-12 h-12" />

      <DropDownSelection 
        @clear-selection="clear()"
        @move-selection="doMoveSelection"
        @delete-selection="doDeleteSelection" 
        :selection="selection" class="w-12 h-12" />

      <Breadcrumb 
        :content="folder" 
        @navigate="(content) => router.push({name: 'browse-content', params: {id: content.id}})" 
        class="p-2 shadow-md"
      /> 

      <SelectFolderView class="w-12 h-12" :view="view" @set-view="(v) => view=v" />
      <SelectFolderFilters  />
      <SelectFolderLimit :folder="folder" :limit="browse_meta.limit" @set-limit="(v) => change_limit(v)" />

    </div>

    <h1 class="my-6 font-bold text-xl underline uppercase tracking-tighter decoration-dotted">{{ folder.title }}</h1>

    <FolderBrowser
      class="mt-4"
      @browse="doBrowse"
      @delete-content="delete_content"
      @select-content="(content, checked) => select_or_unselect(content, checked)"
      @edit-content="(c) => router.push({name: 'edit-content', params: {id: c.id}})"
      @publish-content="doPublish"
      @unpublish-content="doUnpublish"
      @change-weight-content="doChangeWeight"
      :view="view"
      :folder="folder"
      :contents="result" 
      :selection="selection"
      :canChangeWeight="true"
    />

    <Pagination
      v-if="browse_meta.count > browse_meta.limit"
      :limit="browse_meta.limit"
      :offset="browse_meta.offset"
      :total="browse_meta.count"
      @goto-page="(page) => goto_page(page)"
      class="flex justify-center my-4 gap-x-2"
    />

  </div>

</template>
