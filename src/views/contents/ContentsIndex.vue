<script setup>
import { watchEffect, onMounted, onUpdated } from 'vue'
import { RouterView } from 'vue-router'
import { useContent } from '@/composables/contents.js'

const props = defineProps({
  content_id: Number
})

const { getContent, content } = useContent()

watchEffect(async () => {
  await getContent(props.content_id)
})

onMounted(() => console.log('MOUNTED: ContentIndex'))
onUpdated(() => console.log('UPDATED: ContentIndex'))


</script>

<template>
  <div>
    <h1>CONTENTS</h1>
    <RouterView 
      :content="content" v-if="content.id"
    />
  </div>
  </template>
