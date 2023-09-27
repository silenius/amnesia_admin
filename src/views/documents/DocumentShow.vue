<template>
  <article class="mt-4 prose">
    <h1 class="drop-shadow-lg">{{ content.title }}</h1>
    <p v-if="content.description">{{ content.description }}</p>
    <p v-html="content.body" />
  </article>
</template>

<script setup>
import { onBeforeMount, onMounted, onUnmounted, onUpdated } from 'vue'
const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

onBeforeMount(() => console.log('===> DocumentShow before mounted'))
onUnmounted(() => console.log('===> DocumentShow unmounted'))
onMounted(() => console.log('===> DocumentShow mounted'))
onUpdated(() => console.log('===> DocumentShow updated'))
</script>
