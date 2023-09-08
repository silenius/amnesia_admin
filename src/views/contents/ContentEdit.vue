<script setup>

import { ref, provide } from 'vue'
import { useRouter } from 'vue-router'

import FolderEdit from '@/views/folders/FolderEdit.vue'
import DocumentEdit from '@/views/documents/DocumentEdit.vue'
import FileEdit from '@/views/files/FileEdit.vue'
import EventEdit from '@/views/events/EventEdit.vue'
import ContentBreadcrumb from '@/components/breadcrumbs/ContentBreadcrumb.vue'

const props = defineProps({
  content: Object
})

const router = useRouter()

const errors = ref({})

const setError = (key, value) => {
  errors.value[key] = value
}

const mapping = {
  folder: FolderEdit,
  document: DocumentEdit,
  file: FileEdit,
  event: EventEdit
}

provide('errors', {
  errors,
  setError
})

const doBrowse = async (id) => await router.push({
  name: 'browse-content', 
  params: { id: id }
})

</script>

<template>
  <div class="m-4">
    <ContentBreadcrumb 
      :content="props.content" 
      @item-select="(content) => doBrowse(content.id)"
      class="p-2 inline-block shadow-md"
    />

    <component 
      :is="mapping[content.type.name]" 
      :content="content"
    />
  </div>
</template>
