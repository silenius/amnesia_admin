<script setup>

import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useFolder } from '@/composables/folders.js'
import { useContent } from '@/composables/contents.js'

import FolderBrowser from '@/components/folder/FolderBrowser.vue'

const props = defineProps({
  content: Object
})

const router = useRouter()

const { browse } = useFolder()

const { destroyContent } = useContent()

const contents = ref([])

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

const deleteContent = async (id) => {
  await destroyContent(id)
  contents.value = await browse()
}

</script>

<template>

  <FolderBrowser
    @browse="doBrowse"
    @delete-content="deleteContent"
    @edit-content="doEdit"
    :folder="content"
    :contents="contents" 
  />

  </template>
