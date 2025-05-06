<script setup>

import { toRefs, ref, provide } from 'vue'
import { useContent } from '../../composables/useContent.js'

import FolderEdit from '@/views/folders/FolderEdit.vue'
import DocumentEdit from '@/views/documents/DocumentEdit.vue'
import FileEdit from '@/views/files/FileEdit.vue'
import EventEdit from '@/views/events/EventEdit.vue'
import Breadcrumb from '@/components/breadcrumbs/Breadcrumb.vue'

const props = defineProps({
  content_id: {
    type: Number,
    required: true
  }
})

const { content_id } = toRefs(props)
const { content } = useContent(content_id)

const errors = ref({})

const setError = (key, value) => {
  if (value === false) {
    delete errors.value[key]
  } else {
    errors.value[key] = value
  }
}

const setErrorFromResponse = async(r) => {
  const errors = await r.json()

  for (const [k, v] of Object.entries(errors)) {
    setError(k, v.join(''))
  }
}

const mapping = {
  folder: FolderEdit,
  document: DocumentEdit,
  file: FileEdit,
  event: EventEdit
}

provide('errors', {
  errors,
  setError,
  setErrorFromResponse
})

</script>

<template>
  <div class="m-4" v-if="content">
    <Breadcrumb 
      :content="content" 
      @navigate="(content) => $router.push(`/${content.id}`)"
      class="p-2 shadow-md mb-4"
    />

    <component 
      :is="mapping[content.type.name]" 
      :content="content"
    />
  </div>
</template>
