<script setup>
import { watchEffect, ref } from 'vue'
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
})

</script>

<template>
  <div>
    <RouterView 
      :content="content"
      v-if="content.id"
    />
  </div>
  </template>
