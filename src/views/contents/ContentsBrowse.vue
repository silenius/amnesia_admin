<script setup>

import { ref, computed, onMounted, onUpdated, watch } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useFolder } from '@/composables/folders.js'
import { useContent } from '@/composables/contents.js'

import { useContentTypes } from '@/composables/content_types.js'
import FolderBrowser from '@/components/folder/FolderBrowser.vue'

const props = defineProps({
  content: Object
})

const router = useRouter()

const { browse, destroyManyContent } = useFolder()
const { destroyContent } = useContent()
const { getContentTypes } = useContentTypes()

const contents = ref([])
const selected = ref(new Map())

const types = ref([])

const reload = async () => {
  const { data } = await browse(props.content.id)
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

const doDeleteSelection = async () => {
  const ids = Array.from(selected.value.keys())
  await destroyManyContent(props.content, ids)
  reload()
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
    @delete-selection="doDeleteSelection"
    :folder="content"
    :contents="contents" 
    :selected="selected"
  />

  </template>
