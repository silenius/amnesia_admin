<script setup>

import { ref, onMounted, onUpdated, watch } from 'vue'
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
const types = ref([])

const doBrowse = async (id) => await router.push({
  name: 'browse-content', 
  params: { id: id }
})

const doEdit = async (id) => await router.push({
  name: 'edit-content', 
  params: { id: id }
})

watch(() => props.content, async () => {
  contents.value = await browse()
})

onUpdated(() => console.log('UPDATED: ContentBrowse'))

onMounted(async () => {
  console.log('MOUNTED: ContentBrowse', props.content.id)
  const res = await getContentTypes()
  types.value = res
  contents.value = await browse()
})

const deleteContent = async (id) => {
  await destroyContent(id)
  contents.value = await browse()
}

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
    @delete-content="deleteContent"
    @edit-content="doEdit"
    :folder="content"
    :contents="contents" 
  />

  </template>
