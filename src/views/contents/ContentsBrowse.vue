<script setup>
import { ref, onMounted, watch } from 'vue'
import { useFolder } from '@/composables/folders.js'

import FolderBrowser from '@/components/folder/FolderBrowser.vue'

const { getFolder, browse, folder } = useFolder()

onMounted( async () => {
  await browse()
})



</script>

<template>

  <FolderBrowser :contents="folder.contents" />

</template>
