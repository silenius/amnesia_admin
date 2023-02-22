<script setup>

import { useAttrs, watch } from 'vue'
import { useFolder } from '@/composables/folders.js'
import { useContent } from '@/composables/contents.js'
import { useRouter } from 'vue-router'

import FolderBrowser from '@/components/folder/FolderBrowser.vue'

const props = defineProps({
    content: Object
})

const router = useRouter()

const { browse, contents } = useFolder()

const { destroyContent } = useContent()

const doBrowse = async (id) => await router.push({
  name: 'browse-content', params: { id: id }
})

watch(() => props.content, async () => {
  await browse()
})

const deleteContent = async (id) => {
    await destroyContent(id)
    await browse()
}



</script>

<template>

  <FolderBrowser
    @browse="doBrowse"
    @delete-content="deleteContent"
    :folder="content"
    :contents="contents" 
/>

</template>
