<script setup>

import { ref } from 'vue'

import FolderForm from '@/components/folder/FolderForm.vue'
import { useFolder } from '@/composables/folders.js'

const props = defineProps({
    container: Object
})

const emit = defineEmits(['create'])

const { createFolder } = useFolder()

const folder = ref({
  is_fts: true,
  polymorphic_loading: false,
  container_id: props.container.id,
  exclude_nav: false,
  props: {}
})

</script>

<template>
    <FolderForm 
      :folder="folder" 
      :container="container"
      :action="'Add folder'"
      @submit-folder="$emit('create', createFolder, folder)" 
    />
</template>
