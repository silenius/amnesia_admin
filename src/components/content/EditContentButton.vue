<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: 'fa-solid fa-pencil'
  },
})
const emit = defineEmits(['edit'])
</script>

<template>
  <button @click.prevent="$emit('edit')" class="hover:outline-hidden hover:cursor-pointer text-white bg-amber-400 hover:bg-amber-500 hover:ring-4 hover:ring-amber-100 font-medium rounded-full text-sm p-2 dark:focus:ring-amber-900">
    <font-awesome-icon class="h-6 w-6" :icon="icon" />
  </button>
</template>


