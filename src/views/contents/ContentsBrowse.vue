<script setup>

import { ref, computed, onMounted, onUpdated, watch } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { 
  Menu, MenuButton, MenuItems, MenuItem, 
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from '@headlessui/vue'
import { useFolder } from '@/composables/folders.js'
import { useContent } from '@/composables/contents.js'

import { useContentTypes } from '@/composables/content_types.js'
import FolderBrowser from '@/components/folder/FolderBrowser.vue'

const props = defineProps({
  content: Object
})

const router = useRouter()

const { browse, paste, destroyManyContent } = useFolder()
const { setWeight, destroyContent, getContent } = useContent()
const { getContentTypes } = useContentTypes()

const contents = ref([])
const selected = ref(new Map())
const selected_ids = computed(() => Array.from(selected.value.keys()))

const types = ref([])

const move_modal_open = ref(false)
const move_contents = ref([])
const move_folder = ref(null)

const doMoveBrowse = async (id) => {
  const { data } = await browse(id, [
    ['filter_types', 'folder'],
    ['sort_folder_first', true]
  ])
  const { data: folder_data } = await getContent(id)
  move_contents.value = data
  move_folder.value = folder_data
}

const reload = async () => {
  const { data } = await browse(props.content.id, [
    ['sort_folder_first', true]
  ])

  contents.value = data
}

const doBrowse = async (id) => await router.push({
  name: 'browse-content', 
  params: { id: id }
})

const doEdit = async (content) => { 
  await router.push({
    name: 'edit-content', 
    params: { id: content.id }
  })
}

const doDelete = async (content) => {
  await destroyContent(content.id)
  selected.value.delete(content.id)
  reload()
}

const doChangeWeight = async (content, weight) => {
  await setWeight(content.id, weight)
  reload()
}

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

const doSelect = (content, evt) => {
  evt.target.checked 
    ? selected.value.set(content.id, content)
    : selected.value.delete(content.id)
}

watch(() => props.content.id, async () => {
  reload()
  selected.value.clear()
}, { immediate: true })

onMounted(async () => {
  const { data } = await getContentTypes()
  types.value = data
})

</script>

<template>

  <Dialog as="div" :open="move_modal_open" class="relative z-10">
    <div class="fixed inset-0 bg-black bg-opacity-25" />

    <div class="fixed inset-0 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4 text-center">
        <DialogPanel
          class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
            Move selection
          </DialogTitle>
          <div class="mt-2">
            <p class="text-sm text-gray-500">
              <FolderBrowser
                @browse="doMoveBrowse"
                @breadcrumb-select="(content) => doMoveBrowse(content.id)"
                :actions="null"
                :selectActions="null"
                :folder="move_folder"
                :contents="move_contents" 
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

  <h1 class="text-2xl underline decoration-solid decoration-sky-500 decoration-2 underline-offset-4 mb-2 font-bold">

    <font-awesome-icon class="mr-2" icon="fa-solid fa-folder-tree" />{{ content.title }}
  </h1>

  <Menu as="div">
    <MenuButton>Add to folder</MenuButton>
    <MenuItems as="div">
      <MenuItem as="div" v-slot="{ active }" v-for="t in types" :key="t.id">
      <RouterLink :to="{ name: 'add-content', query: { type: t.name } }">{{ t.name }}</RouterLink>
      </MenuItem>
    </MenuItems>
  </Menu>

  <FolderBrowser
    @browse="doBrowse"
    @delete-content="doDelete"
    @select-content="doSelect"
    @edit-content="doEdit"
    @change-weight-content="doChangeWeight"
    @delete-selection="doDeleteSelection"
    @move-selection="doMoveSelection"
    @breadcrumb-select="(content) => doBrowse(content.id)"
    :folder="content"
    :contents="contents" 
    :selected="selected"
  />
</template>
