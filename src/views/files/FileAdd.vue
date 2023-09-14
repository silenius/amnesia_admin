<script setup>

import { ref } from 'vue'

import FileForm from '@/components/file/FileForm.vue'
import { useFile } from '@/composables/files.js'

const props = defineProps({
    container: Object
})

const emit = defineEmits(['create'])

const { createFile } = useFile()

const file = ref({
  is_fts: true,
  exclude_nav: false,
  container_id: props.container.id,
  props: {}
})

</script>

<template>
    <h1>Add file</h1>
    <FileForm 
      :file="file" 
      :container="container"
      :action="'Add file'"
      @submit-file="$emit('create', createFile, file)" 
    />
</template>
