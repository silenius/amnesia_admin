<template>
  <div class="m-4">
    <div class="flex mb-4 items-center grow">
      <ContentBreadcrumb 
        :content="content" 
        @item-select="doBreadcrumbSelect" 
        class="p-2 shadow-md"
      />
    </div>

    <component 
      :is="mapping[content.type.name]" 
      :content="content"
    />

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onBeforeMount, onMounted, onUpdated, onUnmounted } from 'vue'

import ContentBreadcrumb from '@/components/breadcrumbs/ContentBreadcrumb.vue'

import DocumentShow from '@/views/documents/DocumentShow.vue'
import FolderShow from '@/views/folders/FolderShow.vue'
import EventShow from '@/views/events/EventShow.vue'
import FileShow from '@/views/files/FileShow.vue'

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const mapping = {
  document: DocumentShow,
  folder: FolderShow,
  event: EventShow,
  file: FileShow,
}

onBeforeMount(() => console.log('===> ContentShow before mounted'))
onMounted(() => console.log('===> ContentShow mounted'))
onUnmounted(() => console.log('===> ContentShow unmounted'))
onUpdated(() => console.log('===> ContentShow updated'))

const router = useRouter()

const doBreadcrumbSelect = (item) => {
  router.push(
    {name: 'show-content', params: {id: item.id}}
  )
}

</script>
