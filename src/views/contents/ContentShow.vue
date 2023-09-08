<template>
    <div class="relative top-0 right-0">
      <EditContentButton @click.prevent="$emit('edit-content', content)" />
    </div>

    <h1 class="text-xl border-b font-bold my-4">
      <font-awesome-icon :icon="content.type.icons.fa" />
      {{ content.title }}
    </h1>
    <h2>{{ content.description }}</h2>

    <div v-html="content.body"></div>
</template>

<script setup>
import EditContentButton from '@/components/buttons/EditContentButton.vue'

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

</script>
