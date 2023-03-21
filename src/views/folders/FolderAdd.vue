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
  exclude_nav: false
})

const { errors, setError } = inject('errors')

const create = async () => {
  try {
    const { data } = await createFolder(props.container, folder)
    router.push({name: 'contents', params: {id: data.id}})
  } catch (e) {
    // TODO
    console.log(e)
  }
}


</script>

<template>
    <h1>Add folder</h1>
    <FolderForm 
      :folder="folder" 
      :container="container"
      :action="'Add folder'"
      @submit-folder="create" 
    />
</template>
