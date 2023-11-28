<template>
  <article class="mt-4 prose">
    <h1 class="drop-shadow-lg">{{ content.title }}</h1>
    <p v-if="content.description">{{ content.description }}</p>
    <img class="max-w-full" :src="backend_url(content.id.toString())" />
    <p><strong>Type:</strong> {{ content.mime.major.name }}/{{ content.mime.name }}</p>
    <p><strong>Size:</strong> {{ content.file_size }} MB</p> 
  </article>
</template>

<script setup>
import { onBeforeMount, onMounted, onUnmounted, onUpdated } from 'vue'
import { backend_url } from '@/composables/fetch.js'

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

onBeforeMount(() => console.log('===> ContentShow before mounted'))
onUnmounted(() => console.log('===> ContentShow unmounted'))
onMounted(() => console.log('===> ContentShow mounted'))
onUpdated(() => console.log('===> ContentShow updated'))
</script>
