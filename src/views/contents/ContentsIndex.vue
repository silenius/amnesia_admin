<script setup>
import { watchEffect, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useContent } from '@/composables/contents.js'

const props = defineProps({
  content_id: Number
})

const router = useRouter()

const content = ref({})

const { 
  getContent,
  getContentParentACLS
} = useContent()

/*
watchEffect(async () => {
  const { data } = await getContent(props.content_id)
  const { data: acls } = await getContentParentACLS(props.content_id)
  content.value = data
  content.value['__acls'] = acls
  // FIXME
  if (content.value.props === null) {
    content.value.props = {}
  }
})
*/

const doEdit = async (content_id) => { 
  await router.push({
    name: 'edit-content', 
    params: { id: content_id }
  })
}

</script>

<template>
  <div class="flex flex-row">
    <Suspense>
      <RouterView 
        @edit-content="(n) => doEdit(n)" 
        class="m-4 grow" 
        :content_id="content_id" 
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
