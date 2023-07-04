<script setup>
import { onMounted, watchEffect, ref } from 'vue'
import { RouterView } from 'vue-router'
import { useContent } from '@/composables/contents.js'

const props = defineProps({
  content_id: Number
})

const content = ref({})

const { getContent } = useContent()

watchEffect(async () => {
  const { data } = await getContent(props.content_id)
  content.value = data
  // FIXME
  if (content.value.props === null) {
    content.value.props = {}
  }
})

</script>

<template>
  <RouterView :content="content" v-if="content.id" />
</template>
