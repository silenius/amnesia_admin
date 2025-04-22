<script setup>
import { watchEffect, ref, toRefs } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useContent } from '@/composables/useContent.js'

const props = defineProps({
  content_id: {
    type: Number,
    required: true
  }
})

const { content_id } = toRefs(props)
const { content } = await useContent(content_id)

/*
watchEffect(async () => {
  const { data } = await getContent(props.content_id)
  const { data: acls } = await getContentParentACLS(props.content_id)
  content.value = data
  content.value['__acls'] = acls
})
*/

</script>

<template>
  <div class="flex flex-row">
    <Suspense>
      <RouterView 
        @edit-content="(id) => $router.push({name: 'edit-content', params: { id: id }})" 
        class="m-4 grow" 
        :content="content" 
      />
    </Suspense>

    <aside class="basis-0 backdrop-blur-xs shadow-gray-900 shadow-md bg-gray-700">
      <RouterView 
        name="RightSideBar" 
        v-if="content_id"
      />
    </aside>
  </div>
</template>
