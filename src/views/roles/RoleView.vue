<script setup>
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
<router-view @role_id="route.params.id"></router-view>
</template>
