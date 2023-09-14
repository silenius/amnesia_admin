<script setup>

import DocumentForm from '@/components/document/DocumentForm.vue'
import { useDocument } from '@/composables/documents.js'

const props = defineProps({
  content: Object
})

const emit = defineEmits(['update'])

const { updateDocument } = useDocument()

</script>

<template>
  <DocumentForm 
  :doc="content" 
  :action="'Update document'"
  @submit-document="$emit('update', updateDocument)" 
/>
</template>
