<template>

</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  breakpoint: String,
  extension: Object,
  transaction: Object,
  editor: Object
})

const emits = defineEmits(['select-text-color'])

</script>
