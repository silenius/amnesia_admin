<script setup>
import { ref, onUpdated, onMounted, watch } from 'vue'
import { useFolder } from '@/composables/folders.js'
import { RouterView, useRouter } from 'vue-router'

import FolderBrowser from '@/components/folder/FolderBrowser.vue'
const props = defineProps({
    content: Object
})

const router = useRouter()

const { browse, getFolder, folder } = useFolder()

const doBrowse = async (id) => await router.push({
  name: 'browse-content', params: {
    id: id
  }
})

watch(() => props.content, async () => {
  await browse()
})

</script>

<template>

  <FolderBrowser
    @browse="doBrowse"
    :folder="folder"
    :contents="folder.contents" />

</template>
