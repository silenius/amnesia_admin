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

const doEdit = async (content) => { 
  await router.push({
    name: 'edit-content', 
    params: { id: content.id }
  })
}

</script>

<template>
  <RouterView @edit-content="(n) => doEdit(n)" class="m-4" :content="content" v-if="content.id" />
</template>
