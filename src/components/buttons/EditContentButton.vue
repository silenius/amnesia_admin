<template>
  <button class="hover:outline-none text-white bg-amber-400 hover:bg-amber-500 hover:ring-4 hover:ring-amber-100 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-amber-900">
    <font-awesome-icon class="h-4 w-4" :icon="icon" />{{ label }}
  </button>
</template>

<script setup>
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

</script>
