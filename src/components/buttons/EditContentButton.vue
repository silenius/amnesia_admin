<template>
  <button class="hover:outline-none text-white bg-amber-400 hover:bg-amber-500 hover:ring-4 hover:ring-amber-100 font-medium rounded-full text-sm p-2 dark:focus:ring-amber-900">
    <font-awesome-icon :class="icon_cls" :icon="icon" />
    <template v-if="label">{{ label }}</template>
  </button>
</template>

<script setup>
  import { computed } from 'vue'
  const props = defineProps({
    icon: {
      type: String,
      default: 'fa-pen-to-square'
    },
    label: {
      type: String,
      default: 'Edit'
    }
  })

  const icon_cls = computed(() => {
    if (props.label) {
      return ['h-4', 'w-4']
    } else {
      return ['h-6', 'w-6']
    }
  })

</script>
