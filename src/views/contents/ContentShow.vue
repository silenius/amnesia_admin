<script setup>
import { toRefs } from 'vue'
import { useContent } from '../../composables/useContent.js'

import Breadcrumb from '../../components/breadcrumbs/Breadcrumb.vue'
import EditContentButton from '../../components/content/EditContentButton.vue'

import DocumentShow from '../documents/DocumentShow.vue'
import FolderShow from '../folders/FolderShow.vue'
import EventShow from '../events/EventShow.vue'
import FileShow from '../files/FileShow.vue'

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
    <div id="lol" class="flex gap-x-1 mb-4 items-center grow">
      <EditContentButton class="p-1" :label="null"
        @click.prevent="$router.push({name: 'edit-content', params: {id:
          content_id}})" />

      <Breadcrumb 
        :content="content" 
        @navigate="(content) => $router.push({name: 'show-content', params: {id: content.id}})" 
        class="p-2 shadow-md"
      />
    </div>

    <h1 class="flex gap-2 items-center text-3xl border-b font-bold">
      <font-awesome-icon class="block" :icon="['fa-solid', content.fa_icon]" />
      {{ content.title }}</h1>
    <p v-if="content.description" class="italic mt-2 mb-4">{{ content.description }}</p>

    <component 
      :is="mapping[content.type.name]" 
      :content="content"
    />

  </div>
</template>


