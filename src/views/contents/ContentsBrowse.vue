<script setup>

import { ref, toValue, toRefs, onMounted } from 'vue'
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
import { useContentDelete } from '../../composables/useContent.js'
import { publish, unpublish } from '../../services/content.js'

import FolderBrowser from '../../components/folder/FolderBrowser.vue'
import SelectFolderView from '../../components/folder/SelectFolderView.vue'
import SelectLimit from '../../components/pagination/SelectLimit.vue'
import SelectFolderFilters from '../../components/folder/SelectFolderFilters.vue'
import DropDownAddToFolder from '../../components/folder/DropDownAddToFolder.vue'
import EditContentButton from '../../components/content/EditContentButton.vue'
import DropDownSelection from '../../components/content/DropDownSelection.vue'
import Pagination from '../../components/pagination/Pagination.vue'
import Breadcrumb from '../../components/breadcrumbs/Breadcrumb.vue'

const props = defineProps({
  content_id: {
    type: Number,
    required: true
  }
})

const { content_id } = toRefs(props)

const { folder } = useFolder(content_id)

const router = useRouter()

// Move folder

const move_folder_id = ref(1)

const { 
  folder: move_folder,
  load: load_move_folder
} = useFolder(move_folder_id)

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
} = useFolderBrowser(move_folder, {filter_types:['folder']})

// Main browser

const {
  browse, result, meta: browse_meta, error, change_limit, goto_page, view
} = useFolderBrowser(folder)

const { content_types } = useContentType()
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

// Publish oontent
const doPublish = (content) => {
  if (publish(content.id)) {
    browse()
  }
}

// Unpublish content
const doUnpublish = (content) => {
  if (unpublish(content.id)) {
    browse()
  }
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

const doMoveSelection = () => {
  browse_move_folder({offset: 0})
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

</script>

<template>
  <div v-if="folder">
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
                  @navigate="(content) => move_folder_id = content.id" 
                  class="p-2 shadow-md"
                /> 

                <FolderBrowser
                  class="mt-4"
                  @browse="(id) => move_folder_id = id"
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
        :types="content_types" 
        @add-content="(t) => $router.push({ name: 'add-content', query: { type: t }})"
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
      <SelectFolderFilters @change-filter="(p) => browse(p)" />
      <SelectLimit :limit="browse_meta.limit" @set-limit="(v) => change_limit(v)" />

    </div>

    <h1 class="my-4 font-bold text-xl uppercase">{{ folder.title }}</h1>
    <div v-if="error" class="bg-red-500 text-white my-8 p-4">
      Error loading content
      <span v-if="error.status==403">: permission denied</span>
    </div>

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
