<script setup>

import FileForm from '@/components/file/FileForm.vue'
import { useFile } from '@/composables/files.js'

const props = defineProps({
    content: Object
})

const emit = defineEmits(['update'])

const { updateFile } = useFile()

</script>

<template>
    <FileForm 
      :file="content" 
      :action="'Update file'"
      @submit-file="$emit('update', updateFile)" 
    />
</template>
