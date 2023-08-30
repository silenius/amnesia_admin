<script setup>

import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

import FolderForm from '@/components/folder/FolderForm.vue'
import { useFolder } from '@/composables/folders.js'

const props = defineProps({
    container: Object
})

const router = useRouter()

const { createFolder } = useFolder()

const folder = ref({
  is_fts: true,
  polymorphic_loading: false,
  container_id: props.container.id,
  exclude_nav: false,
  props: {}
})

const { setErrorFromResponse } = inject('errors')

const create = async () => {
  try {
    const { data } = await createFolder(props.container, folder)
    router.push({name: 'show-content', params: {id: data.id}})
  } catch (e) {
    setErrorFromResponse(e.response)
  }
}
</script>

<template>
    <FolderForm 
      :folder="folder" 
      :container="container"
      :action="'Add folder'"
      @submit-folder="create" 
    />
</template>
