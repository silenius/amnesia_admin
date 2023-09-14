<script setup>

import { ref } from 'vue'

import DocumentForm from '@/components/document/DocumentForm.vue'
import { useDocument } from '@/composables/documents.js'

const props = defineProps({
  container: Object
})

const emit = defineEmits(['create'])

const { createDocument } = useDocument()

const doc = ref({
  is_fts: true,
  exclude_nav: false,
  container_id: props.container.id,
  props: {}
})

</script>

<template>
  <DocumentForm 
  :doc="doc" 
  :container="container"
  :action="'Add document'"
  @submit-document="$emit('create', createDocument, doc)" 
/>
</template>
