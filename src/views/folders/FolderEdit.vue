<script setup>

import FolderForm from '@/components/folder/FolderForm.vue'
import { useFolder } from '@/composables/folders.js'

const props = defineProps({
  content: Object
})

const emit = defineEmits(['update'])

const { updateFolder } = useFolder()

</script>

<template>
    <FolderForm 
      :folder="content" 
      :action="'Update folder'"
      @submit-folder="$emit('update', updateFolder)" 
    />
</template>
