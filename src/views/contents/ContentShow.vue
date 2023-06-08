<template>
  <p v-for="(value, key) in content">
    <strong>{{ key }}:</strong> {{ value }} 
  </p>
</template>

<script setup>
const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

</script>
