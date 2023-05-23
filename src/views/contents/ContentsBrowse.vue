<script setup>

import { ref, onMounted, onUpdated, watchEffect } from 'vue'
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

const { browse } = useFolder()
const { destroyContent } = useContent()
const { getContentTypes } = useContentTypes()

const contents = ref([])
const selected = ref(new Map())
const types = ref([])

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

  if (selected.value.has(content.id)) {
    selected.value.delete(content.id)
  }

  const { data } = await browse(props.content.id)
  contents.value = data
}

const doDeleteSelection = async () => {

}

const doSelect = (content, evt) => {
  if (evt.target.checked) {
    selected.value.set(content.id, content)
  } else {
    selected.value.delete(content.id)
  }
}

watchEffect(async () => {
  const { data } = await browse(props.content.id)
  contents.value = data
  selected.value.clear()
})

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
