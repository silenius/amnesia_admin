<template>
  <article class="mt-4 flex gap-4">
    <div class="flex-none">
      <font-awesome-icon class="w-32 h-32" :icon="['fa-solid', content.fa_icon]" />
      <h1 class="drop-shadow-lg">{{ content.title }}</h1>
      <p v-if="content.description">{{ content.description }}</p>
      <p><strong>Type:</strong> {{ content.mime.major.name }}/{{ content.mime.name }}</p>
      <p><strong>Size:</strong> {{ content.file_size }} MB</p> 
    </div>
    <div class="mx-auto">
      <img :src="backend_url(content.id)" v-if="content.mime.major.name == 'image'"  />
    </div>
  </article>
</template>

<script setup>
import { onBeforeMount, onMounted, onUnmounted, onUpdated } from 'vue'
import { backend_url } from '../../composables/fetch.js'

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})
</script>
