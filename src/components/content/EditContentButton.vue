<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: 'fa-pen-to-square'
  },
})
const emit = defineEmits(['edit-content'])
</script>

<template>
  <button @click="$emit('edit-content')" class="hover:outline-hidden text-white bg-amber-400 hover:bg-amber-500 hover:ring-4 hover:ring-amber-100 font-medium rounded-full text-sm p-2 dark:focus:ring-amber-900">
    <font-awesome-icon class="h-6 w-6" :icon="icon" />
  </button>
</template>


