<script setup>
import EditorTipTap from '@/components/content/fields/EditorTipTap.vue'

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <article class="mt-4">
    <EditorTipTap :content="content.body" :editable="false" :injectCSS="false" />
  </article>
</template>


