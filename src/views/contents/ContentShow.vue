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

import ContentBreadcrumb from '@/components/breadcrumbs/ContentBreadcrumb.vue'

import DocumentShow from '@/views/documents/DocumentShow.vue'
import FolderShow from '@/views/folders/FolderShow.vue'

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const mapping = {
  document: DocumentShow,
  folder: FolderShow,
}

const router = useRouter()

const doBreadcrumbSelect = (item) => {
  router.push(
    {name: 'show-content', params: {id: item.id}}
  )
}

</script>
