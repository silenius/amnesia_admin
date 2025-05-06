<script setup>
import { toRefs } from 'vue'
import { useContent } from '../../composables/useContent.js'

import Breadcrumb from '@/components/breadcrumbs/Breadcrumb.vue'

import DocumentShow from '@/views/documents/DocumentShow.vue'
import FolderShow from '@/views/folders/FolderShow.vue'
import EventShow from '@/views/events/EventShow.vue'
import FileShow from '@/views/files/FileShow.vue'

const props = defineProps({
  content_id: {
    type: Number,
    required: true
  }
})

const { content_id } = toRefs(props)
const { content } = useContent(content_id)

const mapping = {
  document: DocumentShow,
  folder: FolderShow,
  event: EventShow,
  file: FileShow,
}

</script>

<template>
  <div v-if="content" class="m-4">
    <div class="flex mb-4 items-center grow">
      <Breadcrumb 
        :content="content" 
        @navigate="(content) => $router.push({name: 'show-content', params: {id: content.id}})" 
        class="p-2 shadow-md"
      />
    </div>

    <component 
      :is="mapping[content.type.name]" 
      :content="content"
    />

  </div>
</template>


