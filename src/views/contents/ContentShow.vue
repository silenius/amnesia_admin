<template>
  <h1 class="text-xl font-bold my-4">
    <font-awesome-icon :icon="content.type.icons.fa" />
    {{ content.title }}
  </h1>
  <h2>{{ content.description }}</h2>
</template>

<script setup>
const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

</script>
