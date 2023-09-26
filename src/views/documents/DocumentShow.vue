<template>
  <article class="mt-4 prose">
    <h1 class="drop-shadow-lg">{{ content.title }}</h1>
    <p v-if="content.description">{{ content.description }}</p>
    <p v-html="content.body" />
  </article>
</template>

<script setup>
const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})
</script>
