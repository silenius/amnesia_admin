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
  console.debug('===>>> Fetch content_id ', props.content_id) 
  const res = await getContent(props.content_id)
  content.value = res
})

</script>

<template>
  <div>
    <h1>CONTENTS</h1>
    <span class="text-red-600">{{ content.title }}</span>
    <RouterView 
      :content="content"
      v-if="content.id"
    />
  </div>
  </template>
