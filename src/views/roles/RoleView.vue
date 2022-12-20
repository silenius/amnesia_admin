<script setup>
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  {{ route.params.id }}
</template>
