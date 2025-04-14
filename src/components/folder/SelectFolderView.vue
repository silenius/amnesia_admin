<script setup>

const props = defineProps({
  view: {
    type: String,
    default: 'tabular',
    required: true
  },
  icons: {
    type: Object,
    default: {
      tabular: 'fa-solid fa-list',
      gallery: 'fa-regular fa-image'
    },
    required: false
  }
})

const emit = defineEmits(['set-view'])

</script>

<template>
    <button class="text-white bg-rose-500 hover:bg-rose-600 hover:ring-4
    hover:ring-rose-100 font-medium rounded-full text-sm p-2
    dark:focus:ring-rose-900" @click.prevent="emit('set-view', view == 'tabular' ? 'gallery' : 'tabular')">
      <font-awesome-icon class="h-6 w-6 align-middle" :icon="icons[view]" />
    </button>
</template>
