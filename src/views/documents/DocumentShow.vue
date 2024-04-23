<template>
  <article class="mt-4">
    <h1 class="drop-shadow-lg">{{ content.title }}</h1>
    <p v-if="content.description">{{ content.description }}</p>
    <EditorTipTap :content="content.body" :editable="false" :injectCSS="false" />
 </article>
</template>

<script setup>
import { onBeforeMount, onMounted, onUnmounted, onUpdated } from 'vue'
import EditorTipTap from '@/components/content/fields/EditorTipTap.vue'

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
