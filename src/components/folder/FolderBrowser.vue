<script setup>

defineProps({
  contents: Array
})

</script>

<template>
  <div v-for="content in contents">
    {{ content.title }}
  </div>
</template>


