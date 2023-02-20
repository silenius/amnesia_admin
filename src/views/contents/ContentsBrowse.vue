<script setup>
import { ref, onMounted } from 'vue'
import { useFolder } from '@/composables/folders.js'

import FolderBrowser from '@/components/folder/FolderBrowser.vue'

const { browse } = useFolder()

const contents = ref([])


onMounted( async () => {
  contents.value = await browse()
})


</script>

<template>

  <FolderBrowser :contents="contents" />

</template>
