<script setup>
import BreadcrumbFromRouterMeta from '../../components/breadcrumbs/BreadcrumbFromRouterMeta.vue'
const props = defineProps({
  role: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div>
      <BreadcrumbFromRouterMeta>
        <template #1-text>{{ role.name }}</template>
      </BreadcrumbFromRouterMeta>
  {{ role.name }}
  </div>
</template>
